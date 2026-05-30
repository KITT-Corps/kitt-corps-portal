import { motion } from 'motion/react';
import { ArrowRight, GitBranch, Cpu } from 'lucide-react';

interface HeroProps {
  onScrollToMerge: () => void;
  onScrollToNodes: () => void;
  onScrollToInstall: () => void;
  onScrollToAbout: () => void;
  onScrollToProducts: () => void;
}

export default function HeroSection({ onScrollToAbout, onScrollToProducts }: HeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-slate-800 bg-slate-950/80 pt-20 pb-28 md:pb-36">
      <div className="grid-lines absolute inset-0 opacity-30 pointer-events-none" />

      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-500/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-xs font-mono tracking-widest text-cyan-400 uppercase mb-8"
          >
            <Cpu className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>Research & Development</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]"
          >
            Engineering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-purple-400">
              future of data
            </span>
            <br />infrastructure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 font-sans leading-relaxed mb-10 max-w-2xl"
          >
            KITT Corps builds open-source developer tools that simplify how teams connect, unify, and govern 
            heterogeneous data systems — so engineers spend less time plumbing and more time building.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onScrollToProducts}
              className="group px-6 py-3.5 rounded-lg font-sans text-sm font-semibold border border-cyan-400 bg-cyan-400 text-slate-950 hover:bg-transparent hover:text-cyan-400 transition-all duration-300 glow-cyan cursor-pointer inline-flex items-center gap-2"
            >
              Explore Our Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onScrollToAbout}
              className="px-6 py-3.5 rounded-lg font-sans text-sm font-medium border border-slate-700 bg-transparent text-slate-300 hover:border-slate-500 hover:text-white transition-all cursor-pointer"
            >
              About KITT Corps
            </button>

            <a
              href="https://github.com/KITT-Corps"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3.5 rounded-lg font-sans text-sm font-medium text-slate-400 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4 text-purple-400" />
              GitHub Organisation
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid sm:grid-cols-3 gap-px bg-slate-800/60 rounded-2xl overflow-hidden border border-slate-800"
        >
          {[
            { value: '2+', label: 'Open-source projects', color: 'text-cyan-400' },
            { value: '100%', label: 'Developer owned & self-hostable', color: 'text-emerald-400' },
            { value: 'MIT', label: 'Licensed & free forever', color: 'text-purple-400' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-950/70 px-8 py-6">
              <div className={`text-3xl font-bold font-mono mb-1 ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
