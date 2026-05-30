import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ResearchSection from './components/ResearchSection';
import ProductsSection from './components/ProductsSection';
import TeamSection from './components/TeamSection';
import { Mail, Cpu } from 'lucide-react';

export default function App() {
  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">

      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-cyan-950/15 to-transparent pointer-events-none" />

      {/* ── Navigation ── */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#070b13]/90 border-b border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 group"
          >
            <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-base font-bold tracking-tight text-white">KITT Corps</span>
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            {[
              { label: 'About', id: 'about' },
              { label: 'Research', id: 'research' },
              { label: 'Products', id: 'products' },
              { label: 'Team', id: 'team' },
              { label: 'Contact', id: 'contact' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToId(item.id)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <a
            href="mailto:kittu.priyatham@gmail.com"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border border-white/10 text-xs text-slate-300 hover:text-white hover:border-white/20 transition-all"
          >
            <Mail className="w-3.5 h-3.5" />
            Contact
          </a>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection
          onScrollToAbout={() => scrollToId('about')}
          onScrollToProducts={() => scrollToId('products')}
          onScrollToMerge={() => scrollToId('products')}
          onScrollToNodes={() => scrollToId('products')}
          onScrollToInstall={() => scrollToId('products')}
        />
        <AboutSection />
        <ResearchSection />
        <ProductsSection />
        <TeamSection />

        {/* ── Contact ── */}
        <section id="contact" className="py-28 bg-[#070b13]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs tracking-widest text-cyan-400 uppercase mb-4 font-mono">Contact</p>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5">Let's talk.</h2>
            <p className="text-slate-400 text-base leading-relaxed mb-10">
              Have a question about our products, interested in a commercial licence, 
              or want to explore a research collaboration? We'd love to hear from you.
            </p>
            <a
              href="mailto:kittu.priyatham@gmail.com"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl border border-cyan-400 bg-cyan-400 text-slate-950 text-sm font-semibold hover:bg-transparent hover:text-cyan-400 transition-all glow-cyan"
            >
              <Mail className="w-4 h-4" />
              kittu.priyatham@gmail.com
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-slate-950 border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10 mb-10">

            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="font-bold text-white">KITT Corps</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Cloud-native research and development organisation advancing proprietary 
                technology across software engineering, AI, quantum computing, and data infrastructure.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs tracking-wider uppercase text-slate-300 font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                {[
                  { label: 'About', id: 'about' },
                  { label: 'Research', id: 'research' },
                  { label: 'Products', id: 'products' },
                  { label: 'Team', id: 'team' },
                  { label: 'Contact', id: 'contact' },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToId(item.id)}
                      className="hover:text-slate-200 transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-600">
              &copy; {new Date().getFullYear()} KITT Corps. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">Research & Development Organisation</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
