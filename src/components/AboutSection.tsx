import { motion } from 'motion/react';
import { Target, Layers, Globe, Code2 } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#070b13] border-b border-slate-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">About Us</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-6">
              We build tools that make{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                data pipelines disappear.
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed mb-6">
              KITT Corps is an open-source research and development organisation focused on the challenges 
              data engineers face every day — fragmented databases, brittle pipelines, and the hidden cost 
              of moving data between systems.
            </p>
            <p className="text-slate-400 text-base leading-relaxed">
              We design lightweight, self-hostable software that any developer can pick up in minutes, 
              run on their own infrastructure, and trust with their credentials. No SaaS lock-in. 
              No vendor dependency. Just clean, auditable tooling that does exactly what it says.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {[
              {
                icon: Target,
                color: 'text-cyan-400',
                bg: 'bg-cyan-500/10 border-cyan-500/20',
                title: 'Our Mission',
                desc: 'Eliminate the complexity of multi-source data consolidation so teams can focus on analysis, not infrastructure.',
              },
              {
                icon: Layers,
                color: 'text-purple-400',
                bg: 'bg-purple-500/10 border-purple-500/20',
                title: 'What We Build',
                desc: 'Developer-first tooling for database orchestration, schema unification, and topology visualisation.',
              },
              {
                icon: Globe,
                color: 'text-emerald-400',
                bg: 'bg-emerald-500/10 border-emerald-500/20',
                title: 'Open Source First',
                desc: 'Every project we ship is MIT-licensed and published openly on GitHub. Community contributions are welcome.',
              },
              {
                icon: Code2,
                color: 'text-amber-400',
                bg: 'bg-amber-500/10 border-amber-500/20',
                title: 'Zero Lock-In',
                desc: 'All tools run locally or on your own server. Your credentials, your data, your control — always.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 hover:border-slate-700 transition-colors"
              >
                <div className={`p-2.5 w-fit rounded-lg border mb-3 ${card.bg}`}>
                  <card.icon className={`w-4 h-4 ${card.color}`} />
                </div>
                <h3 className="text-sm font-bold text-slate-200 mb-2">{card.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
