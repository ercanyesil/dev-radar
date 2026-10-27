// ============================================================
// Event Loop article — EN + TR strings.
// Code samples and queue item labels intentionally stay in English.
// ============================================================

import type { Locale } from "./translations";

export interface EventLoopStrings {
  title: string;
  intro: string;
  exampleHeading: string;
  expectedOutput: string;
  watchBelow: string;
  rulesHeading: string;
  rules: string[];
  outro: string;
  demo: {
    srSummary: string;
    code: string;
    callStack: string;
    webApis: string;
    microQueue: string;
    macroQueue: string;
    eventLoop: string;
    console: string;
    loopStates: { idle: string; empty: string; micro: string; macro: string; running: string };
    prev: string;
    next: string;
    play: string;
    pause: string;
    reset: string;
    prevAria: string;
    nextAria: string;
    playAria: string;
    pauseAria: string;
    resetAria: string;
    stepOf: (n: number, total: number) => string;
    /** 17 explanations, one per step */
    steps: string[];
  };
}

export const eventLoopStrings: Record<Locale, EventLoopStrings> = {
  en: {
    title: "How does the JavaScript Event Loop work?",
    intro:
      "JavaScript is single-threaded, yet code written with setTimeout and Promises seems to run \"at the same time\". The mechanism behind this is the event loop.",
    exampleHeading: "Example code",
    expectedOutput: "Expected output",
    watchBelow: "Follow it step by step in the animation below.",
    rulesHeading: "Rules in short",
    rules: [
      "Synchronous code on the call stack runs to completion first.",
      "When the stack is empty, the event loop drains the microtask queue (Promises) completely.",
      "Then it takes one task from the macrotask queue (setTimeout) and repeats.",
    ],
    outro:
      "That is why, even with setTimeout(..., 0), B is printed after C, the Promise callback.",
    demo: {
      srSummary:
        "Event loop animation: how code with console.log, setTimeout and a Promise runs step by step through the call stack, Web APIs, and the microtask and macrotask queues. The output order is A, D, C, B.",
      code: "Code",
      callStack: "Call stack",
      webApis: "Web APIs",
      microQueue: "Microtask queue",
      macroQueue: "Macrotask queue",
      eventLoop: "Event loop",
      console: "Console",
      loopStates: {
        idle: "Idle",
        empty: "Stack is empty",
        micro: "Checking microtask queue",
        macro: "Checking macrotask queue",
        running: "Running",
      },
      prev: "Previous",
      next: "Next",
      play: "Play",
      pause: "Pause",
      reset: "Reset",
      prevAria: "Previous step",
      nextAria: "Next step",
      playAria: "Play animation",
      pauseAria: "Pause animation",
      resetAria: "Reset animation",
      stepOf: (n, total) => `Step ${n} / ${total}`,
      steps: [
        "The program starts and the global code enters the stack.",
        "The console.log('A') call is pushed onto the stack.",
        "log('A') runs and prints A to the console.",
        "setTimeout is called. The browser, not JavaScript, manages the timer.",
        "The timer starts waiting in the Web API; the stack carries on immediately.",
        "Promise.resolve().then(...) is called.",
        "The Promise is already resolved, so cb C goes straight into the microtask queue.",
        "console.log('D') is pushed onto the stack. Synchronous code keeps going in order.",
        "D is printed. The queues still have to wait.",
        "The 0 ms delay has elapsed; the browser moves cb B to the macrotask queue.",
        "main() finishes and the stack empties. Now the event loop can step in.",
        "The event loop checks the microtask queue first and moves cb C onto the stack.",
        "Inside cb C, console.log('C') is called.",
        "C is printed and cb C finishes. The stack is empty again.",
        "The microtask queue is empty. Now cb B is taken from the macrotask queue onto the stack.",
        "Inside cb B, console.log('B') is called.",
        "B is printed. Result: A, D, C, B. Sync code → microtasks → macrotasks.",
      ],
    },
  },
  tr: {
    title: "JavaScript Event Loop nasıl çalışır?",
    intro:
      "JavaScript tek iş parçacıklıdır; ama setTimeout ve Promise'lerle yazdığımız kod yine de \"aynı anda\" çalışıyormuş gibi davranır. Bunu mümkün kılan mekanizma event loop'tur.",
    exampleHeading: "Örnek kod",
    expectedOutput: "Beklenen çıktı",
    watchBelow: "Aşağıdaki animasyonla adım adım izleyin.",
    rulesHeading: "Kural özeti",
    rules: [
      "Önce çağrı yığınındaki senkron kod tamamen çalışır.",
      "Yığın boşalınca event loop mikro görev kuyruğunu (Promise) tamamen boşaltır.",
      "Ardından makro görev kuyruğundan (setTimeout) bir görev alır; döngü tekrarlanır.",
    ],
    outro:
      "Bu yüzden setTimeout(..., 0) bile olsa B, Promise callback'i olan C'den sonra yazılır.",
    demo: {
      srSummary:
        "Event loop animasyonu: console.log, setTimeout ve Promise içeren kodun çağrı yığını, Web API'ler, mikro ve makro görev kuyrukları üzerinden adım adım çalışışı. Çıktı sırası A, D, C, B olur.",
      code: "Kod",
      callStack: "Çağrı yığını (call stack)",
      webApis: "Web API'ler",
      microQueue: "Mikro görev kuyruğu",
      macroQueue: "Makro görev kuyruğu",
      eventLoop: "Event loop",
      console: "Konsol",
      loopStates: {
        idle: "Bekliyor",
        empty: "Yığın boş",
        micro: "Mikro kuyruğa bakıyor",
        macro: "Makro kuyruğa bakıyor",
        running: "Çalışıyor",
      },
      prev: "Önceki",
      next: "Sonraki",
      play: "Oynat",
      pause: "Duraklat",
      reset: "Sıfırla",
      prevAria: "Önceki adım",
      nextAria: "Sonraki adım",
      playAria: "Animasyonu oynat",
      pauseAria: "Animasyonu duraklat",
      resetAria: "Animasyonu sıfırla",
      stepOf: (n, total) => `Adım ${n} / ${total}`,
      steps: [
        "Program başlıyor, global kod yığına girer.",
        "console.log('A') çağrısı yığına eklenir.",
        "log('A') çalışır ve konsola A yazılır.",
        "setTimeout çağrılır. Zamanlayıcıyı JavaScript değil, tarayıcı yönetir.",
        "Zamanlayıcı Web API'de beklemeye başlar; yığın hemen devam eder.",
        "Promise.resolve().then(...) çağrılır.",
        "Promise zaten çözülmüş olduğundan cb C hemen mikro görev kuyruğuna girer.",
        "console.log('D') çağrısı yığına eklenir. Senkron kod sırayla ilerler.",
        "D konsola yazılır. Kuyruklara henüz sıra gelmedi.",
        "0 ms'lik süre doldu; tarayıcı cb B'yi makro görev kuyruğuna taşır.",
        "main() biter ve yığın boşalır. Artık event loop devreye girebilir.",
        "Event loop önce mikro görev kuyruğuna bakar ve cb C'yi yığına alır.",
        "cb C içinde console.log('C') çağrılır.",
        "C yazılır ve cb C biter. Yığın yeniden boş.",
        "Mikro kuyruk boş. Şimdi makro kuyruktan cb B alınıp yığına konur.",
        "cb B içinde console.log('B') çağrılır.",
        "B yazılır. Sonuç: A, D, C, B. Senkron kod → mikro görevler → makro görevler.",
      ],
    },
  },
};
