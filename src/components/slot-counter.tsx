import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

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
    <span
      className="inline-block"
      style={{ minWidth: /[a-zA-Z0-9]/.test(char) ? "0.58em" : undefined }}
    >
      {display}
    </span>
  );
}

export function SlotCounter({
  value,
  className,
  charDelay = 70,
  triggered: triggeredProp,
}: {
  value: string;
  className?: string;
  charDelay?: number;
  /** Parent-controlled trigger — skips internal inView when set. */
  triggered?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const [internalTriggered, setInternalTriggered] = useState(false);
  const parentControlled = triggeredProp !== undefined;
  const triggered = parentControlled ? triggeredProp : internalTriggered;

  useEffect(() => {
    if (parentControlled || !inView || internalTriggered) return;
    setInternalTriggered(true);
  }, [inView, internalTriggered, parentControlled]);

  // Chars are individual inline-block boxes for the shuffle effect, which gives the
  // browser a break opportunity between every letter — multi-word values (e.g. "Instant
  // deployment") could then wrap mid-word. Group chars per word under `nowrap` and only
  // emit real breakable spaces between words.
  let globalIndex = 0;
  const wordEls = value.split(" ").map((word, wi) => {
    const startIndex = globalIndex;
    globalIndex += word.length + 1;
    return (
      <span key={wi} className="inline-block whitespace-nowrap">
        {word.split("").map((char, ci) => (
          <SlotChar
            key={ci}
            char={char}
            delay={(startIndex + ci) * charDelay}
            cycles={7 + (startIndex + ci) * 3}
            triggered={triggered}
          />
        ))}
      </span>
    );
  });

  return (
    <span ref={ref} className={className} aria-label={value}>
      {wordEls.flatMap((el, i) => (i === 0 ? [el] : [" ", el]))}
    </span>
  );
}
