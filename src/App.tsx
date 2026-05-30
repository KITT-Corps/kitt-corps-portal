import { useRef } from 'react';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectDetails from './components/ProjectDetails';
import DatabaseMerger from './components/DatabaseMerger';
import NodeVisualizer from './components/NodeVisualizer';
import TeamSection from './components/TeamSection';
import { GitBranch, Mail, Cpu } from 'lucide-react';

export default function App() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-cyan-950/15 to-transparent pointer-events-none" />

      {/* Navigation */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              KITT <span className="text-cyan-400 font-mono text-sm tracking-widest uppercase">CORPS</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-7 text-sm text-slate-400">
            <button
              onClick={() => scrollToId('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => scrollToId('products')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Products
            </button>
            <button
              onClick={() => scrollToId('team')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Team
            </button>
            <button
              onClick={() => scrollToId('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/KITT-Corps"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 text-xs font-mono text-slate-300 hover:text-white hover:border-slate-700 transition-all inline-flex items-center gap-2"
            >
              <GitBranch className="w-3.5 h-3.5 text-purple-400" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero — company identity */}
        <HeroSection
          onScrollToAbout={() => scrollToId('about')}
          onScrollToProducts={() => scrollToId('products')}
          onScrollToMerge={() => scrollToId('database-merger')}
          onScrollToNodes={() => scrollToId('node-visualizer')}
          onScrollToInstall={() => scrollToId('installation-cli')}
        />

        {/* About — mission & values */}
        <AboutSection />

        {/* Products — project documentation */}
        <div id="products">
          <ProjectDetails />
        </div>

        {/* Interactive demos — Data-Mate playground */}
        <DatabaseMerger />

        {/* Interactive demos — DataMateWeb topology visualiser */}
        <NodeVisualizer />

        {/* Team */}
        <TeamSection />

        {/* Contact */}
        <section id="contact" className="py-24 bg-[#070b13] border-t border-slate-800/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Get in touch</h2>
            <p className="text-slate-400 max-w-lg mx-auto mb-10">
              Have a question about our tools, want to collaborate, or just want to say hello? 
              Reach out directly — we'd love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:kittu.priyatham@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-cyan-400 bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-transparent hover:text-cyan-400 transition-all glow-cyan"
              >
                <Mail className="w-4 h-4" />
                kittu.priyatham@gmail.com
              </a>
              <a
                href="https://github.com/KITT-Corps"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg border border-slate-700 text-sm text-slate-300 hover:text-white hover:border-slate-500 transition-all"
              >
                <GitBranch className="w-4 h-4 text-purple-400" />
                GitHub Organisation
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-10">

          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="text-md font-bold text-white">KITT Corps</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Open-source developer tools for database orchestration, schema unification, 
              and data infrastructure. Built by engineers, for engineers.
            </p>
            <p className="text-[10px] font-mono text-slate-600">
              &copy; {new Date().getFullYear()} KITT Corps. MIT Licensed.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-wider uppercase text-slate-300 font-bold">Company</h4>
            <ul className="space-y-2 text-xs list-none p-0 m-0">
              <li><button onClick={() => scrollToId('about')} className="hover:text-slate-200 transition-colors cursor-pointer">About</button></li>
              <li><button onClick={() => scrollToId('products')} className="hover:text-slate-200 transition-colors cursor-pointer">Products</button></li>
              <li><button onClick={() => scrollToId('team')} className="hover:text-slate-200 transition-colors cursor-pointer">Team</button></li>
              <li><button onClick={() => scrollToId('contact')} className="hover:text-slate-200 transition-colors cursor-pointer">Contact</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-mono tracking-wider uppercase text-slate-300 font-bold">Repositories</h4>
            <ul className="space-y-2 text-xs font-mono list-none p-0 m-0">
              <li>
                <a
                  href="https://github.com/KITT-Corps/Data-Mate"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-cyan-400 transition-colors block"
                >
                  ↳ Data-Mate
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Chaos-Corps/DataMateWeb"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-purple-400 transition-colors block"
                >
                  ↳ DataMateWeb
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/KITT-Corps"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-slate-200 transition-colors block"
                >
                  ↳ View All
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

    </div>
  );
}
