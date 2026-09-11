export interface Problem {
  code: string; // LC number, or "MCM"
  name: string;
  pattern: string;
  lc: string; // LC slug, or a full URL for non-LC problems
  nc?: string; // NeetCode slug (neetcode.io/problems/<slug>) where a solution exists
}

export interface Week {
  title: string;
  tag: string;
  goal: string;
  probs: Problem[];
}

export function lcUrl(p: Problem): string {
  return p.lc.startsWith('http') ? p.lc : `https://leetcode.com/problems/${p.lc}/`;
}

export function ncUrl(p: Problem): string | null {
  return p.nc ? `https://neetcode.io/problems/${p.nc}` : null;
}

const P = (
  code: string,
  name: string,
  pattern: string,
  lc: string,
  nc?: string
): Problem => ({ code, name, pattern, lc, nc });

export const PLAN: Week[] = [
  {
    title: 'Week 1',
    tag: 'Drill the method',
    goal: 'Write state → recurrence → base case → order → answer as comments before coding. Solve each both ways.',
    probs: [
      P('509', 'Fibonacci Number', '1D · the canonical warm-up', 'fibonacci-number', 'fibonacci-number'),
      P('1137', 'N-th Tribonacci Number', '1D · widen the window to 3', 'n-th-tribonacci-number'),
      P('70', 'Climbing Stairs', '1D · same shape as Fibonacci', 'climbing-stairs', 'climbing-stairs'),
      P('746', 'Min Cost Climbing Stairs', '1D · adds a cost choice', 'min-cost-climbing-stairs', 'min-cost-climbing-stairs'),
      P('198', 'House Robber', '1D · take-or-skip', 'house-robber', 'house-robber'),
      P('213', 'House Robber II', '1D · circular twist (unseen)', 'house-robber-ii', 'house-robber-ii'),
      P('740', 'Delete and Earn', '1D · reduce to House Robber (unseen)', 'delete-and-earn'),
      P('53', 'Maximum Subarray', '1D · running best (unseen)', 'maximum-subarray', 'maximum-subarray'),
      P('918', 'Maximum Sum Circular Subarray', '1D · Kadane + circular case (unseen)', 'maximum-sum-circular-subarray'),
      P('152', 'Maximum Product Subarray', '1D · track min & max (unseen)', 'maximum-product-subarray', 'maximum-product-subarray'),
      P('121', 'Best Time to Buy and Sell Stock', '1D · state = best so far (unseen)', 'best-time-to-buy-and-sell-stock', 'best-time-to-buy-and-sell-stock'),
    ],
  },
  {
    title: 'Week 2',
    tag: 'One pattern at a time',
    goal: "Don't move on until you solve 2 unseen problems in a pattern with no hints. Log every state definition.",
    probs: [
      P('KNAPSACK-01', '0/1 Knapsack (Classic)', '0/1 knapsack · the base pattern everything below is built from', 'https://www.geeksforgeeks.org/dsa/0-1-knapsack-problem-dp-10/'),
      P('ROD-CUTTING', 'Rod Cutting (Classic)', 'unbounded knapsack · cut for max profit', 'https://www.geeksforgeeks.org/dsa/cutting-a-rod-dp-13/'),
      P('343', 'Integer Break', 'unbounded knapsack · rod-cutting shape (unseen)', 'integer-break'),
      P('416', 'Partition Equal Subset Sum', '0/1 knapsack', 'partition-equal-subset-sum', 'partition-equal-subset-sum'),
      P('494', 'Target Sum', '0/1 knapsack', 'target-sum', 'target-sum'),
      P('1049', 'Last Stone Weight II', '0/1 knapsack', 'last-stone-weight-ii', 'last-stone-weight-ii'),
      P('1155', 'Number of Dice Rolls With Target Sum', 'bounded knapsack · counting', 'number-of-dice-rolls-with-target-sum'),
      P('322', 'Coin Change', 'unbounded knapsack', 'coin-change', 'coin-change'),
      P('518', 'Coin Change II', 'unbounded knapsack', 'coin-change-ii', 'coin-change-ii'),
      P('377', 'Combination Sum IV', 'unbounded / counting', 'combination-sum-iv', 'combination-sum-iv'),
      P('279', 'Perfect Squares', 'unbounded knapsack', 'perfect-squares', 'perfect-squares'),
      P('983', 'Minimum Cost For Tickets', '1D · choose coverage window', 'minimum-cost-for-tickets'),
      P('62', 'Unique Paths', 'grid DP', 'unique-paths', 'unique-paths'),
      P('63', 'Unique Paths II', 'grid DP', 'unique-paths-ii', 'unique-paths-ii'),
      P('64', 'Minimum Path Sum', 'grid DP', 'minimum-path-sum', 'minimum-path-sum'),
      P('931', 'Minimum Falling Path Sum', 'grid DP · free start column', 'minimum-falling-path-sum'),
      P('120', 'Triangle', 'grid DP', 'triangle', 'triangle'),
      P('221', 'Maximal Square', 'grid DP', 'maximal-square', 'maximal-square'),
    ],
  },
  {
    title: 'Week 3',
    tag: 'The 2D family',
    goal: 'Where most blocks happen. Be able to explain what each axis of the table means without hesitating.',
    probs: [
      P('1143', 'Longest Common Subsequence', 'subsequence · 2D', 'longest-common-subsequence', 'longest-common-subsequence'),
      P('1035', 'Uncrossed Lines', 'subsequence · LCS in disguise', 'uncrossed-lines'),
      P('718', 'Maximum Length of Repeated Subarray', 'string · 2D contiguous', 'maximum-length-of-repeated-subarray'),
      P('300', 'Longest Increasing Subsequence', 'subsequence · dp ending at i', 'longest-increasing-subsequence', 'longest-increasing-subsequence'),
      P('673', 'Number of LIS', 'subsequence · count + length', 'number-of-longest-increasing-subsequence', 'number-of-longest-increasing-subsequence'),
      P('72', 'Edit Distance', 'string · 2D', 'edit-distance', 'edit-distance'),
      P('583', 'Delete Operation for Two Strings', 'string · 2D', 'delete-operation-for-two-strings', 'delete-operation-for-two-strings'),
      P('712', 'Minimum ASCII Delete Sum for Two Strings', 'string · 2D weighted', 'minimum-ascii-delete-sum-for-two-strings'),
      P('139', 'Word Break', 'string · partition', 'word-break', 'word-break'),
      P('91', 'Decode Ways', 'string · 1D count', 'decode-ways', 'decode-ways'),
      P('5', 'Longest Palindromic Substring', 'string · interval-ish', 'longest-palindromic-substring', 'longest-palindromic-substring'),
      P('647', 'Palindromic Substrings', 'string · count palindromes', 'palindromic-substrings', 'palindromic-substrings'),
      P('516', 'Longest Palindromic Subsequence', 'subsequence · interval', 'longest-palindromic-subsequence', 'longest-palindromic-subsequence'),
      P('1312', 'Minimum Insertion Steps to Make a Palindrome', 'subsequence · interval, LPS\'s twin', 'minimum-insertion-steps-to-make-a-palindrome-string'),
    ],
  },
  {
    title: 'Week 4',
    tag: 'Anti-block training',
    goal: "25-min timer. First 10 min whiteboard only — no code. Log each block: couldn't-define-state / recurrence-wrong / indexing-bugs.",
    probs: [
      P('309', 'Buy/Sell Stock with Cooldown', 'state machine', 'best-time-to-buy-and-sell-stock-with-cooldown', 'best-time-to-buy-and-sell-stock-with-cooldown'),
      P('714', 'Buy/Sell Stock with Transaction Fee', 'state machine · fee on sell', 'best-time-to-buy-and-sell-stock-with-transaction-fee'),
      P('55', 'Jump Game', 'reachability', 'jump-game', 'jump-game'),
      P('45', 'Jump Game II', 'reachability · min hops', 'jump-game-ii', 'jump-game-ii'),
      P('97', 'Interleaving String', '2D grid', 'interleaving-string', 'interleaving-string'),
      P('474', 'Ones and Zeroes', '2D knapsack', 'ones-and-zeroes', 'ones-and-zeroes'),
      P('96', 'Unique Binary Search Trees', 'Catalan / counting', 'unique-binary-search-trees', 'unique-binary-search-trees'),
      P('337', 'House Robber III', 'tree DP (new shape)', 'house-robber-iii', 'house-robber-iii'),
      P('646', 'Maximum Length of Pair Chain', 'sort + LIS-style / greedy', 'maximum-length-of-pair-chain'),
      P('486', 'Predict the Winner', 'game DP (new shape)', 'predict-the-winner'),
      P('877', 'Stone Game', 'game DP', 'stone-game'),
      P('1235', 'Maximum Profit in Job Scheduling', 'weighted interval scheduling · sort + binary search + dp (new shape)', 'maximum-profit-in-job-scheduling', 'maximum-profit-in-job-scheduling'),
    ],
  },
  {
    title: 'Weeks 5–6',
    tag: 'Volume + hard + timed',
    goal: '3–4 random mediums/hards a day, pattern hidden. Guessing the pattern IS the exercise. Redo failures after 3 and 10 days.',
    probs: [
      P('115', 'Distinct Subsequences', 'string · counting', 'distinct-subsequences', 'distinct-subsequences'),
      P('132', 'Palindrome Partitioning II', 'partition DP + palindrome pre-calc', 'palindrome-partitioning-ii'),
      P('312', 'Burst Balloons', 'interval DP', 'burst-balloons', 'burst-balloons'),
      P('1043', 'Partition Array for Max Sum', 'partition DP', 'partition-array-for-maximum-sum', 'partition-array-for-maximum-sum'),
      P('174', 'Dungeon Game', 'grid · reverse fill', 'dungeon-game'),
      P('741', 'Cherry Pickup', 'grid · two paths at once (hard)', 'cherry-pickup'),
      P('329', 'Longest Increasing Path in a Matrix', 'memo on grid/graph', 'longest-increasing-path-in-a-matrix', 'longest-increasing-path-in-a-matrix'),
      P('691', 'Stickers to Spell Word', 'bitmask DP over target', 'stickers-to-spell-word', 'stickers-to-spell-word'),
      P('698', 'Partition to K Equal Sum Subsets', 'bitmask DP', 'partition-to-k-equal-sum-subsets', 'partition-to-k-equal-sum-subsets'),
      P('10', 'Regular Expression Matching', 'string · 2D', 'regular-expression-matching', 'regular-expression-matching'),
      P('44', 'Wildcard Matching', 'string · 2D', 'wildcard-matching'),
      P('887', 'Super Egg Drop', 'egg drop puzzle · dp over (eggs, moves) (new shape)', 'super-egg-drop', 'super-egg-drop'),
      P('MCM', 'Matrix Chain Multiplication', 'interval DP', 'https://www.geeksforgeeks.org/dsa/matrix-chain-multiplication-dp-8/'),
    ],
  },
];

export const allProbs: string[] = PLAN.flatMap((w) => w.probs.map((p) => p.code));
export const TOTAL = allProbs.length;
