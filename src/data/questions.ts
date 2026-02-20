export interface Question {
  id: number;
  text: string;
  dimension: string;
}

export const dimensions = [
  { key: 'manipulation', label: '操控力', icon: '🎭' },
  { key: 'narcissism', label: '自恋度', icon: '👑' },
  { key: 'coldness', label: '冷酷度', icon: '🧊' },
  { key: 'strategy', label: '战略思维', icon: '♟️' },
  { key: 'dominance', label: '支配欲', icon: '⚡' },
  { key: 'theatricality', label: '表演性', icon: '🎪' },
  { key: 'rebellion', label: '反叛性', icon: '🔥' },
] as const;

export type DimensionKey = typeof dimensions[number]['key'];

export const questions: Question[] = [
  // 操控力 (Manipulation) - 4 questions
  { id: 1, text: '我善于让别人按照我的意愿行事，而他们甚至不会察觉', dimension: 'manipulation' },
  { id: 2, text: '在谈判中，我总能找到对方的弱点并加以利用', dimension: 'manipulation' },
  { id: 3, text: '我会根据不同的人调整自己的形象来获得优势', dimension: 'manipulation' },
  { id: 4, text: '有时候，隐瞒真相比说出真相更有效率', dimension: 'manipulation' },

  // 自恋度 (Narcissism) - 4 questions
  { id: 5, text: '我认为自己比大多数人更有才华和潜力', dimension: 'narcissism' },
  { id: 6, text: '我享受成为众人关注焦点的感觉', dimension: 'narcissism' },
  { id: 7, text: '别人的赞美让我感到理所应当', dimension: 'narcissism' },
  { id: 8, text: '我相信自己注定要做出不凡的成就', dimension: 'narcissism' },

  // 冷酷度 (Coldness) - 4 questions
  { id: 9, text: '在做重要决定时，情感不应该成为考虑因素', dimension: 'coldness' },
  { id: 10, text: '我能在他人陷入困境时保持绝对冷静', dimension: 'coldness' },
  { id: 11, text: '同情心有时是一种弱点', dimension: 'coldness' },
  { id: 12, text: '为了达成目标，牺牲一些人的感受是可以接受的', dimension: 'coldness' },

  // 战略思维 (Strategy) - 4 questions
  { id: 13, text: '我总是提前几步规划，预判他人的反应', dimension: 'strategy' },
  { id: 14, text: '我善于从复杂局面中找到最优解', dimension: 'strategy' },
  { id: 15, text: '我会仔细观察周围环境，收集可能有用的信息', dimension: 'strategy' },
  { id: 16, text: '在博弈中，我更倾向于长期利益而非短期快感', dimension: 'strategy' },

  // 支配欲 (Dominance) - 4 questions
  { id: 17, text: '我天生就有领导他人的欲望', dimension: 'dominance' },
  { id: 18, text: '在团队中，我不喜欢听从别人的指挥', dimension: 'dominance' },
  { id: 19, text: '权力是一种让人着迷的东西', dimension: 'dominance' },
  { id: 20, text: '我认为世界本质上是强者主导弱者的', dimension: 'dominance' },

  // 表演性 (Theatricality) - 4 questions
  { id: 21, text: '我能够完美地扮演任何角色', dimension: 'theatricality' },
  { id: 22, text: '生活就是一场戏，而我是最好的演员', dimension: 'theatricality' },
  { id: 23, text: '我的公众形象与真实的我有很大不同', dimension: 'theatricality' },
  { id: 24, text: '我善于制造引人注目的场景和时刻', dimension: 'theatricality' },

  // 反叛性 (Rebellion) - 4 questions
  { id: 25, text: '规则是为普通人设定的，我有权创造自己的规则', dimension: 'rebellion' },
  { id: 26, text: '我喜欢挑战权威和社会常规', dimension: 'rebellion' },
  { id: 27, text: '破坏旧秩序是建立新秩序的必要前提', dimension: 'rebellion' },
  { id: 28, text: '我内心深处有一种与世界对抗的冲动', dimension: 'rebellion' },
];

export const answerOptions = [
  { value: 1, label: '非常不同意' },
  { value: 2, label: '不同意' },
  { value: 3, label: '中立' },
  { value: 4, label: '同意' },
  { value: 5, label: '非常同意' },
];
