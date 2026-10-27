import type { Metadata } from "next";
import EventLoopArticle from "./EventLoopArticle";

export const metadata: Metadata = {
  title: "JavaScript Event Loop | dev-radar",
  description:
    "Interactive event loop animation: call stack, Web APIs, microtask and macrotask queues. / Çağrı yığını, mikro ve makro görev kuyrukları.",
};

export default function EventLoopPage() {
  return <EventLoopArticle />;
}
