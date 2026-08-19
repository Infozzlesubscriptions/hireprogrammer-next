/* ── Animated counter ── */
/* ── Mini bar chart ── */
/* ── Stat cards ── */
/* Card 1 — Active Devs */
/* Card 2 — Projects Delivered (featured / taller) */
/* Card 3 — Avg Response */
/* ── Logo marquee ── */
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import { Users, Clock, TrendingUp } from "lucide-react";

const logos = [{
    src: "/logos/amulette.png",
    alt: "Amulette London"
}, {
    src: "/logos/london.png",
    alt: "The London Experience Card"
}, {
    src: "/logos/london-city.png",
    alt: "London City Skin Clinic"
}, {
    src: "/logos/shelikes.png",
    alt: "Shelikes"
}, {
    src: "/logos/stylewise.png",
    alt: "Stylewise Direct"
}, {
    src: "/logos/personal.png",
    alt: "Personal Retirement Planning"
}, {
    src: "/logos/kiddiwinks.png",
    alt: "Kiddiwinks"
}, {
    src: "/logos/city-therapy.png",
    alt: "City Therapy"
}, {
    src: "/logos/central23.png",
    alt: "Central23"
}, {
    src: "/logos/vivichi.png",
    alt: "Vivichi"
}, {
    src: "/logos/tavistock.png",
    alt: "Tavistock Tutors"
}, {
    src: "/logos/sapnay.png",
    alt: "Sapnay"
}, {
    src: "/logos/ideal-mats.svg",
    alt: "Ideal Mats"
}, {
    src: "/logos/specialist-mats.png",
    alt: "Specialist Mats"
}];

function Counter(
    {
        to,
        suffix = ""
    }: {
        to: number;
        suffix?: string;
    }
) {
    const [val, setVal] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const started = useRef(false);

    useEffect(() => {
        const el = ref.current;

        if (!el)
            return;

        let ctrl: {
            stop: () => void;
        } | undefined;

        const obs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !started.current) {
                started.current = true;

                ctrl = animate(0, to, {
                    duration: 1.8,
                    ease: "easeOut",
                    onUpdate: v => setVal(Math.round(v))
                });
            }
        });

        obs.observe(el);
        return () => obs.disconnect();
    }, [to]);

    return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

const BAR_HEIGHTS = [28, 40, 34, 52, 46, 64, 56, 78, 68, 100];

function MiniChart() {
    return (
        <div className="flex items-end gap-[3px] h-10 mt-3">
            {BAR_HEIGHTS.map((h, i) => (<motion.div
                key={i}
                className="flex-1 rounded-sm"
                initial={{
                    scaleY: 0
                }}
                whileInView={{
                    scaleY: 1
                }}
                viewport={{
                    once: true
                }}
                transition={{
                    delay: 0.05 * i + 0.2,
                    duration: 0.45,
                    ease: "easeOut"
                }}
                style={{
                    height: `${h}%`,
                    transformOrigin: "bottom",
                    background: i === BAR_HEIGHTS.length - 1 ? "#7C3AED" : `rgba(124,58,237,${0.15 + i * 0.08})`
                }} />))}
        </div>
    );
}

const cardBase = {
    background: "rgba(20,12,40,0.90)",
    border: "1px solid rgba(255,255,255,0.09)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 0 0.5px rgba(124,58,237,0.08)"
};

