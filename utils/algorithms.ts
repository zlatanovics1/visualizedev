export function dfs(startNodeId: number, network: any) {
  const visited = new Set();
  const stack = [startNodeId];
  const visitNode = (nodeId: number) => {
    network.selectNodes([nodeId]);
  };

  const dfsVisit = () => {
    if (stack.length > 0) {
      const nodeId = stack.pop();
      if (!visited.has(nodeId) && nodeId) {
        visitNode(nodeId);

        visited.add(nodeId);

        // Get all connected nodes
        const connectedNodes = network.getConnectedNodes(nodeId);

        // Push all unvisited connected nodes to the stack
        for (let i = connectedNodes.length - 1; i >= 0; i--) {
          const neighbor = connectedNodes[i];
          if (!visited.has(neighbor)) {
            stack.push(neighbor);
          }
        }
        setTimeout(() => {
          dfsVisit();
        }, 1000);
      }
    }
  };

  // Start the DFS process
  dfsVisit();
}

export function bfs(startNodeId: number, network: any) {
  const visited = new Set();
  const queue = [startNodeId];
  visited.add(startNodeId);

  const visitNode = (nodeId: number) => {
    network.selectNodes([nodeId]);
  };

  const processQueue = () => {
    if (queue.length === 0) {
      network.unselectAll();
      return;
    }

    const currentNodeId = queue.shift();
    currentNodeId && visitNode(currentNodeId);

    // Get all connected nodes
    const connectedNodes = network.getConnectedNodes(currentNodeId);
    connectedNodes.forEach((nodeId: number) => {
      if (!visited.has(nodeId)) {
        visited.add(nodeId);
        //@ts-ignore
        queue.push(nodeId);
      }
    });

    // Schedule the next step in the BFS to visualize the process
    setTimeout(processQueue, 1000);
  };

  processQueue();
}
