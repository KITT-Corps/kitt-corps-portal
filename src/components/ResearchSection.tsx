import { motion } from 'motion/react';
import { Code2, Brain, Atom, Database } from 'lucide-react';

const areas = [
  {
    icon: Database,
    color: 'text-cyan-500 dark:text-cyan-400',
    glow: 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
    title: 'Data Infrastructure',
    description:
      'Designing cloud-native systems for database orchestration, schema unification, and large-scale data pipeline management. Our flagship products Data-Mate and DataMateWeb operate in this domain.',
    status: 'Active',
    statusColor: 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10 border-cyan-200 dark:border-cyan-500/20',
  },
  {
    icon: Brain,
    color: 'text-purple-500 dark:text-purple-400',
    glow: 'bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
    title: 'Artificial Intelligence',
    description:
      'Researching and building applied AI systems — from intelligent data processing and automated reasoning engines to domain-specific ML pipelines for enterprise workloads.',
    status: 'In Progress',
    statusColor: 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20',
  },
  {
    icon: Atom,
    color: 'text-emerald-600 dark:text-emerald-400',
    glow: 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    title: 'Quantum Computing',
    description:
      'Exploring quantum algorithms and hybrid classical-quantum architectures. We are building early-stage proprietary frameworks for quantum-accelerated computation and optimisation problems.',
    status: 'Research',
    statusColor: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
  },
  {
    icon: Code2,
    color: 'text-amber-600 dark:text-amber-400',
    glow: 'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    title: 'Software Engineering',
    description:
      'Building robust, scalable cloud software platforms — from developer tooling and internal frameworks to full-stack enterprise applications designed for high-reliability environments.',
    status: 'Active',
    statusColor: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
  },
];

export default function ResearchSection() {
  return (
    <section id="research" className="py-28 bg-white dark:bg-[#070b13] border-b border-slate-200 dark:border-white/5 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/3 dark:bg-purple-500/4 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-500 dark:text-cyan-400 uppercase mb-4">Research Areas</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Pushing the frontier across disciplines.
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            KITT Corps operates across multiple research and engineering domains. Our work spans
            from production-ready cloud products to long-horizon fundamental research.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group p-7 rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40 hover:border-slate-300 dark:hover:border-white/10 hover:bg-white dark:hover:bg-slate-950/70 transition-all"
            >
              <div className="flex items-start justify-between mb-5">
                <div className={`p-3 rounded-xl border ${area.glow}`}>
                  <area.icon className={`w-5 h-5 ${area.color}`} />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${area.statusColor}`}>
                  {area.status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{area.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{area.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex items-center justify-center gap-3 text-sm text-slate-400 dark:text-slate-600"
        >
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/5 max-w-xs" />
          <span>More research areas in development</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/5 max-w-xs" />
        </motion.div>

      </div>
    </section>
  );
}
