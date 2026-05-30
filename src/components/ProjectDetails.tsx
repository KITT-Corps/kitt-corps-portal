import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, GitFork, Terminal, BookOpen, Layers, Check, Copy } from 'lucide-react';

export default function ProjectDetails() {
  const [activeProject, setActiveProject] = useState<'datamate' | 'datamateweb'>('datamate');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const datamateCode = `# Initialize and Clone
git init
git clone https://github.com/KITT-Corps/Data-Mate.git
cd Data-Mate

# Spin Up Python Virtual Environment
python -m venv venv
source venv/bin/activate # Windows: venv\\Scripts\\activate

# Install Fusion Core dependencies
pip install -r requirements.txt

# Run Central Pipeline
python CentralDB.py`;

  const datamateWebCode = `# Clone official web dashboard
git clone https://github.com/Chaos-Corps/DataMateWeb.git
cd DataMateWeb

# Prepare Virtual Environment
python -m venv venv
source venv/bin/activate # Windows: venv\\Scripts\\activate

# Install Flask Administrative Core
pip install -r requirements.txt

# Start local webserver (port 5000)
python app.py`;

  return (
    <section id="installation-cli" className="py-20 bg-slate-900/30 border-b border-slate-800 relative">
      <div className="grid-lines absolute inset-0 opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">Our Products</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Two tools. One goal.
          </h2>
          <p className="mt-2 max-w-2xl mx-auto text-slate-400 font-sans leading-relaxed">
            KITT Corps ships two open-source products that work hand-in-hand to consolidate, visualise, 
            and govern your data infrastructure — entirely on your own terms.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="flex p-1.5 rounded-xl bg-slate-950 border border-slate-800">
            <button
              onClick={() => setActiveProject('datamate')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-300 cursor-pointer ${
                activeProject === 'datamate'
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Data-Mate</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-400">Core</span>
            </button>
            <button
              onClick={() => setActiveProject('datamateweb')}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-lg text-sm font-mono transition-all duration-300 cursor-pointer ${
                activeProject === 'datamateweb'
                  ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>DataMateWeb</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-purple-950 text-purple-400">Web Client</span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeProject === 'datamate' ? (
            <motion.div
              key="datamate"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* Product Documentation Column */}
              <div id="datamate-info-card" className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 text-xs font-mono font-bold">ACTIVE PIPELINE</span>
                    <span className="text-xs font-mono text-slate-500">v1.2.0-beta</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Data-Mate</h3>
                  <p className="text-slate-400 font-sans text-sm leading-relaxed mb-6">
                    With the supremacy of big data, extracting insights requires joining multiple databases. 
                    Data-Mate provides a lightweight Python engine to sync heterogeneous environments (MongoDB, MySQL) into a single optimized MySQL repository.
                  </p>

                  <h4 className="text-xs font-mono tracking-wider text-cyan-400 uppercase mb-3">Core Capabilities</h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold font-mono mt-0.5">↳</span>
                      <span>Consolidates boundless Associate Databases into a CentralDB schema</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold font-mono mt-0.5">↳</span>
                      <span>Automated type mappings for MySQL Tables & MongoDB Collections</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold font-mono mt-0.5">↳</span>
                      <span>Extensible pipeline structure ready for warehouses and external API sources</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/20">
                  <h4 className="text-sm font-mono tracking-wide text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    Stack & Prerequisites
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python 3.8+', 'MySQL Host', 'MongoDB Host', 'Git CLI'].map((item, i) => (
                      <span key={i} className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Repo File Tree & Terminals */}
              <div className="lg:col-span-7 space-y-6">
                {/* Simulated CLI Terminal */}
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                      <span className="ml-2.5 text-xs text-slate-400 font-mono">bash // install-datamate.sh</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(datamateCode, 'datamate')}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-all scale-95 hover:scale-100 cursor-pointer"
                      title="Copy code"
                    >
                      {copiedText === 'datamate' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-5 font-mono text-xs text-slate-300 leading-6 overflow-x-auto bg-[#070b13]">
                    <span className="text-slate-500"># 1. Initialize Git & Clone code</span><br />
                    <span className="text-cyan-400">git init</span><br />
                    <span className="text-cyan-400">git clone https://github.com/KITT-Corps/Data-Mate.git</span><br />
                    <span className="text-cyan-300">cd Data-Mate</span><br /><br />

                    <span className="text-slate-500"># 2. Config Python Virtual Environment</span><br />
                    <span className="text-cyan-400">python -m venv venv</span><br />
                    <span className="text-cyan-300">source venv/bin/activate</span> <span className="text-slate-500"># Linux/macOS</span><br />
                    <span className="text-slate-500"># Windows: venv\Scripts\activate</span><br /><br />

                    <span className="text-slate-500"># 3. Mount requirements</span><br />
                    <span className="text-cyan-400">pip install -r requirements.txt</span><br /><br />

                    <span className="text-slate-500"># 4. Fire DB Integration Engine</span><br />
                    <span className="text-emerald-400">python CentralDB.py</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/20 font-mono text-xs text-slate-400 flex items-center justify-between">
                  <span>GitHub Repository: <strong className="text-slate-200">github.com/KITT-Corps/Data-Mate</strong></span>
                  <a 
                    href="https://github.com/KITT-Corps/Data-Mate" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-cyan-400 hover:underline inline-flex items-center gap-1.5"
                  >
                    <GitFork className="w-3.5 h-3.5" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="datamateweb"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-12 gap-8 items-start"
            >
              {/* Product Documentation Column */}
              <div id="datamateweb-info-card" className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/60 backdrop-blur-md">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="p-2 rounded-lg bg-purple-500/10 text-purple-400 text-xs font-mono font-bold">ADMIN CLIENT</span>
                    <span className="text-xs font-mono text-slate-500">v1.0.4-dev</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">DataMateWeb</h3>
                  <p className="text-slate-400 font-sans text-sm leading-relaxed mb-6">
                    DataMateWeb is the web-based administrative companion for the Data-Mate core database API. 
                    Built on top of Python Flask and powered by GSAP SVG animations, it offers data visualizers, connection setup modals, and node topology trees in a sleek, responsive dark theme.
                  </p>

                  <h4 className="text-xs font-mono tracking-wider text-purple-400 uppercase mb-3">Key Capabilities</h4>
                  <ul className="space-y-3 text-sm text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold font-mono mt-0.5">↳</span>
                      <span>Auth gateway with user login, registration, and sessions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold font-mono mt-0.5">↳</span>
                      <span>Interactive visual mapping of connected schema nodes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-purple-400 font-bold font-mono mt-0.5">↳</span>
                      <span>Central database setup controls and diagnostic dashboard indicators</span>
                    </li>
                  </ul>
                </div>

                {/* Technical Stack Card */}
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/20">
                  <h4 className="text-sm font-mono tracking-wide text-white mb-3 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    Stack & Prerequisites
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {['Python 3.6+', 'Flask (Backend)', 'GSAP (Animations)', 'Bootstrap / Tailwind CSS'].map((item, i) => (
                      <span key={i} className="px-3 py-1 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* File Tree & Visualizer */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
                  {/* File structure tree tabs */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/40">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                      <span className="ml-2.5 text-xs text-slate-400 font-mono">bash // install-datamate-web.sh</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(datamateWebCode, 'datamateweb')}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-all scale-95 hover:scale-100 cursor-pointer"
                      title="Copy code"
                    >
                      {copiedText === 'datamateweb' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="p-5 font-mono text-xs text-slate-300 leading-6 overflow-x-auto bg-[#070b13]">
                    <span className="text-slate-500"># 1. Clone dashboard source</span><br />
                    <span className="text-purple-400">git clone https://github.com/Chaos-Corps/DataMateWeb.git</span><br />
                    <span className="text-purple-300">cd DataMateWeb</span><br /><br />

                    <span className="text-slate-500"># 2. Setup environment sandbox</span><br />
                    <span className="text-purple-400">python -m venv venv</span><br />
                    <span className="text-purple-300">source venv/bin/activate</span> <span className="text-slate-500"># Linux/macOS</span><br />
                    <span className="text-slate-500"># Windows: venv\Scripts\activate</span><br /><br />

                    <span className="text-slate-500"># 3. Mount Flask stack dependencies</span><br />
                    <span className="text-purple-400">pip install -r requirements.txt</span><br /><br />

                    <span className="text-slate-500"># 4. Initiate Flask interface server</span><br />
                    <span className="text-emerald-400">python app.py</span><br />
                    <span className="text-slate-500"># Running on http://127.0.0.1:5000/</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-800/60 bg-slate-900/20 font-mono text-xs text-slate-400 flex items-center justify-between">
                  <span>GitHub Repository: <strong className="text-slate-200">github.com/Chaos-Corps/DataMateWeb</strong></span>
                  <a 
                    href="https://github.com/Chaos-Corps/DataMateWeb" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-purple-400 hover:underline inline-flex items-center gap-1.5"
                  >
                    <GitFork className="w-3.5 h-3.5" /> Code
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
