import { useEffect, useRef, useState } from "react";

/**
 * Subtle WebGL flow-field behind hero. Graceful degradation:
 *  - skipped if prefers-reduced-motion
 *  - skipped on small viewports (< 768px) or coarse pointers
 *  - skipped if WebGL is unavailable or context is lost
 *  - DPR capped at 1.25; renders pause when off-screen or tab hidden
 *  - auto-throttles if frame budget exceeds ~22ms (drops to 30fps, then disables)
 * Opacity is intentionally low so the H1 stays fully readable.
 */
export function HeroWebGL() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches && small;
    if (reduced || coarse) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", {
        antialias: false,
        premultipliedAlpha: true,
        alpha: true,
      }) as WebGLRenderingContext | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vsSrc = `attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}`;
    const fsSrc = `
      precision mediump float;
      uniform vec2 u_res;
      uniform float u_t;
      // Smooth value noise
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){
        vec2 i=floor(p), f=fract(p);
        float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
        vec2 u=f*f*(3.0-2.0*f);
        return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
      }
      float fbm(vec2 p){
        float v=0.0, a=0.5;
        for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.02; a*=0.5; }
        return v;
      }
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*u_res) / u_res.y;
        float t = u_t * 0.05;
        vec2 q = vec2(fbm(uv*1.3 + t), fbm(uv*1.3 - t + 5.2));
        vec2 r = vec2(fbm(uv*1.6 + q + vec2(1.7,9.2) + t*1.2),
                      fbm(uv*1.6 + q + vec2(8.3,2.8) - t*1.1));
        float f = fbm(uv*1.8 + r);
        // Palette: sage → indigo → violet (matches hero gradient)
        vec3 sage   = vec3(0.72, 0.76, 0.64);
        vec3 indigo = vec3(0.29, 0.18, 0.45);
        vec3 violet = vec3(0.12, 0.08, 0.22);
        vec3 col = mix(sage, indigo, smoothstep(0.25, 0.75, f));
        col = mix(col, violet, smoothstep(0.55, 0.95, length(r)*0.6));
        // Vignette so center stays clean for H1
        float vg = smoothstep(0.2, 1.1, length(uv));
        col = mix(col, vec3(0.04,0.03,0.08), vg*0.55);
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type: number, src: string) {
      const sh = gl!.createShader(type)!;
      gl!.shaderSource(sh, src);
      gl!.compileShader(sh);
      if (!gl!.getShaderParameter(sh, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(sh);
        return null;
      }
      return sh;
    }
    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uT = gl.getUniformLocation(prog, "u_t");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    function resize() {
      if (!canvas) return;
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
      }
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let inViewport = true;
    let visible = true;
    const syncVisibility = () => {
      visible = inViewport && !document.hidden;
    };
    const io = new IntersectionObserver(
      (ents) => {
        for (const e of ents) inViewport = e.isIntersecting;
        syncVisibility();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);
    syncVisibility();

    const onVis = () => {
      syncVisibility();
    };
    document.addEventListener("visibilitychange", onVis);

    const lost = (e: Event) => {
      e.preventDefault();
      setEnabled(false);
    };
    canvas.addEventListener("webglcontextlost", lost);

    let raf = 0;
    const start = performance.now();
    let last = start;
    let slowFrames = 0;
    let minDelta = 0; // 0 = uncapped, else throttle target ms
    let disposed = false;

    const tick = (now: number) => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      if (!visible) {
        last = now;
        return;
      }
      const delta = now - last;
      if (minDelta && delta < minDelta) return;
      last = now;
      const t0 = performance.now();
      gl!.uniform2f(uRes, canvas.width, canvas.height);
      gl!.uniform1f(uT, (now - start) / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      const frameCost = performance.now() - t0;
      if (frameCost > 22) {
        slowFrames++;
        if (slowFrames === 30 && !minDelta) {
          minDelta = 33; // throttle to ~30fps
        } else if (slowFrames > 90) {
          setEnabled(false); // give up
        }
      } else if (slowFrames > 0) {
        slowFrames--;
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas.removeEventListener("webglcontextlost", lost);
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 -z-10 h-full w-full opacity-60 mix-blend-screen pointer-events-none"
    />
  );
}
