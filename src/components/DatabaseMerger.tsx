import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Database, Terminal, Shield, Play, HelpCircle, Check, Loader2, Info, CheckCircle2, ChevronRight, RefreshCw, Sparkles } from 'lucide-react';
import { DatabaseSource, DatabaseType, PipelineLog, TableInfo } from '../types';

const INITIAL_SOURCES: DatabaseSource[] = [
  {
    id: 'db_finance',
    name: 'db_finances',
    type: 'MySQL',
    host: '10.0.42.12:3306',
    status: 'connected',
    tables: [
      {
        id: 't_transactions',
        name: 'ledger_transactions',
        rowsCount: 14820,
        selected: true,
        columns: [
          { name: 'id', type: 'INT (PK)' },
          { name: 'amount', type: 'DECIMAL(10,2)' },
          { name: 'currency', type: 'VARCHAR(3)' },
          { name: 'profile_id', type: 'INT (FK)' },
          { name: 'created_at', type: 'TIMESTAMP' }
        ]
      },
      {
        id: 't_invoices',
        name: 'customer_invoices',
        rowsCount: 4120,
        selected: true,
        columns: [
          { name: 'invoice_id', type: 'VARCHAR(64) (PK)' },
          { name: 'user_id', type: 'INT' },
          { name: 'status', type: 'VARCHAR(16)' },
          { name: 'subtotal', type: 'DECIMAL(12,2)' }
        ]
      },
      {
        id: 't_audits',
        name: 'internal_audits',
        rowsCount: 780,
        selected: false,
        columns: [
          { name: 'audit_id', type: 'INT (PK)' },
          { name: 'performed_by', type: 'VARCHAR(255)' },
          { name: 'notes', type: 'TEXT' }
        ]
      }
    ]
  },
  {
    id: 'db_shipping',
    name: 'db_logistics_mongo',
    type: 'MongoDB',
    host: 'cluster0.mongodb.net/cargo',
    status: 'connected',
    tables: [
      {
        id: 'c_shipments',
        name: 'shipments',
        rowsCount: 8900,
        selected: true,
        columns: [
          { name: '_id', type: 'ObjectId (PK)' },
          { name: 'tracking_num', type: 'String' },
          { name: 'recipient_zip', type: 'String' },
          { name: 'courier_service', type: 'String' },
          { name: 'status_history', type: 'Array<Object>' }
        ]
      },
      {
        id: 'c_warehouses',
        name: 'warehouse_map',
        rowsCount: 120,
        selected: false,
        columns: [
          { name: '_id', type: 'ObjectId (PK)' },
          { name: 'hub_code', type: 'String' },
          { name: 'address', type: 'Object' },
          { name: 'capacity_sqft', type: 'Int32' }
        ]
      }
    ]
  },
  {
    id: 'db_auth',
    name: 'db_id_postgres',
    type: 'PostgreSQL',
    host: 'postgres-pool.local:5432',
    status: 'connected',
    tables: [
      {
        id: 't_users',
        name: 'accounts_users',
        rowsCount: 21900,
        selected: true,
        columns: [
          { name: 'usr_id', type: 'SERIAL (PK)' },
          { name: 'email', type: 'VARCHAR(255)' },
          { name: 'password_hash', type: 'VARCHAR(60)' },
          { name: 'last_login', type: 'TIMESTAMPTZ' }
        ]
      },
      {
        id: 't_sessions',
        name: 'active_sessions',
        rowsCount: 940,
        selected: false,
        columns: [
          { name: 'sid', type: 'UUID (PK)' },
          { name: 'user_ref', type: 'INTEGER' },
          { name: 'token', type: 'TEXT' }
        ]
      }
    ]
  }
];

