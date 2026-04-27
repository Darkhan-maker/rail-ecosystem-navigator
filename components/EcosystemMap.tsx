'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  MarkerType,
  type NodeMouseHandler,
  type Node,
  type Edge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { mapNodes, mapEdges, viewModeDescriptions } from '@/data/railEcosystemContent';
import type { MapNodeData, ViewMode } from '@/types/railEcosystem';
import NodeDetailsPanel from '@/components/NodeDetailsPanel';

// ─── Node visual config ────────────────────────────────────────────────────────

const NODE_STYLE: Record<string, {
  bg: string; border: string; text: string; icon: string; ring: string;
  fw: string; fs: string; minW: number;
}> = {
  root:      { bg: '#1d4ed8', border: '#1e3a8a', text: '#ffffff', icon: '⬡', ring: '#93c5fd', fw: '700', fs: '13px', minW: 160 },
  contour:   { bg: '#eef2ff', border: '#818cf8', text: '#1e1b4b', icon: '◈', ring: '#6366f1', fw: '600', fs: '11px', minW: 170 },
  core:      { bg: '#f5f3ff', border: '#a78bfa', text: '#2e1065', icon: '✦', ring: '#7c3aed', fw: '600', fs: '11px', minW: 150 },
  org:       { bg: '#f8fafc', border: '#94a3b8', text: '#1e293b', icon: '▪', ring: '#64748b', fw: '500', fs: '10px', minW: 110 },
  module:    { bg: '#eff6ff', border: '#60a5fa', text: '#1e3a8a', icon: '◉', ring: '#3b82f6', fw: '500', fs: '10px', minW: 120 },
  submodule: { bg: '#f9fafb', border: '#d1d5db', text: '#374151', icon: '▸', ring: '#9ca3af', fw: '400', fs: '9px',  minW: 100 },
  process:   { bg: '#fffbeb', border: '#fbbf24', text: '#78350f', icon: '⚙', ring: '#f59e0b', fw: '500', fs: '10px', minW: 130 },
  problem:   { bg: '#fff1f2', border: '#f87171', text: '#7f1d1d', icon: '⚠', ring: '#ef4444', fw: '500', fs: '10px', minW: 140 },
};

function RailNode({ data, selected }: { data: MapNodeData; selected?: boolean }) {
  const s = NODE_STYLE[data.nodeType] ?? NODE_STYLE.org;
  return (
    <div
      style={{
        background: s.bg,
        border: `2px solid ${selected ? s.ring : s.border}`,
        borderRadius: 8,
        padding: data.nodeType === 'root' ? '8px 16px' : '5px 10px',
        minWidth: s.minW,
        maxWidth: 210,
        boxShadow: selected
          ? `0 0 0 3px ${s.ring}55, 0 4px 16px rgba(0,0,0,0.14)`
          : '0 1px 3px rgba(0,0,0,0.07), 0 1px 2px rgba(0,0,0,0.04)',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 10, opacity: 0.55, color: s.text, flexShrink: 0, lineHeight: 1 }}>
          {s.icon}
        </span>
        <span style={{ fontSize: s.fs, fontWeight: s.fw, color: s.text, lineHeight: 1.35, wordBreak: 'break-word' }}>
          {data.label}
        </span>
      </div>
    </div>
  );
}

const nodeTypes = { railNode: RailNode };

// ─── Edge styling ──────────────────────────────────────────────────────────────

type EdgeCat = 'org' | 'module' | 'core' | 'integration' | 'process' | 'problem';

const EDGE_COLOR: Record<EdgeCat, { stroke: string; width: number; dash?: string }> = {
  org:         { stroke: '#94a3b8', width: 1.5 },
  module:      { stroke: '#3b82f6', width: 2 },
  core:        { stroke: '#7c3aed', width: 2 },
  integration: { stroke: '#7c3aed', width: 1.5, dash: '6 3' },
  process:     { stroke: '#f59e0b', width: 2 },
  problem:     { stroke: '#ef4444', width: 1.5, dash: '5 3' },
};

function edgeCat(e: Edge): EdgeCat {
  if (e.style?.stroke === '#ef4444') return 'problem';
  if (e.style?.stroke === '#d97706') return 'process';
  if (e.id.startsWith('e-integration-')) return 'integration';
  if (e.id.startsWith('e-core-')) return 'core';
  if (
    e.id.startsWith('e-shch-') ||
    e.id.startsWith('e-brigady-') ||
    e.id === 'e-nzjs-raildocs' ||
    e.id === 'e-nzjs-railsafety'
  ) return 'module';
  return 'org';
}

// ─── FitView on mode change ────────────────────────────────────────────────────

