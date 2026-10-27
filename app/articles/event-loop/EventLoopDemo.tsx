"use client";

import { useEffect, useState } from "react";
import { useT } from "@/lib/i18n/context";
import { eventLoopStrings } from "@/lib/i18n/eventLoop";
import styles from "./EventLoopDemo.module.css";

type Item = { id: string; label: string };
type LoopKey = "idle" | "empty" | "micro" | "macro" | "running";

type Step = {
  aktifSatir: number | null;
  stack: Item[];
  api: Item[];
  micro: Item[];
  macro: Item[];
  console: Item[];
  loopDurumu: LoopKey;
  vurgulanacakKuyruk: "micro" | "macro" | null;
};

const CODE = [
  "console.log('A');",
  "setTimeout(() => console.log('B'), 0);",
  "Promise.resolve().then(() => console.log('C'));",
  "console.log('D');",
];

const i = (id: string, label: string): Item => ({ id, label });
const MAIN = i("main", "main()");
const LOG_A = i("logA", "log('A')");
const LOG_B = i("logB", "log('B')");
const LOG_C = i("logC", "log('C')");
const LOG_D = i("logD", "log('D')");
const CB_B = i("cbB", "cb B");
const CB_C = i("cbC", "cb C");
const SET_T = i("setTimeout", "setTimeout()");
const THEN = i("then", "then()");
const TIMER = i("timer", "timer → cb B");
const OUT = (c: string) => i(`out${c}`, c);

const base: Step = {
  aktifSatir: null,
  stack: [],
  api: [],
  micro: [],
  macro: [],
  console: [],
  loopDurumu: "running",
  vurgulanacakKuyruk: null,
};

// One entry per step; the explanation text comes from i18n (same index).
const STEPS: Step[] = [
  { ...base, stack: [MAIN] },
  { ...base, aktifSatir: 0, stack: [MAIN, LOG_A] },
  { ...base, aktifSatir: 0, stack: [MAIN], console: [OUT("A")] },
  { ...base, aktifSatir: 1, stack: [MAIN, SET_T], console: [OUT("A")] },
  { ...base, aktifSatir: 1, stack: [MAIN], api: [TIMER], console: [OUT("A")] },
  { ...base, aktifSatir: 2, stack: [MAIN, THEN], api: [TIMER], console: [OUT("A")] },
  { ...base, aktifSatir: 2, stack: [MAIN], api: [TIMER], micro: [CB_C], console: [OUT("A")] },
  { ...base, aktifSatir: 3, stack: [MAIN, LOG_D], api: [TIMER], micro: [CB_C], console: [OUT("A")] },
  { ...base, aktifSatir: 3, stack: [MAIN], api: [TIMER], micro: [CB_C], console: [OUT("A"), OUT("D")] },
  { ...base, stack: [MAIN], micro: [CB_C], macro: [CB_B], console: [OUT("A"), OUT("D")] },
  { ...base, micro: [CB_C], macro: [CB_B], console: [OUT("A"), OUT("D")], loopDurumu: "empty" },
  { ...base, stack: [CB_C], macro: [CB_B], console: [OUT("A"), OUT("D")], loopDurumu: "micro", vurgulanacakKuyruk: "micro" },
  { ...base, stack: [CB_C, LOG_C], macro: [CB_B], console: [OUT("A"), OUT("D")] },
  { ...base, macro: [CB_B], console: [OUT("A"), OUT("D"), OUT("C")], loopDurumu: "empty" },
  { ...base, stack: [CB_B], console: [OUT("A"), OUT("D"), OUT("C")], loopDurumu: "macro", vurgulanacakKuyruk: "macro" },
  { ...base, stack: [CB_B, LOG_B], console: [OUT("A"), OUT("D"), OUT("C")] },
  { ...base, console: [OUT("A"), OUT("D"), OUT("C"), OUT("B")], loopDurumu: "idle" },
];

const LAST = STEPS.length - 1;
const INTERVAL_MS = 1700;

function Panel({
  title,
  kind,
  highlighted,
  children,
}: {
  title: string;
  kind: "Stack" | "Api" | "Micro" | "Macro";
  highlighted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={[styles.panel, styles[`panel${kind}`], highlighted ? styles.highlight : ""].join(" ")}
      aria-label={title}
    >
      <h4 className={styles.panelTitle}>{title}</h4>
      {children}
    </section>
  );
}

