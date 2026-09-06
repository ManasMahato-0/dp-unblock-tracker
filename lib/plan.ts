export type Problem = [code: string, name: string, pattern: string];

export interface Week {
  title: string;
  tag: string;
  goal: string;
  probs: Problem[];
}

export const PLAN: Week[] = [
  {
    title: 'Week 1',
    tag: 'Drill the method',
    goal: 'Write state → recurrence → base case → order → answer as comments before coding. Solve each both ways.',
    probs: [
      ['509', 'Fibonacci Number', '1D · the canonical warm-up'],
      ['70', 'Climbing Stairs', '1D · same shape as Fibonacci'],
      ['746', 'Min Cost Climbing Stairs', '1D · adds a cost choice'],
      ['198', 'House Robber', '1D · take-or-skip'],
      ['213', 'House Robber II', '1D · circular twist (unseen)'],
      ['53', 'Maximum Subarray', '1D · running best (unseen)'],
      ['152', 'Maximum Product Subarray', '1D · track min & max (unseen)'],
      ['121', 'Best Time to Buy and Sell Stock', '1D · state = best so far (unseen)'],
    ],
  },
  {
    title: 'Week 2',
    tag: 'One pattern at a time',
    goal: "Don't move on until you solve 2 unseen problems in a pattern with no hints. Log every state definition.",
    probs: [
      ['416', 'Partition Equal Subset Sum', '0/1 knapsack'],
      ['494', 'Target Sum', '0/1 knapsack'],
      ['1049', 'Last Stone Weight II', '0/1 knapsack'],
      ['322', 'Coin Change', 'unbounded knapsack'],
      ['518', 'Coin Change II', 'unbounded knapsack'],
      ['377', 'Combination Sum IV', 'unbounded / counting'],
      ['279', 'Perfect Squares', 'unbounded knapsack'],
      ['62', 'Unique Paths', 'grid DP'],
      ['63', 'Unique Paths II', 'grid DP'],
      ['64', 'Minimum Path Sum', 'grid DP'],
      ['120', 'Triangle', 'grid DP'],
      ['221', 'Maximal Square', 'grid DP'],
    ],
  },
  {
    title: 'Week 3',
    tag: 'The 2D family',
    goal: 'Where most blocks happen. Be able to explain what each axis of the table means without hesitating.',
    probs: [
      ['1143', 'Longest Common Subsequence', 'subsequence · 2D'],
      ['300', 'Longest Increasing Subsequence', 'subsequence · dp ending at i'],
      ['673', 'Number of LIS', 'subsequence · count + length'],
      ['72', 'Edit Distance', 'string · 2D'],
      ['583', 'Delete Operation for Two Strings', 'string · 2D'],
      ['139', 'Word Break', 'string · partition'],
      ['91', 'Decode Ways', 'string · 1D count'],
      ['5', 'Longest Palindromic Substring', 'string · interval-ish'],
      ['647', 'Palindromic Substrings', 'string · count palindromes'],
      ['516', 'Longest Palindromic Subsequence', 'subsequence · interval'],
    ],
  },
  {
    title: 'Week 4',
    tag: 'Anti-block training',
    goal: '25-min timer. First 10 min whiteboard only — no code. Log each block: couldn\'t-define-state / recurrence-wrong / indexing-bugs.',
    probs: [
      ['309', 'Buy/Sell Stock with Cooldown', 'state machine'],
      ['55', 'Jump Game', 'reachability'],
      ['97', 'Interleaving String', '2D grid'],
      ['474', 'Ones and Zeroes', '2D knapsack'],
      ['96', 'Unique Binary Search Trees', 'Catalan / counting'],
      ['337', 'House Robber III', 'tree DP (new shape)'],
      ['486', 'Predict the Winner', 'game DP (new shape)'],
      ['877', 'Stone Game', 'game DP'],
    ],
  },
  {
    title: 'Weeks 5–6',
    tag: 'Volume + hard + timed',
    goal: '3–4 random mediums/hards a day, pattern hidden. Guessing the pattern IS the exercise. Redo failures after 3 and 10 days.',
    probs: [
      ['115', 'Distinct Subsequences', 'string · counting'],
      ['312', 'Burst Balloons', 'interval DP'],
      ['1043', 'Partition Array for Max Sum', 'partition DP'],
      ['174', 'Dungeon Game', 'grid · reverse fill'],
      ['329', 'Longest Increasing Path in a Matrix', 'memo on grid/graph'],
      ['10', 'Regular Expression Matching', 'string · 2D'],
      ['44', 'Wildcard Matching', 'string · 2D'],
      ['MCM', 'Matrix Chain Multiplication', 'interval DP · (GeeksforGeeks)'],
    ],
  },
];

export const allProbs: string[] = PLAN.flatMap((w) => w.probs.map((p) => p[0]));
export const TOTAL = allProbs.length;
