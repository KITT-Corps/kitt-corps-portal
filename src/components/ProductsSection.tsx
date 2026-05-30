import { motion } from 'motion/react';
import { Database, LayoutDashboard, Check, Mail, Lock, Cloud } from 'lucide-react';

const products = [
  {
    id: 'data-mate',
    name: 'Data-Mate',
    badge: 'Core Engine',
    badgeColor: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    accentColor: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/30',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20',
    icon: Database,
    iconColor: 'text-cyan-400',
    tagline: 'Unify your databases from a single cloud-managed service.',
    description:
      'Data-Mate is a fully managed cloud engine that consolidates heterogeneous data environments — MySQL, MongoDB, and more — into a single, optimised central repository. No infrastructure to manage, no manual scripting required.',
    capabilities: [
      'Automated schema parsing and type mapping across SQL and document stores',
      'Extensible pipeline architecture for warehouses and external API sources',
      'Managed entirely in the cloud — zero setup on your end',
    ],
    stack: ['Python 3.8+', 'MySQL', 'MongoDB', 'Cloud-managed'],
    version: 'v1.2.0-beta',
  },
  {
    id: 'datamateweb',
    name: 'DataMateWeb',
    badge: 'Web Dashboard',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    accentColor: 'text-purple-400',
    borderHover: 'hover:border-purple-500/30',
    iconBg: 'bg-purple-500/10 border-purple-500/20',
    icon: LayoutDashboard,
    iconColor: 'text-purple-400',
    tagline: 'Visualise and administer your data topology from anywhere.',
    description:
      'DataMateWeb is the cloud-hosted administrative companion to Data-Mate. With animated SVG topology trees and a full control dashboard, it gives your team real-time visibility into pipeline health, schema state, and connection status.',
    capabilities: [
      'Secure auth gateway with user sessions, login, and role management',
      'Interactive node topology maps for live schema visualisation',
      'Central database controls and real-time diagnostic indicators',
    ],
    stack: ['Python 3.6+', 'Flask', 'GSAP', 'Cloud-hosted'],
    version: 'v1.0.4-dev',
  },
];

export default function ProductsSection() {
  return (
    <section id="products" className="py-24 bg-slate-900/20 border-b border-white/5 relative">
      <div className="grid-lines absolute inset-0 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">Current Products</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Live in production.</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base leading-relaxed">
            Our current commercially licensed products operate in the data infrastructure domain. 
            Further products spanning AI, quantum computing, and software engineering are in active development.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`flex flex-col p-8 rounded-2xl border border-white/5 bg-slate-950/50 transition-colors ${product.borderHover}`}
            >
              <div className="flex items-center gap-4 mb-6">
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

              <div className="mt-auto flex flex-wrap gap-2">
                {product.stack.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-slate-900 border border-white/5 text-xs text-slate-400">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid sm:grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: Cloud, label: 'Fully cloud-managed', desc: 'No infrastructure to operate on your side.' },
            { icon: Lock, label: 'Strict privacy policy', desc: 'Your data is never shared, sold, or accessed without authorisation.' },
            { icon: Database, label: 'Full data ownership', desc: 'All client data remains exclusively yours at all times.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3 p-5 rounded-xl border border-white/5 bg-slate-950/30">
              <item.icon className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-200 mb-0.5">{item.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Licensing CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl border border-slate-800/60 bg-gradient-to-r from-cyan-950/20 to-purple-950/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-slate-400 text-center sm:text-left">
            <span className="text-white font-medium">Interested in licensing our products</span> for your organisation?
          </p>
          <a
            href="mailto:kittu.priyatham@gmail.com"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-sm text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Get in touch
          </a>
        </motion.div>

      </div>
    </section>
  );
}