function FitViewOnModeChange({ viewMode }: { viewMode: ViewMode }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.12, duration: 400 }), 60);
    return () => clearTimeout(t);
  }, [viewMode, fitView]);
  return null;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function EcosystemMap() {
  const [nodes, , onNodesChange] = useNodesState(mapNodes);
  const [edges, , onEdgesChange] = useEdgesState(mapEdges);
  const [selectedNode, setSelectedNode] = useState<{ id: string; data: MapNodeData } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('structure');

  const onNodeClick: NodeMouseHandler<Node<MapNodeData>> = useCallback((_evt, node) => {
    setSelectedNode(prev => prev?.id === node.id ? null : { id: node.id, data: node.data });
  }, []);

  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  // ─── View mode filtering ─────────────────────────────────────────────────────

  const visibleNodeIds = useMemo(() => {
    if (viewMode === 'structure') {
      return new Set(nodes.filter(n => ['root','contour','core','org'].includes(n.data.nodeType)).map(n => n.id));
    }
    if (viewMode === 'modules') {
      return new Set(nodes.filter(n => ['root','contour','core','org','module'].includes(n.data.nodeType)).map(n => n.id));
    }
    const focusType = viewMode === 'processes' ? 'process' : 'problem';
    const focusIds = new Set(nodes.filter(n => n.data.nodeType === focusType).map(n => n.id));
    const connectedIds = new Set(
      edges.filter(e => focusIds.has(e.source) || focusIds.has(e.target)).flatMap(e => [e.source, e.target])
    );
    return new Set([...focusIds, ...connectedIds]);
  }, [nodes, edges, viewMode]);

  const visibleNodes = useMemo(() => nodes.filter(n => visibleNodeIds.has(n.id)), [nodes, visibleNodeIds]);
  const visibleEdges = useMemo(() => edges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)), [edges, visibleNodeIds]);

  // ─── Selection highlighting ──────────────────────────────────────────────────

  const connectedNodeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    return new Set(
      visibleEdges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).flatMap(e => [e.source, e.target])
    );
  }, [selectedNode, visibleEdges]);

  const highlightedEdgeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    return new Set(visibleEdges.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(e => e.id));
  }, [selectedNode, visibleEdges]);

  // ─── Final styled nodes & edges ──────────────────────────────────────────────

  const styledNodes = useMemo(() => visibleNodes.map(n => {
    const isSelected = n.id === selectedNode?.id;
    const isConnected = connectedNodeIds.has(n.id);
    let opacity = 1;
    if (viewMode === 'modules' && n.data.nodeType === 'org') opacity = 0.3;
    if (selectedNode && !isSelected && !isConnected) {
      opacity = viewMode === 'modules' && n.data.nodeType === 'org' ? 0.06 : 0.15;
    }
    return { ...n, selected: isSelected, style: { opacity, transition: 'opacity 0.2s' } };
  }), [visibleNodes, selectedNode, connectedNodeIds, viewMode]);

  const styledEdges = useMemo(() => visibleEdges.map(e => {
    const cat = edgeCat(e);
    const ec = EDGE_COLOR[cat];
    const isLit = !selectedNode || highlightedEdgeIds.has(e.id);
    return {
      ...e,
      type: 'smoothstep',
      style: {
        stroke: ec.stroke,
        strokeWidth: isLit ? ec.width : ec.width * 0.4,
        strokeDasharray: ec.dash,
        opacity: isLit ? 1 : 0.1,
        transition: 'opacity 0.2s, stroke-width 0.2s',
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: ec.stroke, width: 14, height: 14 },
    };
  }), [visibleEdges, selectedNode, highlightedEdgeIds]);

  const viewModes: { key: ViewMode; label: string }[] = [
    { key: 'structure', label: 'Структура' },
    { key: 'modules',   label: 'Модули' },
    { key: 'processes', label: 'Процессы' },
    { key: 'problems',  label: 'Проблемы' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 bg-white shrink-0 flex-wrap gap-y-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          {viewModes.map(vm => (
            <button
              key={vm.key}
              onClick={() => setViewMode(vm.key)}
              className={`text-xs px-3 py-1.5 rounded-md font-medium transition-colors ${
                viewMode === vm.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {vm.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 hidden md:block max-w-xs truncate italic">
          {viewModeDescriptions[viewMode]}
        </span>
      </div>

      <div className="md:hidden px-4 py-1.5 text-xs text-slate-500 bg-slate-50 border-b border-slate-100 italic">
        {viewModeDescriptions[viewMode]}
      </div>

      {/* Flow canvas */}
      <div className="flex-1 relative min-h-0">
        <ReactFlow
          nodes={styledNodes}
          edges={styledEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.05}
          maxZoom={2.5}
          nodesDraggable={false}
          nodesConnectable={false}
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <FitViewOnModeChange viewMode={viewMode} />
          <Background color="#e2e8f0" gap={28} size={1} />
          <Controls />
          <MiniMap
            nodeColor={n => {
              const t = (n.data as MapNodeData)?.nodeType;
              return NODE_STYLE[t as string]?.border ?? '#9ca3af';
            }}
            className="!bg-slate-50 !border-slate-200"
          />
        </ReactFlow>
        <NodeDetailsPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
}
