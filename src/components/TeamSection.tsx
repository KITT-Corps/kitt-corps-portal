import { motion } from 'motion/react';
import { Mail, GitBranch } from 'lucide-react';

export default function TeamSection() {
  return (
    <section id="team" className="py-24 bg-slate-900/20 border-b border-slate-800/60 relative">
      <div className="grid-lines absolute inset-0 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">The Team</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">The people behind KITT Corps</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            A small, focused team of engineers and designers building practical tools for the data community.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="w-full max-w-sm"
          >
            <div className="p-8 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md hover:border-slate-700 transition-colors">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-purple-500/30 border border-cyan-500/20 flex items-center justify-center text-2xl font-bold text-white mb-5">
                KP
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Krishna Priyatham Potluri</h3>
              <p className="text-xs font-mono text-cyan-400 tracking-wide uppercase mb-4">Founder · Lead Engineer & Designer</p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Built KITT Corps to solve real data-engineering friction he encountered firsthand — 
                wrestling multiple disparate databases into a coherent schema without heavyweight commercial tooling.
              </p>
              <div className="flex gap-3">
                <a
                  href="mailto:kittu.priyatham@gmail.com"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  Contact
                </a>
                <a
                  href="https://github.com/KITT-Corps"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-all"
                >
                  <GitBranch className="w-3.5 h-3.5 text-purple-400" />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 text-center p-8 rounded-2xl border border-dashed border-slate-700 bg-slate-900/20 max-w-lg mx-auto"
        >
          <p className="text-sm font-bold text-slate-300 mb-2">Interested in contributing?</p>
          <p className="text-sm text-slate-500 mb-4">
            KITT Corps is open to collaborators. Open a pull request on any of our repositories to get involved.
          </p>
          <a
            href="https://github.com/KITT-Corps"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:underline"
          >
            <GitBranch className="w-3.5 h-3.5" />
            View all repositories →
          </a>
        </motion.div>

      </div>
    </section>
  );
}
