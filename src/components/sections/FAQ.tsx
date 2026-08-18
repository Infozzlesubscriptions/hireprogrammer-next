"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What makes your programmers different from standard freelancers?",
    answer: "Our programmers are rigorously vetted top-tier talent. They use advanced AI-assisted workflows to deliver code significantly faster than standard developers. Furthermore, they are managed by our UK-based leadership, ensuring quality control and smooth communication."
  },
  {
    question: "Are there any long-term contracts?",
    answer: "No. We believe in flexibility. You can hire developers on a rolling basis without being locked into lengthy fixed-term contracts. Scale up when you need a push, and scale down when the project is delivered."
  },
  {
    question: "How does the pricing work?",
    answer: "Our pricing starts at £20/hr for our Starter tier, rising to £30/hr for our Professional tier which includes senior talent and advanced integrations. We offer transparent, upfront quotes before any work begins so there are no surprises."
  },
  {
    question: "Where are your developers based?",
    answer: "While our leadership, project management, and business operations are based entirely in London, UK, our engineering talent is distributed globally. This allows us to source the absolute best developers while maintaining UK business standards."
  },
  {
    question: "How do we communicate with the hired programmers?",
    answer: "We integrate directly into your existing workflow. Our developers can join your Slack channels, Jira boards, Microsoft Teams, and GitHub repositories. They function as a seamless extension of your internal team."
  }
];

export function FAQ() {
  return (
    <section className="py-14 relative overflow-hidden" style={{ background: "#0B0418" }}>
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6 text-white"
          >
            Frequently Asked <span className="text-primary">Questions</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full space-y-4"
        >
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group rounded-2xl px-6 transition-colors open:border-primary/30"
              style={{ background: "rgba(20,12,40,0.80)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <summary className="flex items-center justify-between py-6 cursor-pointer list-none gap-4 [&::-webkit-details-marker]:hidden">
                <span className="text-left text-lg font-medium">{faq.question}</span>
                <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180 flex-shrink-0" />
              </summary>
              <div className="text-white/65 text-base leading-relaxed pb-6">{faq.answer}</div>
            </details>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