export default function DatabaseMerger() {
  const [sources, setSources] = useState<DatabaseSource[]>(INITIAL_SOURCES);
  const [centralDBName, setCentralDBName] = useState('CentralDB');
  const [isProcessing, setIsProcessing] = useState(false);
  const [syncComplete, setSyncComplete] = useState(false);
  const [logs, setLogs] = useState<PipelineLog[]>([]);
  const [selectedTablePreview, setSelectedTablePreview] = useState<string | null>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const toggleTableSelection = (sourceId: string, tableId: string) => {
    if (isProcessing) return;
    setSources(prev => prev.map(source => {
      if (source.id !== sourceId) return source;
      return {
        ...source,
        tables: source.tables.map(table => {
          if (table.id !== tableId) return table;
          return { ...table, selected: !table.selected };
        })
      };
    }));
  };

  const getSelectedTablesCount = () => {
    return sources.reduce((acc, s) => acc + s.tables.filter(t => t.selected).length, 0);
  };

  const executePipeline = async () => {
    if (getSelectedTablesCount() === 0) return;
    
    setIsProcessing(true);
    setSyncComplete(false);
    setSelectedTablePreview(null);
    setLogs([]);

    const selectedTables = sources.flatMap(s => s.tables.filter(t => t.selected).map(t => ({ ...t, dbType: s.type, dbName: s.name })));

    const pipelineSteps: { message: string; delay: number; level: 'info' | 'success' | 'warn' | 'error' }[] = [
      { message: `[SYS] Starting KITT Corps Data-Mate pipeline v1.2.0...`, delay: 100, level: 'info' },
      { message: `[SYS] centralDB target configured to MySQL: '${centralDBName}'`, delay: 400, level: 'info' },
      { message: `[CONNECT] Dialing associate MySQL instance: @10.0.42.12:3306`, delay: 600, level: 'info' },
      { message: `[CONNECT] SUCCESS: Logged in db_finances successfully. Found ${sources[0].tables.length} tables`, delay: 500, level: 'success' },
      { message: `[CONNECT] Dialing MongoDB client: @cluster0.mongodb.net`, delay: 600, level: 'info' },
      { message: `[CONNECT] SUCCESS: Handshaking with cluster. Mongo collections active.`, delay: 400, level: 'success' },
      { message: `[CONNECT] Dialing PostgreSQL server pool: @postgres-pool.local`, delay: 500, level: 'info' },
      { message: `[CONNECT] SUCCESS: Read structural schemas of db_id_postgres.`, delay: 300, level: 'success' },
      { message: `[AUTO-MAP] Analyzing heterogeneous data models...`, delay: 800, level: 'info' },
    ];

    selectedTables.forEach((table, index) => {
      pipelineSteps.push({
        message: `[TRANSFER] Replicating structure from ${table.dbName}.${table.name} (${table.dbType}) into central [${table.name}]`,
        delay: 500,
        level: 'info'
      });
      pipelineSteps.push({
        message: `[MAPPING] Auto-aligned types: Converted ${table.dbType === 'MongoDB' ? 'ObjectId' : 'Serial'} columns to matching central schema.`,
        delay: 450,
        level: 'info'
      });
      pipelineSteps.push({
        message: `[TRANSFER] SUCCESS: Sync data [${table.name}] finished. Synced ${table.rowsCount.toLocaleString()} index streams.`,
        delay: 500,
        level: 'success'
      });
    });

    pipelineSteps.push({ message: `[SYS] Generating SQL optimized indexes...`, delay: 700, level: 'info' });
    pipelineSteps.push({ message: `[SYS] Data-Mate integration complete! Unified centralized repository is ready.`, delay: 600, level: 'success' });

    // Stream logs
    for (const step of pipelineSteps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      setLogs(prev => [...prev, {
        timestamp: new Date().toLocaleTimeString(),
        level: step.level,
        message: step.message
      }]);
    }

    setIsProcessing(false);
    setSyncComplete(true);
    // Auto select first table for preview
    const firstSelected = selectedTables[0];
    if (firstSelected) {
      setSelectedTablePreview(firstSelected.id);
    }
  };

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Mock compiled table rows for interactive queries
  const getMockRows = (tableId: string) => {
    switch (tableId) {
      case 't_transactions':
        return [
          { id: 1024, amount: '$150.00', currency: 'USD', profile_id: 1104, created_at: '2026-05-30 08:12:00' },
          { id: 1025, amount: '$29.99', currency: 'USD', profile_id: 1215, created_at: '2026-05-30 08:34:11' },
          { id: 1026, amount: '€895.00', currency: 'EUR', profile_id: 1089, created_at: '2026-05-30 09:01:45' },
          { id: 1027, amount: '$420.50', currency: 'USD', profile_id: 1442, created_at: '2026-05-30 10:15:23' }
        ];
      case 't_invoices':
        return [
          { invoice_id: 'INV-2026-0091', user_id: 550, status: 'PAID', subtotal: '$2,450.00' },
          { invoice_id: 'INV-2026-0092', user_id: 1104, status: 'PAID', subtotal: '$150.00' },
          { invoice_id: 'INV-2026-0093', user_id: 819, status: 'PENDING', subtotal: '$75.50' }
        ];
      case 'c_shipments':
        return [
          { _id: '64f8ca1b9d1e', tracking_num: 'KC-71822-US', recipient_zip: '94043', courier_service: 'KITT-Exp', status_history: 'Delivered' },
          { _id: '64f8ca1b9d1f', tracking_num: 'KC-89110-GB', recipient_zip: 'SW1A', courier_service: 'Courier-X', status_history: 'Transit' }
        ];
      case 't_users':
        return [
          { usr_id: 101, email: 'kittu.priyatham@gmail.com', password_hash: '$2b$12$K89sVp...', last_login: '2026-05-30 11:20:10' },
          { usr_id: 102, email: 'michael.knight@flag.org', password_hash: '$2b$12$R20vTk...', last_login: '2026-05-29 17:45:00' },
          { usr_id: 103, email: 'dev.lead@kittcorps.io', password_hash: '$2b$12$L73dfQ...', last_login: '2026-05-30 05:00:22' }
        ];
      default:
        return [];
    }
  };

  const getTableColumns = (tableId: string) => {
    for (const source of sources) {
      const found = source.tables.find(t => t.id === tableId);
      if (found) return found.columns;
    }
    return [];
  };

  const getTableName = (tableId: string) => {
    for (const source of sources) {
      const found = source.tables.find(t => t.id === tableId);
      if (found) return found.name;
    }
    return 'unknown_table';
  };

  const getSelectedTables = () => {
    return sources.flatMap(s => s.tables.filter(t => t.selected));
  };

  return (
    <section id="database-merger" className="py-20 bg-slate-950 relative border-b border-sidebar border-slate-800">
      <div className="grid-lines absolute inset-0 opacity-15 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Module Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full">
            Local Interactive Prototype
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 sm:text-4xl font-sans">
            Data-Mate Engine Control Panel
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 font-sans leading-relaxed text-sm">
            Configure host databases, select targets, and trigger the compilation sequence. Watch standard terminal mapping and query database rows instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT: Target & Database Options */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md">
              <h3 className="text-lg font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Database className="w-4 h-4 text-cyan-400" />
                Configure Associate Sources
              </h3>

              {/* Central DB Name input */}
              <div className="mb-6">
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">Central Database Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={centralDBName}
                    onChange={(e) => setCentralDBName(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                    disabled={isProcessing}
                    placeholder="Enter database name"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3.5 font-mono text-sm text-cyan-400 focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <span className="absolute right-3.5 top-3 text-[10px] text-slate-500 font-mono">.mysql</span>
                </div>
              </div>

              {/* Source List */}
              <div className="space-y-5">
                {sources.map(source => (
                  <div key={source.id} className="p-4 rounded-xl border border-slate-800 bg-slate-950/40">
                    <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                          source.type === 'MySQL' ? 'bg-cyan-950 text-cyan-400 border-cyan-500/20' :
                          source.type === 'MongoDB' ? 'bg-green-950 text-green-400 border-green-500/20' :
                          'bg-indigo-950 text-indigo-400 border-indigo-500/20'
                        }`}>
                          {source.type}
                        </span>
                        <span className="text-sm font-semibold text-slate-200 font-sans">{source.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{source.host}</span>
                    </div>

                    {/* Tables Inside This DB */}
                    <div className="space-y-2">
                      {source.tables.map(table => (
                        <div 
                          key={table.id}
                          className={`flex items-center justify-between p-2.5 rounded-lg border text-xs font-mono transition-all ${
                            table.selected 
                              ? 'border-cyan-500/30 bg-cyan-950/10 text-cyan-300' 
                              : 'border-transparent text-slate-400 hover:bg-slate-800/20 hover:text-slate-300'
                          }`}
                        >
                          <label className="flex items-center gap-2.5 cursor-pointer select-none w-full">
                            <input
                              type="checkbox"
                              checked={table.selected}
                              disabled={isProcessing}
                              onChange={() => toggleTableSelection(source.id, table.id)}
                              className="accent-cyan-500 w-3.5 h-3.5 bg-slate-900 border-slate-800"
                            />
                            <span>{table.name}</span>
                          </label>
                          <span className="text-[10px] text-slate-500">({table.rowsCount.toLocaleString()} rows)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Run Trigger */}
              <button
                onClick={executePipeline}
                disabled={isProcessing || getSelectedTablesCount() === 0}
                className="mt-6 w-full group relative flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-lg text-sm font-mono font-bold tracking-widest text-slate-950 bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-500 hover:to-cyan-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-300 cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                    <span>MERGING PIXEL PATHS...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current text-slate-950 transition-transform group-hover:scale-125" />
                    <span>RUN DATA-MATE PIPELINE ({getSelectedTablesCount()})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RIGHT: Live Terminal & Query Results */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            {/* Terminal Console Log Output */}
            <div className="flex-1 rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden flex flex-col min-h-[300px]">
              <div className="px-4 py-3 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-mono text-slate-400">Data-Mate Stream // stdout</span>
                </div>
                {isProcessing && (
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    COMPILING SHIELDS
                  </span>
                )}
              </div>

              <div className="flex-1 p-5 font-mono text-xs text-slate-300 overflow-y-auto space-y-2 bg-[#070b13] max-h-[350px]">
                {logs.length === 0 ? (
                  <div className="text-slate-500 italic h-full flex flex-col items-center justify-center gap-2 py-8">
                    <Database className="w-8 h-8 text-slate-700 animate-bounce" />
                    <span>Configure associate models and press Run pipeline...</span>
                  </div>
                ) : (
                  logs.map((log, i) => (
                    <div key={i} className={`flex items-start gap-2.5 leading-5 ${
                      log.level === 'success' ? 'text-emerald-400' :
                      log.level === 'warn' ? 'text-amber-400' :
                      log.level === 'error' ? 'text-rose-400' : 'text-slate-300'
                    }`}>
                      <span className="text-slate-600 select-none text-[10px] pt-0.5">[{log.timestamp}]</span>
                      <span className="break-all whitespace-pre-wrap">{log.message}</span>
                    </div>
                  ))
                )}
                <div ref={terminalEndRef} />
              </div>
            </div>

            {/* Compiled Central DB Visual and Row Viewer */}
            <AnimatePresence>
              {syncComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          {centralDBName}
                          <span className="px-2 py-0.5 text-[9px] font-bold bg-emerald-950 text-emerald-400 rounded-full">ACTIVE DB</span>
                        </h4>
                        <p className="text-[10px] text-slate-500 font-mono">Synthesized relational database target</p>
                      </div>
                    </div>
                    
                    <span className="text-xs font-mono text-slate-400 inline-flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      {getSelectedTables().length} tables loaded
                    </span>
                  </div>

                  {/* Active Tables in CentralDB Selector */}
                  <div className="flex flex-wrap gap-2">
                    {getSelectedTables().map(table => (
                      <button
                        key={table.id}
                        onClick={() => setSelectedTablePreview(table.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                          selectedTablePreview === table.id
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-transparent'
                        }`}
                      >
                        {table.name}
                      </button>
                    ))}
                  </div>

                  {/* Table Schema mapping details & query viewer */}
                  {selectedTablePreview ? (
                    <div className="space-y-4 bg-slate-950/60 rounded-xl p-4 border border-slate-800/80">
                      {/* Column Types mapping list */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Schema Schema definitions</span>
                        <div className="flex flex-wrap gap-1.5">
                          {getTableColumns(selectedTablePreview).map((col, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-400">
                              <span className="text-cyan-400">{col.name}</span>: <span className="text-emerald-500">{col.type}</span>
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Mock rows output */}
                      <div>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-2">Query Preview: SELECT * FROM {getTableName(selectedTablePreview)} LIMIT 10;</span>
                        <div className="overflow-x-auto border border-slate-900 rounded-lg">
                          <table className="w-full text-left font-mono text-[11px] border-collapse">
                            <thead>
                              <tr className="bg-slate-900/60 border-b border-slate-900 text-slate-400">
                                {getTableColumns(selectedTablePreview).map(col => (
                                  <th key={col.name} className="px-3 py-2 text-xs font-semibold">{col.name}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {getMockRows(selectedTablePreview).map((row: any, i) => (
                                <tr key={i} className="border-b border-slate-900/20 hover:bg-slate-900/30 text-slate-300">
                                  {getTableColumns(selectedTablePreview).map(col => (
                                    <td key={col.name} className="px-3 py-2.5 whitespace-nowrap">{String(row[col.name])}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-slate-500 text-xs font-mono py-8 text-center text-slate-600">
                      Select a table to preview database records.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
