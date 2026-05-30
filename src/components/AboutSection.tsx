import { motion } from 'motion/react';
import { Target, Layers, Shield, Cpu } from 'lucide-react';

const values = [
  {
    icon: Target,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/8 border-cyan-500/15',
    title: 'Our Mission',
    desc: 'Eliminate the hidden complexity of multi-source data consolidation so engineering teams can focus on building — not plumbing.',
  },
  {
    icon: Layers,
    color: 'text-purple-400',
    bg: 'bg-purple-500/8 border-purple-500/15',
    title: 'What We Build',
    desc: 'Lightweight, developer-first tooling for database orchestration, schema unification, and topology visualisation.',
  },
  {
    icon: Shield,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8 border-emerald-500/15',
    title: 'Data Sovereignty',
    desc: 'All tools run on your own infrastructure. Your credentials stay yours — no third-party cloud, no telemetry, no lock-in.',
  },
  {
    icon: Cpu,
    color: 'text-amber-400',
    bg: 'bg-amber-500/8 border-amber-500/15',
    title: 'Built for Engineers',
    desc: 'Every product is designed to be picked up in minutes — command-line first, with a web dashboard for teams that want one.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-28 bg-[#070b13] border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-5">About KITT Corps</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              We build tools that make{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                data pipelines disappear.
              </span>
            </h2>
            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                KITT Corps is a research and development organisation focused on the challenges 
                data engineers face every day — fragmented databases, brittle pipelines, 
                and the hidden cost of moving data between systems.
              </p>
              <p>
                We design lightweight, self-hostable software that any developer can deploy 
                in minutes, run on their own infrastructure, and trust with their credentials. 
                No cloud dependency. No subscription. Just clean, auditable tooling that does 
                exactly what it says.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-4"
          >
            {values.map((card) => (
              <div
                key={card.title}
                className={`p-5 rounded-xl border ${card.bg} hover:brightness-110 transition-all`}
              >
                <div className={`mb-3 ${card.color}`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-1.5">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
