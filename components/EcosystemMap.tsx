'use client';

import { useCallback, useState, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
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
import type { MapNodeData, MapNodeType, ViewMode } from '@/types/railEcosystem';
import NodeDetailsPanel from '@/components/NodeDetailsPanel';

// ── Node visual config ────────────────────────────────────────────────────────

const NODE_STYLE: Record<string, {
  bg: string; border: string; text: string; icon: string; ring: string;
  fw: string; fs: string; minW: number;
}> = {
  root:    { bg: '#1d4ed8', border: '#1e3a8a', text: '#fff',    icon: '⬡', ring: '#93c5fd', fw: '700', fs: '14px', minW: 200 },
  contour: { bg: '#eef2ff', border: '#6366f1', text: '#1e1b4b', icon: '◈', ring: '#6366f1', fw: '700', fs: '12px', minW: 200 },
  core:    { bg: '#f5f3ff', border: '#8b5cf6', text: '#2e1065', icon: '✦', ring: '#7c3aed', fw: '700', fs: '12px', minW: 190 },
  org:     { bg: '#f8fafc', border: '#94a3b8', text: '#1e293b', icon: '▪', ring: '#64748b', fw: '500', fs: '12px', minW: 180 },
  module:  { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a', icon: '◉', ring: '#3b82f6', fw: '600', fs: '12px', minW: 175 },
  process: { bg: '#fffbeb', border: '#f59e0b', text: '#78350f', icon: '⚙', ring: '#f59e0b', fw: '500', fs: '11px', minW: 180 },
  problem: { bg: '#fff1f2', border: '#f87171', text: '#7f1d1d', icon: '⚠', ring: '#ef4444', fw: '500', fs: '11px', minW: 190 },
};

function RailNode({ data, selected }: { data: MapNodeData; selected?: boolean }) {
  const s = NODE_STYLE[data.nodeType] ?? NODE_STYLE.org;
  const nodeWidth = (data as Record<string, unknown>).nodeWidth as number | undefined;
  const isRoot = data.nodeType === 'root';
  const isContourOrCore = data.nodeType === 'contour' || data.nodeType === 'core';

  return (
    <div
      style={{
        background: s.bg,
        border: `2px solid ${selected ? s.ring : s.border}`,
        borderRadius: isRoot ? 14 : 10,
        padding: isRoot ? '10px 20px' : '8px 14px',
        minWidth: nodeWidth ?? s.minW,
        maxWidth: nodeWidth ? nodeWidth : 260,
        width: nodeWidth ? nodeWidth : undefined,
        boxShadow: selected
          ? `0 0 0 3px ${s.ring}44, 0 6px 20px rgba(0,0,0,0.18)`
          : '0 2px 6px rgba(0,0,0,0.09), 0 1px 3px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'border-color 0.15s, box-shadow 0.15s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <span style={{ fontSize: isRoot ? 16 : 12, opacity: 0.6, color: s.text, flexShrink: 0 }}>
          {s.icon}
        </span>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: s.fs, fontWeight: s.fw, color: s.text, lineHeight: 1.35, wordBreak: 'break-word' }}>
            {data.label}
          </div>
          {isContourOrCore && data.description && (
            <div style={{ fontSize: '10px', color: s.text, opacity: 0.55, lineHeight: 1.3, marginTop: 3 }}>
              {(data.description as string).slice(0, 58)}…
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ZoneNode({ data }: { data: MapNodeData }) {
  const color = ((data as Record<string, unknown>).color as string) ?? '#64748b';
  const label = data.label;
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: color + '0b',
        border: `2px solid ${color}28`,
        borderRadius: 18,
        pointerEvents: 'none',
        userSelect: 'none',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 9,
        left: 14,
        fontSize: 10,
        fontWeight: 700,
        color,
        opacity: 0.7,
        letterSpacing: '0.07em',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </div>
    </div>
  );
}

const nodeTypes = { railNode: RailNode, zoneNode: ZoneNode };

// ── Edge styling ──────────────────────────────────────────────────────────────

type EdgeCat = 'org' | 'module' | 'core' | 'integration' | 'process' | 'problem';

const EDGE_COLOR: Record<EdgeCat, { stroke: string; width: number; dash?: string }> = {
  org:         { stroke: '#64748b', width: 2.5 },
  module:      { stroke: '#2563eb', width: 3 },
  core:        { stroke: '#7c3aed', width: 3 },
  integration: { stroke: '#7c3aed', width: 2, dash: '6 3' },
  process:     { stroke: '#d97706', width: 2.5 },
  problem:     { stroke: '#ef4444', width: 2, dash: '5 3' },
};

function edgeCat(e: Edge): EdgeCat {
  if (e.style?.stroke === '#ef4444') return 'problem';
  if (e.style?.stroke === '#d97706') return 'process';
  if (e.id.startsWith('e-integration-')) return 'integration';
  if (e.id.startsWith('e-core-')) return 'core';
  if (
    e.id.startsWith('e-shch-') || e.id.startsWith('e-brigady-') ||
    e.id === 'e-nzjs-raildocs' || e.id === 'e-nzjs-railsafety'
  ) return 'module';
  return 'org';
}

// ── Structure mode static layout ──────────────────────────────────────────────

function orgEdge(id: string, source: string, target: string): Edge {
  return {
    id, source, target, type: 'smoothstep',
    style: { stroke: '#64748b', strokeWidth: 2.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 12, height: 12 },
  };
}
function coreEdge(id: string, source: string, target: string): Edge {
  return {
    id, source, target, type: 'smoothstep',
    style: { stroke: '#7c3aed', strokeWidth: 2.5 },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#7c3aed', width: 12, height: 12 },
  };
}

function zd(label: string, color: string): MapNodeData {
  return { label, nodeType: 'org' as MapNodeType, color } as MapNodeData;
}

const STRUCTURE_NODES: Node<MapNodeData>[] = [
  // Zone backgrounds (non-interactive, rendered behind nodes)
  {
    id: 'zone-mag',  type: 'zoneNode', position: { x: 0,   y: 100 },
    data: zd('Контур магистральной сети', '#2563eb'),
    style: { width: 320, height: 520 }, selectable: false, focusable: false, zIndex: -1,
  },
  {
    id: 'zone-core', type: 'zoneNode', position: { x: 345, y: 100 },
    data: zd('Цифровое ядро', '#7c3aed'),
    style: { width: 530, height: 560 }, selectable: false, focusable: false, zIndex: -1,
  },
  {
    id: 'zone-cargo', type: 'zoneNode', position: { x: 900, y: 100 },
    data: zd('Контур грузовых перевозок', '#16a34a'),
    style: { width: 310, height: 440 }, selectable: false, focusable: false, zIndex: -1,
  },

  // Root
  {
    id: 's-root', type: 'railNode', position: { x: 492, y: 8 },
    data: {
      label: 'Rail Ecosystem', nodeType: 'root',
      description: 'Единая цифровая экосистема управления железнодорожной эксплуатацией КТЖ.',
    },
  },

  // Magistral hierarchy
  {
    id: 's-contour-mag', type: 'railNode', position: { x: 60, y: 124 },
    data: { label: 'Контур магистральной сети', nodeType: 'contour', description: 'Служебные поездки, работы, ГТП и документооборот по дистанциям.' },
  },
  {
    id: 's-ktj', type: 'railNode', position: { x: 70, y: 198 },
    data: { label: 'КТЖ', nodeType: 'org', description: 'АО «Казахстан Темір Жолы» — национальный ж/д оператор.' },
  },
  {
    id: 's-dir', type: 'railNode', position: { x: 70, y: 270 },
    data: { label: 'Дирекция магистральной сети', nodeType: 'org', description: 'Управляет эксплуатацией магистральной инфраструктуры.' },
  },
  {
    id: 's-czjs', type: 'railNode', position: { x: 70, y: 342 },
    data: { label: 'ЦЖС', nodeType: 'org', description: 'Центральный уровень управления магистральной сетью.' },
  },
  {
    id: 's-nzjs', type: 'railNode', position: { x: 70, y: 414 },
    data: { label: 'НЖС', nodeType: 'org', description: 'Региональный уровень управления магистральной сетью.' },
  },
  {
    id: 's-pch',  type: 'railNode', position: { x: 15,  y: 505 },
    data: { label: 'ПЧ',  nodeType: 'org' as MapNodeType, description: 'Путевая дистанция.',            nodeWidth: 86 },
  },
  {
    id: 's-shch', type: 'railNode', position: { x: 118, y: 505 },
    data: { label: 'ШЧ',  nodeType: 'org' as MapNodeType, description: 'Дистанция сигнализации и связи.', nodeWidth: 86 },
  },
  {
    id: 's-ech',  type: 'railNode', position: { x: 221, y: 505 },
    data: { label: 'ЭЧ',  nodeType: 'org' as MapNodeType, description: 'Дистанция электроснабжения.',    nodeWidth: 86 },
  },

  // Digital core
  {
    id: 's-core', type: 'railNode', position: { x: 508, y: 124 },
    data: { label: 'Цифровое ядро', nodeType: 'core', description: 'Горизонтальная платформа: данные, ИИ, аналитика, интеграции.' },
  },
  {
    id: 's-raildatahub',   type: 'railNode', position: { x: 360, y: 218 },
    data: { label: 'RailData Hub',         nodeType: 'module', description: 'Центр данных и событий экосистемы.' },
  },
  {
    id: 's-railai',        type: 'railNode', position: { x: 615, y: 218 },
    data: { label: 'RailAI Core',           nodeType: 'module', description: 'ИИ-ядро и нормативная база.' },
  },
  {
    id: 's-railanalytics', type: 'railNode', position: { x: 360, y: 303 },
    data: { label: 'RailAnalytics',         nodeType: 'module', description: 'Аналитика и управленческая отчётность.' },
  },
  {
    id: 's-reporting',     type: 'railNode', position: { x: 615, y: 303 },
    data: { label: 'Reporting Layer',       nodeType: 'module', description: 'Отчёты и выгрузки (Excel, PDF).' },
  },
  {
    id: 's-notifications', type: 'railNode', position: { x: 360, y: 388 },
    data: { label: 'Notification Engine',   nodeType: 'module', description: 'Push и in-app уведомления.' },
  },
  {
    id: 's-usermgmt',      type: 'railNode', position: { x: 615, y: 388 },
    data: { label: 'User & Role Mgmt',      nodeType: 'module', description: 'Пользователи, роли и доступы.' },
  },
  {
    id: 's-integration',   type: 'railNode', position: { x: 487, y: 473 },
    data: { label: 'Integration Layer',     nodeType: 'module', description: 'API-шлюз для корпоративных систем КТЖ.' },
  },

  // Cargo hierarchy
  {
    id: 's-contour-cargo', type: 'railNode', position: { x: 955, y: 124 },
    data: { label: 'Контур грузовых перевозок', nodeType: 'contour', description: 'Управление локомотивными бригадами и грузовыми операциями.' },
  },
  {
    id: 's-ktj-cargo', type: 'railNode', position: { x: 960, y: 198 },
    data: { label: 'КТЖ', nodeType: 'org', description: 'АО «Казахстан Темір Жолы».' },
  },
  {
    id: 's-too-gp', type: 'railNode', position: { x: 960, y: 270 },
    data: { label: 'ТОО «КТЖ – Грузовые перевозки»', nodeType: 'org', description: 'Дочернее предприятие для грузовых перевозок.' },
  },
  {
    id: 's-depo', type: 'railNode', position: { x: 960, y: 342 },
    data: { label: 'Депо / отделения', nodeType: 'org', description: 'Производственные единицы для бригад и локомотивов.' },
  },
  {
    id: 's-brigady', type: 'railNode', position: { x: 960, y: 414 },
    data: { label: 'Локомотивные бригады', nodeType: 'org', description: 'Машинисты и помощники, выполняющие рейсы.' },
  },
];

const STRUCTURE_EDGES: Edge[] = [
  // Root → zones
  orgEdge('se-root-mag',   's-root', 's-contour-mag'),
  orgEdge('se-root-core',  's-root', 's-core'),
  orgEdge('se-root-cargo', 's-root', 's-contour-cargo'),
  // Magistral chain
  orgEdge('se-mag-ktj',    's-contour-mag', 's-ktj'),
  orgEdge('se-ktj-dir',    's-ktj',         's-dir'),
  orgEdge('se-dir-czjs',   's-dir',         's-czjs'),
  orgEdge('se-czjs-nzjs',  's-czjs',        's-nzjs'),
  orgEdge('se-nzjs-pch',   's-nzjs',        's-pch'),
  orgEdge('se-nzjs-shch',  's-nzjs',        's-shch'),
  orgEdge('se-nzjs-ech',   's-nzjs',        's-ech'),
  // Core → modules
  coreEdge('se-core-datahub',   's-core', 's-raildatahub'),
  coreEdge('se-core-ai',        's-core', 's-railai'),
  coreEdge('se-core-analytics', 's-core', 's-railanalytics'),
  coreEdge('se-core-reporting', 's-core', 's-reporting'),
  coreEdge('se-core-notif',     's-core', 's-notifications'),
  coreEdge('se-core-usermgmt',  's-core', 's-usermgmt'),
  coreEdge('se-core-integration','s-core','s-integration'),
  // Cargo chain
  orgEdge('se-cargo-ktj',    's-contour-cargo', 's-ktj-cargo'),
  orgEdge('se-ktj-too',      's-ktj-cargo',     's-too-gp'),
  orgEdge('se-too-depo',     's-too-gp',        's-depo'),
  orgEdge('se-depo-brigady', 's-depo',          's-brigady'),
];

// ── FitView on mode change ────────────────────────────────────────────────────

function FitViewOnModeChange({ viewMode }: { viewMode: ViewMode }) {
  const { fitView } = useReactFlow();
  useEffect(() => {
    const t = setTimeout(() => fitView({ padding: 0.15, duration: 450 }), 80);
    return () => clearTimeout(t);
  }, [viewMode, fitView]);
  return null;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function EcosystemMap() {
  const [nodes, , onNodesChange] = useNodesState(mapNodes);
  const [edges, , onEdgesChange] = useEdgesState(mapEdges);
  const [selectedNode, setSelectedNode] = useState<{ id: string; data: MapNodeData } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('structure');

  const onNodeClick: NodeMouseHandler = useCallback((_evt, node) => {
    if (node.type === 'zoneNode') return;
    const data = node.data as MapNodeData;
    setSelectedNode(prev => prev?.id === node.id ? null : { id: node.id, data });
  }, []);

  const onPaneClick = useCallback(() => setSelectedNode(null), []);

  // ── View mode filtering (for non-structure modes) ──────────────────────────

  const visibleNodeIds = useMemo(() => {
    if (viewMode === 'structure') return new Set<string>();
    if (viewMode === 'modules') {
      return new Set(nodes.filter(n => ['root','contour','core','org','module'].includes(n.data.nodeType as string)).map(n => n.id));
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

  // Styled nodes/edges for non-structure modes
  const styledNodes = useMemo(() => visibleNodes.map(n => {
    const isSelected = n.id === selectedNode?.id;
    const isConnected = connectedNodeIds.has(n.id);
    let opacity = 1;
    if (viewMode === 'modules' && n.data.nodeType === 'org') opacity = 0.35;
    if (selectedNode && !isSelected && !isConnected) {
      opacity = viewMode === 'modules' && n.data.nodeType === 'org' ? 0.08 : 0.2;
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
        strokeWidth: isLit ? ec.width : ec.width * 0.3,
        strokeDasharray: ec.dash,
        opacity: isLit ? 1 : 0.08,
        transition: 'opacity 0.2s, stroke-width 0.2s',
      },
      markerEnd: { type: MarkerType.ArrowClosed, color: ec.stroke, width: 14, height: 14 },
    };
  }), [visibleEdges, selectedNode, highlightedEdgeIds]);

  // Structure mode styled nodes
  const structureConnectedIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    return new Set(
      STRUCTURE_EDGES.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).flatMap(e => [e.source, e.target])
    );
  }, [selectedNode]);

  const structureHighlightedEdgeIds = useMemo(() => {
    if (!selectedNode) return new Set<string>();
    return new Set(STRUCTURE_EDGES.filter(e => e.source === selectedNode.id || e.target === selectedNode.id).map(e => e.id));
  }, [selectedNode]);

  const styledStructureNodes = useMemo(() => STRUCTURE_NODES.map(n => {
    if (n.type === 'zoneNode') return n;
    const isSelected = n.id === selectedNode?.id;
    const isConnected = structureConnectedIds.has(n.id);
    const opacity = selectedNode ? (isSelected || isConnected ? 1 : 0.2) : 1;
    return { ...n, selected: isSelected, style: { ...n.style, opacity, transition: 'opacity 0.2s' } };
  }), [selectedNode, structureConnectedIds]);

  const styledStructureEdges = useMemo(() => STRUCTURE_EDGES.map(e => {
    const isLit = !selectedNode || structureHighlightedEdgeIds.has(e.id);
    const baseWidth = (e.style?.strokeWidth as number) ?? 2.5;
    return {
      ...e,
      style: {
        ...e.style,
        strokeWidth: isLit ? baseWidth : baseWidth * 0.3,
        opacity: isLit ? 1 : 0.08,
        transition: 'opacity 0.2s, stroke-width 0.2s',
      },
    };
  }), [selectedNode, structureHighlightedEdgeIds]);

  const isStructure = viewMode === 'structure';
  const activeNodes = isStructure ? styledStructureNodes : styledNodes;
  const activeEdges = isStructure ? styledStructureEdges : styledEdges;

  const viewModes: { key: ViewMode; label: string }[] = [
    { key: 'structure',  label: 'Структура' },
    { key: 'modules',    label: 'Модули' },
    { key: 'processes',  label: 'Процессы' },
    { key: 'problems',   label: 'Проблемы' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-slate-200 bg-white shrink-0 flex-wrap">
        <div className="flex items-center gap-1.5 flex-wrap">
          {viewModes.map(vm => (
            <button
              key={vm.key}
              onClick={() => { setViewMode(vm.key); setSelectedNode(null); }}
              className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${
                viewMode === vm.key
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {vm.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-slate-400 hidden md:block max-w-sm italic truncate">
          {viewModeDescriptions[viewMode]}
        </span>
      </div>

      <div className="md:hidden px-4 py-1.5 text-xs text-slate-500 bg-slate-50 border-b border-slate-100 italic shrink-0">
        {viewModeDescriptions[viewMode]}
      </div>

      {/* Flow canvas */}
      <div className="flex-1 relative min-h-0">
        <ReactFlow
          nodes={activeNodes}
          edges={activeEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          minZoom={0.2}
          maxZoom={3}
          nodesDraggable={false}
          nodesConnectable={false}
          defaultEdgeOptions={{ type: 'smoothstep' }}
        >
          <FitViewOnModeChange viewMode={viewMode} />
          <Background color="#cbd5e1" gap={28} size={1} />
          <Controls
            style={{ bottom: 16, left: 12 }}
            showInteractive={false}
          />
        </ReactFlow>
        <NodeDetailsPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
}
