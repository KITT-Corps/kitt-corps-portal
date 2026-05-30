import { motion } from 'motion/react';
import { ArrowRight, GitBranch } from 'lucide-react';

interface HeroProps {
  onScrollToMerge: () => void;
  onScrollToNodes: () => void;
  onScrollToInstall: () => void;
  onScrollToAbout: () => void;
  onScrollToProducts: () => void;
}

export default function HeroSection({ onScrollToAbout, onScrollToProducts }: HeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/5 bg-[#070b13] pt-24 pb-32 md:pb-40">
      <div className="grid-lines absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/6 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/5 w-[500px] h-[500px] rounded-full bg-purple-500/6 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-slate-400 mb-8"
          >
            Research & Development · Open Source
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-7 leading-[1.06]"
          >
            Engineering the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-purple-400">
              future of data
            </span>{' '}
            infrastructure.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl"
          >
            KITT Corps builds open-source tools that help engineering teams connect, 
            unify, and govern heterogeneous databases — without the overhead of 
            commercial platforms or vendor lock-in.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onScrollToProducts}
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-cyan-400 border border-cyan-400 text-slate-950 text-sm font-semibold hover:bg-transparent hover:text-cyan-400 transition-all duration-300 glow-cyan cursor-pointer"
            >
              Explore our products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onScrollToAbout}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 text-sm text-slate-300 hover:text-white hover:border-white/20 transition-all cursor-pointer"
            >
              About us
            </button>

            <a
              href="https://github.com/KITT-Corps"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm text-slate-400 hover:text-white transition-all"
            >
              <GitBranch className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Company metrics strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-24 flex flex-wrap gap-x-16 gap-y-6"
        >
          {[
            { value: '2', label: 'Open-source products' },
            { value: 'MIT', label: 'Licensed & free to use' },
            { value: '100%', label: 'Self-hostable, no SaaS' },
            { value: 'Zero', label: 'Vendor lock-in' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
