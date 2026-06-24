'use client'

import { RefreshCw, BrainCircuit, MessageCircle, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

const cards = [
  {
    icon: RefreshCw,
    title: "Repetitive tasks",
    body: "You spend hours copying data, responding to messages, building documents or updating spreadsheets manually.",
  },
  {
    icon: BrainCircuit,
    title: "Mental overload",
    body: "Too much information, you don't know where to start or what to learn.",
  },
  {
    icon: MessageCircle,
    title: "You use AI just to ask it things",
    body: "You know AI is powerful, but so far you've used it like a glorified search engine. You haven't gotten it to actually work for you.",
  },
  {
    icon: AlertTriangle,
    title: "Fear of becoming obsolete",
    body: "AI is changing how work is done. Learning to use it is no longer optional — it's what separates those with a competitive edge from those left behind.",
  },
];

export default function PainPointsSection() {
  return (
    <section className="py-24 px-6 bg-[#FAF7F2]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="font-['DM_Serif_Display'] text-4xl text-[#111111] mb-4">
            Does this sound familiar?
          </h2>
          <p className="text-[#555] text-lg max-w-xl mx-auto leading-relaxed">
            These are the problems thousands of professionals face every day.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map(({ icon: Icon, title, body }) => (
            <motion.div
              key={title}
              className="relative bg-white border border-[#E8E3DA] rounded-2xl p-7 overflow-hidden"
              whileHover={{ y: -4, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <div className="absolute top-0 left-0 w-[3px] h-full bg-[#FF6A32] rounded-l-2xl" />
              <Icon size={22} strokeWidth={1.5} className="text-[#FF6A32] mb-4" />
              <h3 className="font-['DM_Serif_Display'] text-xl text-[#111111] mb-3">
                {title}
              </h3>
              <p className="text-[#666] text-sm leading-relaxed">{body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
