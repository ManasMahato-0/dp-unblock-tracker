import type { Problem, Week } from './plan';

// Graph codes are prefixed "g" so they never collide with DP codes in the
// shared entries map (see models/Progress.ts — one map holds both boards).
const G = (
  code: string,
  name: string,
  pattern: string,
  difficulty: 'E' | 'M' | 'H',
  display: string,
  lc: string,
  nc?: string
): Problem => ({ code: `g${code}`, name, pattern, difficulty, display, lc, nc });

// Each phase is sorted easy → hard. A couple of problems per phase are
// off-LeetCode (GFG) where LC's own version is thin, paywalled, or missing.
export const GRAPH_PLAN: Week[] = [
  {
    title: 'Phase 1',
    tag: 'Traversal (BFS/DFS)',
    goal: 'Grid-as-graph and adjacency-list traversal. Know when BFS beats DFS (shortest path in unweighted graphs) and vice versa.',
    probs: [
      G('733', 'Flood Fill', 'traversal · grid DFS/BFS', 'E', 'LC 733', 'flood-fill', 'flood-fill'),
      G('200', 'Number of Islands', 'traversal · connected components', 'M', 'LC 200', 'number-of-islands', 'number-of-islands'),
      G('994', 'Rotting Oranges', 'traversal · multi-source BFS', 'M', 'LC 994', 'rotting-oranges', 'rotting-oranges'),
      G('133', 'Clone Graph', 'traversal · graph copy w/ visited map', 'M', 'LC 133', 'clone-graph', 'clone-graph'),
      G('130', 'Surrounded Regions', 'traversal · flip from the border in', 'M', 'LC 130', 'surrounded-regions', 'surrounded-regions'),
      G('417', 'Pacific Atlantic Water Flow', 'traversal · multi-source, two directions', 'M', 'LC 417', 'pacific-atlantic-water-flow', 'pacific-atlantic-water-flow'),
    ],
  },
  {
    title: 'Phase 2',
    tag: 'Union-Find (Disjoint Set)',
    goal: 'Path compression + union by rank. The moment "are these connected" or "will adding this edge form a cycle" shows up, reach for this.',
    probs: [
      G('547', 'Number of Provinces', 'union-find · count components', 'M', 'LC 547', 'number-of-provinces', 'number-of-provinces'),
      G('684', 'Redundant Connection', 'union-find · first edge that closes a cycle', 'M', 'LC 684', 'redundant-connection', 'redundant-connection'),
      G('1319', 'Number of Operations to Make Network Connected', 'union-find · spare-edge counting', 'M', 'LC 1319', 'number-of-operations-to-make-network-connected', 'number-of-operations-to-make-network-connected'),
      G('validtree', 'Graph Valid Tree (Detect Cycle, Undirected)', 'union-find · n-1 edges + no cycle', 'M', 'GFG', 'https://www.geeksforgeeks.org/dsa/detect-cycle-undirected-graph/'),
      G('685', 'Redundant Connection II', 'union-find · directed, two failure cases', 'H', 'LC 685', 'redundant-connection-ii'),
    ],
  },
  {
    title: 'Phase 3',
    tag: 'Topological Sort',
    goal: 'DAG ordering via Kahn\'s (BFS + in-degree) or DFS post-order. If the problem says "prerequisite" or "must come before," this is it.',
    probs: [
      G('207', 'Course Schedule', 'topo sort · cycle detection in a DAG', 'M', 'LC 207', 'course-schedule', 'course-schedule'),
      G('210', 'Course Schedule II', 'topo sort · return the order', 'M', 'LC 210', 'course-schedule-ii', 'course-schedule-ii'),
      G('802', 'Find Eventual Safe States', 'topo sort · reverse-graph cycle detection', 'M', 'LC 802', 'find-eventual-safe-states', 'find-eventual-safe-states'),
      G('alien', 'Alien Dictionary', 'topo sort · build the DAG from constraints (unseen)', 'H', 'GFG', 'https://www.geeksforgeeks.org/dsa/alien-dictionary/'),
      G('2050', 'Parallel Courses III', 'topo sort + dp on longest path (new shape)', 'H', 'LC 2050', 'parallel-courses-iii'),
    ],
  },
  {
    title: 'Phase 4',
    tag: 'Shortest Path (weighted)',
    goal: 'Dijkstra for non-negative weights, Bellman-Ford when edges can be negative, Floyd-Warshall for all-pairs. Know which one a problem is quietly asking for.',
    probs: [
      G('743', 'Network Delay Time', 'shortest path · Dijkstra, textbook form', 'M', 'LC 743', 'network-delay-time', 'network-delay-time'),
      G('1631', 'Path With Minimum Effort', 'shortest path · Dijkstra on a minimax cost', 'M', 'LC 1631', 'path-with-minimum-effort', 'path-with-minimum-effort'),
      G('1334', 'City With the Smallest Number of Neighbors at a Threshold Distance', 'shortest path · Floyd-Warshall, all-pairs', 'M', 'LC 1334', 'find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance'),
      G('787', 'Cheapest Flights Within K Stops', 'shortest path · Bellman-Ford / bounded relax', 'M', 'LC 787', 'cheapest-flights-within-k-stops', 'cheapest-flights-within-k-stops'),
      G('1976', 'Number of Ways to Arrive at Destination', 'shortest path · Dijkstra + count ways (new shape)', 'M', 'LC 1976', 'number-of-ways-to-arrive-at-destination', 'number-of-ways-to-arrive-at-destination'),
      G('bellmanford', 'Bellman-Ford Algorithm (Classic)', 'shortest path · negative edges, the algorithm itself', 'M', 'GFG', 'https://www.geeksforgeeks.org/dsa/bellman-ford-algorithm-dp-23/'),
    ],
  },
  {
    title: 'Phase 5',
    tag: 'Minimum Spanning Tree',
    goal: "Kruskal (sort edges + union-find) and Prim (grow from a start node with a heap) — same answer, different lens.",
    probs: [
      G('1584', 'Min Cost to Connect All Points', 'MST · Prim or Kruskal on a complete graph', 'M', 'LC 1584', 'min-cost-to-connect-all-points', 'min-cost-to-connect-all-points'),
      G('kruskal', "Kruskal's MST Algorithm (Classic)", 'MST · sort edges + union-find', 'M', 'GFG', 'https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/'),
      G('connectcities', 'Connecting Cities With Minimum Cost', 'MST · Kruskal on a direct edge list (unseen)', 'M', 'GFG', 'https://www.geeksforgeeks.org/dsa/kruskals-minimum-spanning-tree-algorithm-greedy-algo-2/'),
      G('prim', "Prim's MST Algorithm (Classic)", 'MST · grow from a node with a min-heap', 'M', 'GFG', 'https://www.geeksforgeeks.org/dsa/prims-minimum-spanning-tree-mst-greedy-algo-5/'),
    ],
  },
  {
    title: 'Phase 6',
    tag: 'Bipartite, Bridges & SCC',
    goal: 'Two-coloring for bipartite checks; Tarjan\'s low-link idea underlies both bridges/articulation points and strongly connected components.',
    probs: [
      G('785', 'Is Graph Bipartite?', 'bipartite · two-color via BFS/DFS', 'M', 'LC 785', 'is-graph-bipartite', 'is-graph-bipartite'),
      G('886', 'Possible Bipartition', 'bipartite · two-color with constraints (unseen)', 'M', 'LC 886', 'possible-bipartition', 'possible-bipartition'),
      G('1192', 'Critical Connections in a Network', 'bridges · Tarjan low-link, on LeetCode', 'H', 'LC 1192', 'critical-connections-in-a-network', 'critical-connections-in-a-network'),
      G('articulation', 'Articulation Points (Cut Vertices)', 'Tarjan low-link · the classic, not on LC', 'H', 'GFG', 'https://www.geeksforgeeks.org/dsa/articulation-points-or-cut-vertices-in-a-graph/'),
      G('scc', 'Strongly Connected Components (Tarjan/Kosaraju)', 'SCC · same low-link idea, directed graphs', 'H', 'GFG', 'https://www.geeksforgeeks.org/dsa/strongly-connected-components/'),
    ],
  },
  {
    title: 'Phase 7',
    tag: 'Volume + hard mixed bag',
    goal: 'BFS/Dijkstra dressed up as something else. Spot the graph hiding in the problem statement.',
    probs: [
      G('1091', 'Shortest Path in Binary Matrix', 'BFS · 8-directional grid', 'M', 'LC 1091', 'shortest-path-in-binary-matrix', 'shortest-path-in-binary-matrix'),
      G('934', 'Shortest Bridge', 'DFS to mark + BFS to connect (two-phase, unseen)', 'M', 'LC 934', 'shortest-bridge', 'shortest-bridge'),
      G('127', 'Word Ladder', 'BFS · implicit graph over word transforms', 'H', 'LC 127', 'word-ladder', 'word-ladder'),
      G('815', 'Bus Routes', 'BFS · graph over routes, not stops (unseen)', 'H', 'LC 815', 'bus-routes', 'bus-routes'),
      G('1928', 'Minimum Cost to Reach Destination in Time', 'Dijkstra + a time constraint bolted on (hard)', 'H', 'LC 1928', 'minimum-cost-to-reach-destination-in-time'),
      G('329', 'Longest Increasing Path in a Matrix', 'DFS + memo on a grid graph (graph ⋂ DP)', 'H', 'LC 329', 'longest-increasing-path-in-a-matrix', 'longest-increasing-path-in-a-matrix'),
    ],
  },
];

export const allGraphProbs: string[] = GRAPH_PLAN.flatMap((w) => w.probs.map((p) => p.code));
export const GRAPH_TOTAL = allGraphProbs.length;
