import React, { useCallback, useEffect, useState } from 'react';

import ReactFlow, {
  addEdge,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
} from 'reactflow';

import {
  nodes as initialNodes,
  edges as initialEdges,
} from './intinal-elements';

import 'reactflow/dist/style.css';
import './overview.css';
import { useRequestWithState } from '../../hooks/useRequest';
import { notification } from 'antd';
import { memo } from 'react';
import OutlineSubject from './OutlineSubject';
import DownloadButton from './DownloadButton';
import BasicSubject from './BasicSubject';
import MajorSubject from './MajorSubject';
import OtherSubject from './OtherSubject';
import ProjectSubject from './ProjectSubject';
import ThesisGraduate from './ThesisGraduate';
import ThesisTopic from './ThesisTopic';

const nodeTypes = {
  outlineSubject: OutlineSubject,
  basicSubject: BasicSubject,
  majorSubject: MajorSubject,
  otherSubject: OtherSubject,
  projectSubject: ProjectSubject,
  thesisGraduate: ThesisGraduate,
  thesisTopic: ThesisTopic,
};

const minimapStyle = {
  height: 120,
};

const OverviewFlow = () => {
  const initialNodesArray = initialNodes ?? []; // Use an empty array if initialNodes is null
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodesArray);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  // we are using a bit of a shortcut here to adjust the edge type
  // this could also be done with a custom edge for example
  // const edgesWithUpdatedTypes = edges.map((edge) => {
  //   if (edge.sourceHandle) {
  //     const customNode = nodes.find((node) => node.type === 'custom');

  //     if (customNode) {
  //       const edgeType = customNode.data.selects
  //         ? customNode.data.selects[
  //             edge.sourceHandle as keyof typeof customNode.data.selects
  //           ]
  //         : undefined;
  //       edge.type = edgeType;
  //     } else {
  //       // Handle the case where no 'custom' node is found
  //       console.error("No 'custom' node found");
  //     }
  //   }

  //   return edge;
  // });

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right"
      nodeTypes={nodeTypes}
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#aaa" gap={16} />
      <DownloadButton />
    </ReactFlow>
  );
};

export default memo(OverviewFlow);
