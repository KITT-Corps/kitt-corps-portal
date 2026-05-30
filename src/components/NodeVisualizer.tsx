import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Database, GitBranch, Cpu, Activity, Play, Settings, RefreshCw, Layers, ShieldCheck, Wifi } from 'lucide-react';
import { DatabaseType } from '../types';

interface SchemaNode {
  id: string;
  label: string;
  dbType?: DatabaseType;
  type: 'source-db' | 'aggregator' | 'central-db' | 'dashboard';
  x: number;
  y: number;
  status: 'online' | 'syncing' | 'offline';
  host: string;
  metadata: Record<string, string>;
}

const INITIAL_NODES: SchemaNode[] = [
  {
    id: 'db_finances',
    label: 'db_finances',
    dbType: 'MySQL',
    type: 'source-db',
    x: 80,
    y: 70,
    status: 'online',
    host: '10.0.42.12:3306',
    metadata: { Tables: '3 active', Drivers: 'PyMySQL/Connector', Encrypted: 'TLS v1.3' }
  },
  {
    id: 'db_logistics',
    label: 'db_logistics_mongo',
    dbType: 'MongoDB',
    type: 'source-db',
    x: 80,
    y: 220,
    status: 'online',
    host: 'mongodb.net/cargo',
    metadata: { DocumentCollections: '2 active', Protocol: 'Wire protocol v1', Sharded: 'No' }
  },
  {
    id: 'db_id_postgres',
    label: 'db_id_postgres',
    dbType: 'PostgreSQL',
    type: 'source-db',
    x: 80,
    y: 370,
    status: 'online',
    host: 'postgres-pool.local:5432',
    metadata: { Tables: '2 active', PoolLimit: '20, ClientPool', Mode: 'Transactional' }
  },
  {
    id: 'datamate_aggregator',
    label: 'Data-Mate Core API',
    type: 'aggregator',
    x: 380,
    y: 220,
    status: 'online',
    host: 'localhost:8120',
    metadata: { Version: '1.2.0-beta', Processors: 'Native SQL Converter', Language: 'Python 3.10' }
  },
  {
    id: 'central_db',
    label: 'CentralDB (Unified)',
    dbType: 'MySQL',
    type: 'central-db',
    x: 680,
    y: 150,
    status: 'online',
    host: 'central-mysql.local:3306',
    metadata: { AggregatedTables: '4 consolidated', QueryStatus: 'Ready', RetentionPolicy: '90 Days' }
  },
  {
    id: 'datamate_web_dash',
    label: 'DataMateWeb Dashboard',
    type: 'dashboard',
    x: 680,
    y: 300,
    status: 'online',
    host: 'localhost:5000',
    metadata: { UIPlatform: 'Flask / GSAP SVG', ServerState: 'Running', AuthEngine: 'Flask-Login Session' }
  }
];

