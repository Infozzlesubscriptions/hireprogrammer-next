"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "£20",
    period: "/hr",
    description: "Perfect for small tasks and short-term projects.",
    features: [
      "Mid-level UK Developer",
      "Flexible hours",
      "No fixed contract",
      "Weekly reporting"
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "£30",
    period: "/hr",
    description: "Ideal for startups needing serious velocity.",
    features: [
      "Senior UK Developer",
      "AI-assisted workflow",
      "Priority response time",
      "Direct Slack integration",
      "Code review included"
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Full squads for large-scale application builds.",
    features: [
      "Dedicated Tech Lead",
      "Full Engineering Squad",
      "Custom SLA",
      "Architecture planning",
      "24/7 Support access"
    ],
    popular: false,
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#080316]">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Transparent <span className="text-primary">Pricing</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            Silicon Valley quality at sensible UK rates. No hidden fees.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-3xl p-8 bg-card border ${
                plan.popular ? 'border-primary shadow-[0_0_40px_-15px_rgba(124,58,237,0.4)]' : 'border-white/5'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-muted-foreground mb-1">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <Button 
                className={`w-full h-12 ${plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-white/5 text-white hover:bg-white/10'}`}
                variant={plan.popular ? "default" : "secondary"}
              >
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
