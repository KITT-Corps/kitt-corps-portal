import { motion } from 'motion/react';
import { Mail } from 'lucide-react';

export default function TeamSection() {
  return (
    <section id="team" className="py-28 bg-white dark:bg-slate-950/40 border-b border-slate-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-500 dark:text-cyan-400 uppercase mb-4">The Team</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            The people behind KITT Corps
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-base">
            A focused team of engineers and designers building practical tools for the data engineering community.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-lg"
          >
            <div className="p-8 rounded-2xl border border-slate-200 dark:border-white/8 bg-slate-50 dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-white/15 transition-colors">
              <div className="flex items-start gap-5 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-100 to-purple-100 dark:from-cyan-500/25 dark:to-purple-500/25 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xl font-bold text-cyan-700 dark:text-white shrink-0">
                  KP
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">
                    Krishna Priyatham Potluri
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Founder · Lead Engineer & Designer</p>
                  <p className="text-xs text-slate-400 dark:text-slate-600">KITT Corps</p>
                </div>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Built KITT Corps to solve real data-engineering friction encountered firsthand —
                wrestling multiple disparate databases into a coherent schema without heavyweight
                commercial tooling. Every product reflects that same drive toward simplicity and
                developer ownership.
              </p>

              <a
                href="mailto:kittu.priyatham@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 dark:border-white/8 text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-white/20 bg-white dark:bg-transparent transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                kittu.priyatham@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center p-8 rounded-2xl border border-dashed border-slate-300 dark:border-white/10 max-w-lg mx-auto"
        >
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-300 mb-2">Interested in joining the team?</p>
          <p className="text-sm text-slate-500 mb-5">
            We're always open to conversations with talented engineers who care about data infrastructure. Reach out directly.
          </p>
          <a
            href="mailto:kittu.priyatham@gmail.com"
            className="inline-flex items-center gap-2 text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <Mail className="w-3.5 h-3.5" />
            Get in touch
          </a>
        </motion.div>

      </div>
    </section>
  );
}
