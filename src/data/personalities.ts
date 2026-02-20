import { DimensionKey } from './questions';

export interface Personality {
  name: string;
  title: string;
  description: string;
  detailedDescription: string;
  character: string;
  characterFrom: string;
  minScore: number;
}

export const personalities: Personality[] = [
  {
    name: '暗影主宰',
    title: 'Shadow Sovereign',
    description: '你是黑暗中的王者，以绝对理性驾驭一切混沌',
    detailedDescription: '你拥有超凡的控制力和战略思维。在你的世界里，每一步都经过精密计算，每一个微笑都带有目的。你不是恶意的，但你对权力的渴望和对弱点的敏锐洞察，让你成为最危险的对手。',
    character: '汉尼拔·莱克特',
    characterFrom: '《沉默的羔羊》',
    minScore: 85,
  },
  {
    name: '混沌编织者',
    title: 'Chaos Weaver',
    description: '你是规则的破坏者，在混乱中找到自己的秩序',
    detailedDescription: '你天生反叛，对既定规则有着本能的抵触。你的创造力和破坏力并存，能在混乱中发现别人看不到的机会。你的存在本身就是对秩序的挑战。',
    character: '小丑',
    characterFrom: '《蝙蝠侠：黑暗骑士》',
    minScore: 70,
  },
  {
    name: '暗夜策士',
    title: 'Night Strategist',
    description: '你是暗处的棋手，所有人都是你棋盘上的棋子',
    detailedDescription: '冷静、精准、深谋远虑。你总是在背后操控局面，用最小的动作获得最大的收益。你不需要站在聚光灯下，因为真正的权力属于幕后之人。',
    character: '小指头',
    characterFrom: '《权力的游戏》',
    minScore: 55,
  },
  {
    name: '魅影操控者',
    title: 'Phantom Puppeteer',
    description: '你是社交舞台上的大师，用魅力编织看不见的线',
    detailedDescription: '你的表演天赋和社交智慧让你在人群中如鱼得水。你知道如何让别人喜欢你、信任你，然后在不知不觉中引导他们走向你设定的方向。',
    character: '艾米·邓恩',
    characterFrom: '《消失的爱人》',
    minScore: 40,
  },
  {
    name: '灰色旁观者',
    title: 'Grey Observer',
    description: '你在光明与黑暗的边界游走，保持着微妙的平衡',
    detailedDescription: '你并非真正的黑暗，但你对人性的阴暗面有着深刻的理解。你选择做一个观察者，用冷静的目光审视这个世界，在必要时展现你隐藏的锋芒。',
    character: '夏洛克·福尔摩斯',
    characterFrom: '《神探夏洛克》',
    minScore: 0,
  },
];

export function calculateScores(answers: Record<number, number>): Record<DimensionKey, number> {
  const dimensionScores: Record<string, number[]> = {};
  
  Object.entries(answers).forEach(([id, value]) => {
    const questionId = parseInt(id);
    const questionIndex = questionId - 1;
    const dimensionIndex = Math.floor(questionIndex / 4);
    const dimensionKeys: DimensionKey[] = ['manipulation', 'narcissism', 'coldness', 'strategy', 'dominance', 'theatricality', 'rebellion'];
    const dim = dimensionKeys[dimensionIndex];
    
    if (!dimensionScores[dim]) dimensionScores[dim] = [];
    dimensionScores[dim].push(value);
  });

  const result: Record<string, number> = {};
  Object.entries(dimensionScores).forEach(([dim, scores]) => {
    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
    result[dim] = Math.round((avg / 5) * 100);
  });

  return result as Record<DimensionKey, number>;
}

export function getOverallScore(scores: Record<DimensionKey, number>): number {
  const values = Object.values(scores);
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
}

export function getPersonality(overallScore: number): Personality {
  return personalities.find(p => overallScore >= p.minScore) || personalities[personalities.length - 1];
}

export function getPercentile(overallScore: number): number {
  // Simulated percentile based on score distribution
  if (overallScore >= 90) return 97;
  if (overallScore >= 80) return 91;
  if (overallScore >= 70) return 83;
  if (overallScore >= 60) return 72;
  if (overallScore >= 50) return 58;
  if (overallScore >= 40) return 41;
  if (overallScore >= 30) return 27;
  return 15;
}