export default function NodeVisualizer() {
  const [nodes, setNodes] = useState<SchemaNode[]>(INITIAL_NODES);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('datamate_aggregator');
  const [pingMap, setPingMap] = useState<Record<string, number>>({});
  const [pinging, setPinging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<{ nodeId: string; startX: number; startY: number; nodeStartX: number; nodeStartY: number } | null>(null);

  // Drag handlings
  const handleNodeMouseDown = (e: React.MouseEvent, node: SchemaNode) => {
    e.preventDefault();
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    draggingRef.current = {
      nodeId: node.id,
      startX: e.clientX,
      startY: e.clientY,
      nodeStartX: node.x,
      nodeStartY: node.y
    };
    setSelectedNodeId(node.id);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;
    const drag = draggingRef.current;
    
    const deltaX = e.clientX - drag.startX;
    const deltaY = e.clientY - drag.startY;

    setNodes(prev => prev.map(n => {
      if (n.id !== drag.nodeId) return n;
      // Clamp coordinates to stay inside the viewer canvas wrapper (800x450 boundary box)
      const newX = Math.round(Math.max(20, Math.min(740, drag.nodeStartX + deltaX)));
      const newY = Math.round(Math.max(20, Math.min(420, drag.nodeStartY + deltaY)));
      return { ...n, x: newX, y: newY };
    }));
  };

  const handleMouseUpOrLeave = () => {
    draggingRef.current = null;
  };

  // Run ping diagnostics simulator
  const runPingDiagnostics = async () => {
    setPinging(true);
    setPingMap({});
    
    for (const node of nodes) {
      if (node.type === 'aggregator') continue;
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 250));
      setPingMap(prev => ({
        ...prev,
        [node.id]: Math.round(4 + Math.random() * 28)
      }));
    }
    setPinging(false);
  };

  useEffect(() => {
    runPingDiagnostics();
  }, []);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <section id="node-visualizer" className="py-20 bg-slate-900/40 relative border-b border-slate-800">
      <div className="grid-lines absolute inset-0 opacity-15 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Module title header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono tracking-widest text-purple-400 uppercase bg-purple-950/40 border border-purple-500/20 px-3 py-1 rounded-full">
            DataMateWeb Topology Interface
          </span>
          <h2 className="text-3xl font-extrabold text-white mt-4 sm:text-4xl font-sans">
            Active Schema Node Matrix
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-slate-400 font-sans leading-relaxed text-sm">
            Interactive visual grid inspired by DataMateWeb&apos;s node visualization panel. Reposition databases dynamically, review routing logs, and test server latency.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Node Schematics Map Canvas */}
          <div className="lg:col-span-8 space-y-4">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5 select-none">
                <Layers className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                DOCKABLE NET MATRIX (800 &times; 450) &bull; DRAG NODES TO CUSTOMIZE MAP
              </span>
              <button
                onClick={runPingDiagnostics}
                disabled={pinging}
                className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white border border-slate-800 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${pinging ? 'animate-spin' : ''}`} />
                Test Latency (Ping)
              </button>
            </div>

            {/* Interactive SVG Layer + Node Coordinate Container */}
            <div 
              ref={containerRef}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUpOrLeave}
              onMouseLeave={handleMouseUpOrLeave}
              className="relative w-full aspect-[16/9] max-h-[450px] border border-slate-800 bg-slate-950/90 rounded-2xl overflow-hidden grid-lines cursor-default"
            >
              {/* Dynamic Connecting Lines Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Connections from Source databases to the Central Aggregator */}
                {nodes.filter(n => n.type === 'source-db').map(source => {
                  const target = nodes.find(n => n.type === 'aggregator');
                  if (!target) return null;
                  
                  return (
                    <g key={`src-${source.id}`}>
                      {/* Ambient outer glowing connector line */}
                      <path
                        d={`M ${source.x + 10} ${source.y + 10} C ${(source.x + target.x) / 2} ${source.y}, ${(source.x + target.x) / 2} ${target.y}, ${target.x + 10} ${target.y + 10}`}
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.12)"
                        strokeWidth="4"
                      />
                      {/* Dashed core data packets flow pipeline */}
                      <path
                        d={`M ${source.x + 10} ${source.y + 10} C ${(source.x + target.x) / 2} ${source.y}, ${(source.x + target.x) / 2} ${target.y}, ${target.x + 10} ${target.y + 10}`}
                        fill="none"
                        stroke="#06b6d4"
                        strokeWidth="1.5"
                        className="line-flow opacity-60"
                      />
                    </g>
                  );
                })}

                {/* Connection from Aggregator to Central Target Relational database */}
                {(() => {
                  const source = nodes.find(n => n.type === 'aggregator');
                  const target = nodes.find(n => n.id === 'central_db');
                  if (!source || !target) return null;
                  return (
                    <g key="agg-central">
                      <line
                        x1={source.x + 10} y1={source.y + 10}
                        x2={target.x + 10} y2={target.y + 10}
                        stroke="rgba(16, 185, 129, 0.15)"
                        strokeWidth="5"
                      />
                      <line
                        x1={source.x + 10} y1={source.y + 10}
                        x2={target.x + 10} y2={target.y + 10}
                        stroke="#10b881"
                        strokeWidth="2"
                        className="line-flow"
                      />
                    </g>
                  );
                })()}

                {/* Connection from Central Target to Frontend Flask companion */}
                {(() => {
                  const source = nodes.find(n => n.id === 'central_db');
                  const target = nodes.find(n => n.id === 'datamate_web_dash');
                  if (!source || !target) return null;
                  return (
                    <g key="central-dash">
                      <line
                        x1={source.x + 10} y1={source.y + 10}
                        x2={target.x + 10} y2={target.y + 10}
                        stroke="rgba(147, 51, 234, 0.15)"
                        strokeWidth="4"
                      />
                      <line
                        x1={source.x + 10} y1={source.y + 10}
                        x2={target.x + 10} y2={target.y + 10}
                        stroke="#9333ea"
                        strokeWidth="1.5"
                        className="line-flow opacity-70"
                      />
                    </g>
                  );
                })()}
              </svg>

              {/* Render Draggable Nodes */}
              {nodes.map(node => {
                const isSelected = selectedNodeId === node.id;
                const pingVal = pingMap[node.id];
                
                return (
                  <div
                    key={node.id}
                    onMouseDown={(e) => handleNodeMouseDown(e, node)}
                    style={{ left: `${node.x}px`, top: `${node.y}px` }}
                    className={`absolute -translate-x-12 -translate-y-12 w-24 p-2 rounded-xl border text-center transition-shadow select-none group ${
                      isSelected 
                        ? 'border-purple-400 bg-purple-950/30 font-bold shadow-lg glow-purple' 
                        : node.type === 'aggregator'
                        ? 'border-cyan-500/40 bg-cyan-950/20 hover:border-cyan-400 text-slate-100'
                        : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    {/* Database / Module node type icon */}
                    <div className="flex justify-center mb-1">
                      <div className={`p-1.5 rounded-lg ${
                        node.type === 'aggregator' ? 'bg-cyan-500/10 text-cyan-400' :
                        node.type === 'central-db' ? 'bg-emerald-500/10 text-emerald-400' :
                        node.type === 'dashboard' ? 'bg-purple-500/10 text-purple-400' :
                        'bg-slate-800 text-slate-400'
                      }`}>
                        {node.type === 'aggregator' ? <Cpu className="w-4 h-4" /> :
                         node.type === 'dashboard' ? <Activity className="w-4 h-4" /> :
                         <Database className="w-4 h-4" />}
                      </div>
                    </div>

                    {/* Label */}
                    <div className="text-[10px] font-mono tracking-wide truncate">{node.label}</div>

                    {/* Status/Type indicators */}
                    <div className="mt-1 flex items-center justify-center gap-1">
                      {node.dbType && (
                        <span className="text-[8px] font-bold tracking-wider text-slate-500 px-1 bg-slate-900 rounded select-none">
                          {node.dbType}
                        </span>
                      )}
                      
                      {pingVal !== undefined ? (
                        <span className="text-[8px] font-mono text-emerald-400 font-semibold">{pingVal}ms</span>
                      ) : (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Node Diagnostics and Table details */}
          <div className="lg:col-span-4">
            {selectedNode ? (
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-md space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                      selectedNode.type === 'aggregator' ? 'bg-cyan-950 text-cyan-400 border border-cyan-500/20' :
                      selectedNode.type === 'central-db' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/20' :
                      selectedNode.type === 'dashboard' ? 'bg-purple-950 text-purple-400 border border-purple-500/20' :
                      'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}>
                      {selectedNode.type.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                      <Wifi className="w-3 h-3" /> online
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white font-sans">{selectedNode.label}</h3>
                  <code className="text-xs text-slate-500 font-mono mt-1 block">{selectedNode.host}</code>
                </div>

                {/* Latency meter */}
                {pingMap[selectedNode.id] !== undefined && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                      <span>Server Diagnostic Ping</span>
                      <span className="text-emerald-400 font-bold">{pingMap[selectedNode.id]} ms</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          pingMap[selectedNode.id] < 10 ? 'bg-emerald-400' :
                          pingMap[selectedNode.id] < 20 ? 'bg-cyan-400' :
                          'bg-amber-400'
                        }`}
                        style={{ width: `${Math.min(100, (pingMap[selectedNode.id] / 30) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Node Metadata Parameters */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-mono tracking-wider text-slate-400 uppercase border-b border-slate-800 pb-2">Node Parameters</h4>
                  
                  {Object.entries(selectedNode.metadata).map(([key, val]) => (
                    <div key={key} className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-400">{key}</span>
                      <span className="text-slate-200">{val}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-slate-800/80 bg-slate-950/40 p-4 text-xs font-sans text-slate-400 leading-relaxed flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    Pipeline connections are protected via SSL. Changing coordinates writes configurations directly to your `move_svg.py` coordinates map.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/10 text-center text-slate-500 font-mono py-12">
                Click a node inside the map canvas to read telemetry diagnostics.
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
