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
  type NodeMouseHandler,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { mapNodes, mapEdges, viewModeDescriptions } from '@/data/railEcosystemContent';
import type { MapNodeData, ViewMode } from '@/types/railEcosystem';
import NodeDetailsPanel from '@/components/NodeDetailsPanel';

// ─── Custom Node ───────────────────────────────────────────────────────────────

function RailNode({ data, selected }: { data: MapNodeData; selected?: boolean }) {
  const styleMap: Record<string, string> = {
    root:      'bg-blue-600 text-white border-blue-700 font-bold text-sm px-4 py-2.5',
    contour:   'bg-indigo-50 text-indigo-900 border-indigo-300 font-semibold text-xs px-3 py-2',
    core:      'bg-purple-50 text-purple-900 border-purple-300 font-semibold text-xs px-3 py-2',
    org:       'bg-white text-gray-800 border-gray-300 text-xs px-3 py-1.5',
    module:    'bg-emerald-50 text-emerald-900 border-emerald-300 text-xs px-3 py-1.5',
    submodule: 'bg-gray-50 text-gray-700 border-gray-200 text-xs px-2 py-1',
    process:   'bg-amber-50 text-amber-900 border-amber-300 font-medium text-xs px-3 py-2',
    problem:   'bg-red-50 text-red-800 border-red-200 font-medium text-xs px-3 py-2',
  };
  const base = styleMap[data.nodeType] ?? 'bg-white text-gray-800 border-gray-300 text-xs px-3 py-1.5';
  const ring = selected ? 'ring-2 ring-offset-1 ring-blue-400' : '';

  return (
    <div className={`rounded border cursor-pointer shadow-sm max-w-[160px] text-center ${base} ${ring}`}>
      {data.label}
    </div>
  );
}

const nodeTypes = { railNode: RailNode };

// ─── Fit view on mode change ───────────────────────────────────────────────────

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

  const onNodeClick: NodeMouseHandler<Node<MapNodeData>> = useCallback((_event, node) => {
    setSelectedNode({ id: node.id, data: node.data });
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // ─── Filtering ──────────────────────────────────────────────────────────────

  const visibleNodeIds = useMemo(() => {
    if (viewMode === 'structure') {
      return new Set(
        nodes
          .filter(n => ['root', 'contour', 'core', 'org'].includes(n.data.nodeType))
          .map(n => n.id)
      );
    }
    if (viewMode === 'modules') {
      return new Set(
        nodes
          .filter(n => ['root', 'contour', 'core', 'org', 'module'].includes(n.data.nodeType))
          .map(n => n.id)
      );
    }
    if (viewMode === 'processes') {
      const procIds = new Set(nodes.filter(n => n.data.nodeType === 'process').map(n => n.id));
      const connectedIds = new Set(
        edges
          .filter(e => procIds.has(e.source) || procIds.has(e.target))
          .flatMap(e => [e.source, e.target])
      );
      return new Set([...procIds, ...connectedIds]);
    }
    // problems
    const probIds = new Set(nodes.filter(n => n.data.nodeType === 'problem').map(n => n.id));
    const connectedIds = new Set(
      edges
        .filter(e => probIds.has(e.source) || probIds.has(e.target))
        .flatMap(e => [e.source, e.target])
    );
    return new Set([...probIds, ...connectedIds]);
  }, [nodes, edges, viewMode]);

  const visibleNodes = useMemo(
    () => nodes.filter(n => visibleNodeIds.has(n.id)),
    [nodes, visibleNodeIds]
  );

  const visibleEdges = useMemo(
    () => edges.filter(e => visibleNodeIds.has(e.source) && visibleNodeIds.has(e.target)),
    [edges, visibleNodeIds]
  );

  const styledNodes = useMemo(
    () =>
      visibleNodes.map(n => ({
        ...n,
        selected: n.id === selectedNode?.id,
        style:
          viewMode === 'modules' && n.data.nodeType === 'org'
            ? { opacity: 0.3 }
            : undefined,
      })),
    [visibleNodes, selectedNode, viewMode]
  );

  const viewModes: { key: ViewMode; label: string }[] = [
    { key: 'structure',  label: 'По структуре' },
    { key: 'modules',    label: 'По модулям' },
    { key: 'processes',  label: 'По процессам' },
    { key: 'problems',   label: 'По проблемам' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-gray-200 bg-white shrink-0 flex-wrap gap-y-2">
        <div className="flex items-center gap-1 flex-wrap">
          {viewModes.map((vm) => (
            <button
              key={vm.key}
              onClick={() => setViewMode(vm.key)}
              className={`text-xs px-3 py-1.5 rounded font-medium transition-colors ${
                viewMode === vm.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {vm.label}
            </button>
          ))}
        </div>
        <div className="text-xs text-gray-500 hidden md:block max-w-sm">
          {viewModeDescriptions[viewMode]}
        </div>
      </div>

      {/* Mode hint (mobile) */}
      <div className="md:hidden px-4 py-2 text-xs text-gray-500 bg-gray-50 border-b border-gray-100">
        {viewModeDescriptions[viewMode]}
      </div>

      {/* Flow + panel */}
      <div className="flex-1 relative min-h-0">
        <ReactFlow
          nodes={styledNodes}
          edges={visibleEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.08}
          maxZoom={2}
          defaultEdgeOptions={{ style: { stroke: '#d1d5db', strokeWidth: 1.5 } }}
        >
          <FitViewOnModeChange viewMode={viewMode} />
          <Background color="#e5e7eb" gap={24} />
          <Controls />
          <MiniMap
            nodeColor={(n) => {
              const t = (n.data as MapNodeData)?.nodeType;
              if (t === 'root')    return '#2563eb';
              if (t === 'contour') return '#6366f1';
              if (t === 'core')    return '#7c3aed';
              if (t === 'module')  return '#059669';
              if (t === 'process') return '#f59e0b';
              if (t === 'problem') return '#ef4444';
              return '#9ca3af';
            }}
            className="!bg-gray-50 !border-gray-200"
          />
        </ReactFlow>

        <NodeDetailsPanel node={selectedNode} onClose={() => setSelectedNode(null)} />
      </div>
    </div>
  );
}
