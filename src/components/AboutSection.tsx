import { motion } from 'motion/react';
import { Target, Lock, Cloud, Cpu } from 'lucide-react';

const values = [
  {
    icon: Target,
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/8 border-cyan-500/15',
    title: 'Our Mission',
    desc: 'Advance the boundaries of technology across software engineering, artificial intelligence, and quantum computing — delivering enterprise solutions that are both powerful and private.',
  },
  {
    icon: Cloud,
    color: 'text-purple-400',
    bg: 'bg-purple-500/8 border-purple-500/15',
    title: 'Cloud-Native',
    desc: 'Every product we ship is built and operated entirely in the cloud. Fully managed infrastructure, enterprise SLAs, and zero setup burden on your team.',
  },
  {
    icon: Lock,
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/8 border-emerald-500/15',
    title: 'Strict Privacy',
    desc: 'We operate under a strict privacy policy. Client data is never shared, sold, or accessed beyond what is required to run the service. Full data ownership remains with you.',
  },
  {
    icon: Cpu,
    color: 'text-amber-400',
    bg: 'bg-amber-500/8 border-amber-500/15',
    title: 'Proprietary Research',
    desc: 'All intellectual property is developed and owned by KITT Corps. Our products are commercially licensed and built on original, in-house research and engineering.',
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
              Research at the edge of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                what's possible.
              </span>
            </h2>
            <div className="space-y-4 text-slate-400 text-base leading-relaxed">
              <p>
                KITT Corps is a cloud-native research and development organisation working across 
                some of the most demanding frontiers in technology — data infrastructure, 
                artificial intelligence, software engineering, and quantum computing.
              </p>
              <p>
                We build proprietary, commercially licensed products for organisations that 
                demand performance, privacy, and full control over their data. Every solution 
                is designed from first principles and delivered as a fully managed cloud service — 
                no on-premise complexity, no open-source guesswork.
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