function Items({ items, kind, stack }: { items: Item[]; kind: "stack" | "api" | "micro" | "macro"; stack?: boolean }) {
  return (
    <div className={[styles.list, stack ? styles.listStack : styles.listQueue].join(" ")}>
      {items.map((it) => (
        <div key={it.id} className={[styles.item, styles[kind]].join(" ")}>
          {it.label}
        </div>
      ))}
    </div>
  );
}

export default function EventLoopDemo() {
  const { locale } = useT();
  const d = eventLoopStrings[locale].demo;
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setStep((s) => (s >= LAST ? s : s + 1));
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [playing]);

  useEffect(() => {
    if (playing && step >= LAST) setPlaying(false);
  }, [playing, step]);

  const s = STEPS[step];
  const looking = s.vurgulanacakKuyruk !== null;

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step >= LAST) setStep(0);
    setPlaying(true);
  };

  return (
    <figure className={styles.root} aria-labelledby="el-heading">
      <h3 id="el-heading" className={styles.srOnly}>
        {d.srSummary}
      </h3>

      <div className={styles.row2}>
        <section className={styles.panel} aria-label={d.code}>
          <h4 className={styles.panelTitle}>{d.code}</h4>
          <ol className={styles.code}>
            {CODE.map((line, n) => (
              <li
                key={n}
                className={[styles.codeLine, s.aktifSatir === n ? styles.codeLineActive : ""].join(" ")}
                aria-current={s.aktifSatir === n ? "step" : undefined}
              >
                <span className={styles.lineNo}>{n + 1}</span>
                <span>{line}</span>
              </li>
            ))}
          </ol>
        </section>
        <Panel title={d.callStack} kind="Stack">
          <Items items={s.stack} kind="stack" stack />
        </Panel>
      </div>

      <div className={styles.row3}>
        <Panel title={d.webApis} kind="Api">
          <Items items={s.api} kind="api" />
        </Panel>
        <Panel title={d.microQueue} kind="Micro" highlighted={s.vurgulanacakKuyruk === "micro"}>
          <Items items={s.micro} kind="micro" />
        </Panel>
        <Panel title={d.macroQueue} kind="Macro" highlighted={s.vurgulanacakKuyruk === "macro"}>
          <Items items={s.macro} kind="macro" />
        </Panel>
      </div>

      <div className={styles.row2}>
        <section className={[styles.panel, styles.loopBox].join(" ")} aria-label={d.eventLoop}>
          <svg
            className={[styles.loopIcon, looking ? styles.loopSpin : ""].join(" ")}
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-3-6.7" />
            <path d="M21 4v5h-5" />
          </svg>
          <div>
            <div className={styles.loopLabel}>{d.eventLoop}</div>
            <div className={styles.loopState}>{d.loopStates[s.loopDurumu]}</div>
          </div>
        </section>
        <section className={styles.panel} aria-label={d.console}>
          <h4 className={styles.panelTitle}>{d.console}</h4>
          <div className={styles.consoleOut}>
            {s.console.length === 0 && <span className={styles.empty}>—</span>}
            {s.console.map((c) => (
              <span key={c.id} className={styles.consoleItem}>
                {c.label}
              </span>
            ))}
          </div>
        </section>
      </div>

      <p className={styles.explain} aria-live="polite">
        {d.steps[step]}
      </p>

      <div className={styles.controls}>
        <button
          type="button"
          className={styles.btn}
          aria-label={d.prevAria}
          disabled={step === 0}
          onClick={() => {
            setPlaying(false);
            setStep((v) => Math.max(0, v - 1));
          }}
        >
          {d.prev}
        </button>
        <button
          type="button"
          className={styles.btn}
          aria-label={d.nextAria}
          disabled={step === LAST}
          onClick={() => {
            setPlaying(false);
            setStep((v) => Math.min(LAST, v + 1));
          }}
        >
          {d.next}
        </button>
        <button
          type="button"
          className={styles.btn}
          aria-label={playing ? d.pauseAria : d.playAria}
          onClick={togglePlay}
        >
          {playing ? d.pause : d.play}
        </button>
        <button
          type="button"
          className={styles.btn}
          aria-label={d.resetAria}
          onClick={() => {
            setPlaying(false);
            setStep(0);
          }}
        >
          {d.reset}
        </button>
        <span className={styles.counter}>{d.stepOf(step + 1, STEPS.length)}</span>
      </div>
    </figure>
  );
}