export function Marquee() {
    return (
        <section className="border-y border-white/5 bg-background overflow-hidden">
            {}
            <div className="container mx-auto px-6 pt-14 pb-10">
                <motion.div
                    initial={{
                        opacity: 0,
                        y: 16
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true
                    }}
                    transition={{
                        duration: 0.5
                    }}
                    className="text-center mb-10">
                    <h2
                        className="font-bold leading-tight tracking-tight text-white"
                        style={{
                            fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)"
                        }}>Results that{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{
                                backgroundImage: "linear-gradient(135deg, #e070ff 0%, #a040ff 50%, #c040ff 100%)"
                            }}>speak for themselves!</span>
                    </h2>
                    <p
                        className="mt-3 text-sm"
                        style={{
                            color: "rgba(220,200,255,0.45)"
                        }}>Real numbers from a decade of shipping software across the UK.
                                  </p>
                </motion.div>
                <div
                    className="flex flex-col sm:flex-row items-stretch justify-center gap-4 max-w-3xl mx-auto">
                    {}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0
                        }}
                        className="flex-1 rounded-2xl p-5 sm:self-end"
                        style={{
                            ...cardBase,
                            backdropFilter: "blur(16px)"
                        }}>
                        <div className="flex items-center gap-2 mb-3">
                            <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "rgba(124,58,237,0.15)",
                                    border: "1px solid rgba(124,58,237,0.25)"
                                }}>
                                <Users className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs text-white/45 font-medium">Active Devs</span>
                        </div>
                        <div className="text-4xl font-black text-white leading-none mb-2">
                            <Counter to={47} />
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span
                                className="text-xs font-semibold"
                                style={{
                                    color: "#4ade80"
                                }}>↑ +8 this month</span>
                        </div>
                    </motion.div>
                    {}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.1
                        }}
                        className="flex-1 rounded-2xl p-5"
                        style={{
                            ...cardBase,
                            border: "1px solid rgba(124,58,237,0.22)",
                            boxShadow: "0 12px 50px rgba(0,0,0,0.5), 0 0 40px rgba(124,58,237,0.08)",
                            backdropFilter: "blur(16px)"
                        }}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{
                                        background: "rgba(124,58,237,0.15)",
                                        border: "1px solid rgba(124,58,237,0.25)"
                                    }}>
                                    <TrendingUp className="w-3.5 h-3.5 text-primary" />
                                </div>
                                <span className="text-xs text-white/45 font-medium">Projects Delivered</span>
                            </div>
                            <span
                                className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                                style={{
                                    background: "rgba(74,222,128,0.12)",
                                    color: "#4ade80",
                                    border: "1px solid rgba(74,222,128,0.2)"
                                }}>Live
                                              </span>
                        </div>
                        <div
                            className="text-4xl font-black leading-none mb-1"
                            style={{
                                color: "#7C3AED"
                            }}>
                            <Counter to={1200} suffix="+" />
                        </div>
                        <div className="text-[11px] text-white/35 mb-1">Since 2015 · All tech stacks</div>
                        <MiniChart />
                    </motion.div>
                    {}
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}
                        viewport={{
                            once: true
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.2
                        }}
                        className="flex-1 rounded-2xl p-5 sm:self-end"
                        style={{
                            ...cardBase,
                            backdropFilter: "blur(16px)"
                        }}>
                        <div className="flex items-center gap-2 mb-3">
                            <div
                                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{
                                    background: "rgba(124,58,237,0.15)",
                                    border: "1px solid rgba(124,58,237,0.25)"
                                }}>
                                <Clock className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs text-white/45 font-medium">Avg Response</span>
                        </div>
                        <div className="text-4xl font-black text-white leading-none mb-2">2 hrs
                                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-white/30">{"</>"}</span>
                            <span className="text-xs text-white/35">Any tech stack</span>
                        </div>
                    </motion.div>
                </div>
            </div>
            {}
            <div className="pt-8 pb-14">
                <motion.p
                    initial={{
                        opacity: 0,
                        y: 16
                    }}
                    whileInView={{
                        opacity: 1,
                        y: 0
                    }}
                    viewport={{
                        once: true,
                        margin: "-40px"
                    }}
                    transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                    }}
                    className="text-center text-muted-foreground mb-8 uppercase tracking-widest font-semibold text-[16px]">Trusted by UK Companies
                            </motion.p>
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    whileInView={{
                        opacity: 1
                    }}
                    viewport={{
                        once: true,
                        margin: "-40px"
                    }}
                    transition={{
                        duration: 0.6,
                        delay: 0.15
                    }}
                    className="relative w-full overflow-hidden">
                    <div
                        className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                    <div
                        className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                    <div className="flex animate-[marquee_36s_linear_infinite]">
                        {[1, 2].map(set => (<div key={set} className="flex flex-shrink-0 items-center">
                            {logos.map((logo, i) => (<div
                                key={`s${set}-${i}`}
                                className="flex items-center justify-center px-10 flex-shrink-0">
                                <img
                                    src={logo.src}
                                    alt={logo.alt}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-16 w-auto object-contain select-none"
                                    style={{
                                        filter: "brightness(0) invert(1)",
                                        opacity: 1,
                                        maxWidth: 220
                                    }}
                                    draggable={false} />
                            </div>))}
                        </div>))}
                    </div>
                </motion.div>
            </div>
            <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
        </section>
    );
}