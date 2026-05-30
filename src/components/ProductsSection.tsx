import { motion } from 'motion/react';
import { GitBranch, Database, LayoutDashboard, ArrowUpRight, Check } from 'lucide-react';

const products = [
  {
    id: 'data-mate',
    name: 'Data-Mate',
    badge: 'Core Engine',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    accentColor: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/40',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    icon: Database,
    iconColor: 'text-cyan-400',
    tagline: 'Unify your databases with a single command.',
    description:
      'Data-Mate is a lightweight Python engine that consolidates heterogeneous data environments — MySQL, MongoDB, and more — into a single, optimised central repository. No manual scripting required.',
    capabilities: [
      'Automated schema parsing and type mapping across SQL and document stores',
      'Extensible pipeline structure for warehouses and external API sources',
      'Command-line operable with zero cloud dependency',
    ],
    stack: ['Python 3.8+', 'MySQL', 'MongoDB', 'MIT License'],
    version: 'v1.2.0-beta',
    repo: 'https://github.com/KITT-Corps/Data-Mate',
    repoLabel: 'KITT-Corps/Data-Mate',
  },
  {
    id: 'datamateweb',
    name: 'DataMateWeb',
    badge: 'Web Dashboard',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    accentColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/40',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    icon: LayoutDashboard,
    iconColor: 'text-purple-400',
    tagline: 'Visualise and administer your data topology.',
    description:
      'DataMateWeb is the browser-based companion to Data-Mate. Built on Python Flask with animated SVG topology trees, it provides a full administrative interface for managing connections, schemas, and data pipeline health.',
    capabilities: [
      'Auth gateway with user sessions, login, and registration',
      'Interactive node topology maps for connected schema visualisation',
      'Central database controls and diagnostic dashboard indicators',
    ],
    stack: ['Python 3.6+', 'Flask', 'GSAP', 'MIT License'],
    version: 'v1.0.4-dev',
    repo: 'https://github.com/Chaos-Corps/DataMateWeb',
    repoLabel: 'Chaos-Corps/DataMateWeb',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-slate-900/20 border-b border-slate-800/60 relative">
      <div className="grid-lines absolute inset-0 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">Our Products</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Two tools. One goal.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            KITT Corps ships two open-source products that work together to consolidate, 
            visualise, and govern your data infrastructure — entirely on your own terms.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`group flex flex-col p-8 rounded-2xl border border-slate-800 bg-slate-950/50 transition-colors ${product.borderHover}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl border ${product.iconBg}`}>
                    <product.icon className={`w-6 h-6 ${product.iconColor}`} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-xl font-bold text-white">{product.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${product.badgeColor}`}>
                        {product.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-mono">{product.version}</p>
                  </div>
                </div>
              </div>

              <p className={`text-base font-semibold mb-3 ${product.accentColor}`}>
                {product.tagline}
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="mb-6 space-y-2.5">
                {product.capabilities.map((cap) => (
                  <div key={cap} className="flex items-start gap-3">
                    <Check className={`w-4 h-4 mt-0.5 shrink-0 ${product.accentColor}`} />
                    <span className="text-sm text-slate-300">{cap}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8 flex flex-wrap gap-2">
                {product.stack.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-400">
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-auto">
                <a
                  href={product.repo}
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${product.accentColor} hover:underline`}
                >
                  <GitBranch className="w-4 h-4" />
                  {product.repoLabel}
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Subtle integration callout */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 p-6 rounded-2xl border border-slate-800/60 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 text-center"
        >
          <p className="text-sm text-slate-400">
            <span className="text-white font-medium">Data-Mate</span> and{' '}
            <span className="text-white font-medium">DataMateWeb</span> are designed to be used together —
            run the pipeline engine from the command line, then monitor and manage it through the web dashboard.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
