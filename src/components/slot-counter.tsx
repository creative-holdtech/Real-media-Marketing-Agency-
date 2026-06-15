import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const DIGITS = "0123456789";
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function randomChar(original: string): string {
  if (/\d/.test(original)) return DIGITS[Math.floor(Math.random() * 10)];
  if (/[a-zA-Z]/.test(original)) return ALPHA[Math.floor(Math.random() * 26)];
  return original;
}

function SlotChar({
  char,
  delay,
  cycles,
  triggered,
}: {
  char: string;
  delay: number;
  cycles: number;
  triggered: boolean;
}) {
  const [display, setDisplay] = useState(char);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!triggered || hasRun.current) return;
    hasRun.current = true;

    if (!/[a-zA-Z0-9]/.test(char)) return;

    const timeout = setTimeout(() => {
      let count = 0;
      const interval = setInterval(() => {
        if (count >= cycles) {
          setDisplay(char);
          clearInterval(interval);
        } else {
          setDisplay(randomChar(char));
          count++;
        }
      }, 48);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [triggered, char, delay, cycles]);

  return (
    <span className="inline-block" style={{ minWidth: /[a-zA-Z0-9]/.test(char) ? "0.58em" : undefined }}>
      {display}
    </span>
  );
}

export function SlotCounter({
  value,
  className,
  charDelay = 70,
}: {
  value: string;
  className?: string;
  charDelay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (inView && !triggered) setTriggered(true);
  }, [inView, triggered]);

  return (
    <span ref={ref} className={className} aria-label={value}>
      {value.split("").map((char, i) => (
        <SlotChar
          key={i}
          char={char}
          delay={i * charDelay}
          cycles={7 + i * 3}
          triggered={triggered}
        />
      ))}
    </span>
  );
}
