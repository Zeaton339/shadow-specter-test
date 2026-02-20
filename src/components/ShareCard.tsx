import { useRef, useCallback } from 'react';
import html2canvas from 'html2canvas';
import DarkRadarChart from './DarkRadarChart';
import { DimensionKey } from '@/data/questions';
import { Personality } from '@/data/personalities';

interface ShareCardProps {
  personality: Personality;
  scores: Record<DimensionKey, number>;
  overallScore: number;
  percentile: number;
}

const ShareCard = ({ personality, scores, overallScore, percentile }: ShareCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSave = useCallback(async () => {
    if (!cardRef.current) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0a0a12',
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `暗黑人格光谱-${personality.name}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (e) {
      console.error('Failed to generate image', e);
    }
  }, [personality.name]);

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="w-[360px] mx-auto p-6 rounded-lg"
        style={{
          background: 'linear-gradient(180deg, #0f0f1a 0%, #0a0a12 50%, #12061a 100%)',
          border: '1px solid hsla(330, 85%, 55%, 0.2)',
        }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-2">
            暗黑人格光谱
          </p>
          <h3 className="text-2xl font-bold text-gradient-primary font-display">
            {personality.title}
          </h3>
          <p className="text-lg font-semibold text-foreground mt-1">{personality.name}</p>
        </div>

        {/* Radar */}
        <DarkRadarChart scores={scores} size={240} />

        {/* Score */}
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="text-center">
            <p className="text-2xl font-bold font-display text-primary">{overallScore}</p>
            <p className="text-[10px] text-muted-foreground">暗黑指数</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold font-display text-accent">{percentile}%</p>
            <p className="text-[10px] text-muted-foreground">超越用户</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground">{personality.character}</p>
            <p className="text-[10px] text-muted-foreground">对应角色</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-border text-center">
          <p className="text-[10px] text-muted-foreground tracking-wider">
            扫描你的暗黑人格 · darkspectrum.test
          </p>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="w-full py-3 rounded-lg bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-all font-medium text-sm"
      >
        📷 保存分享卡片
      </button>
    </div>
  );
};

export default ShareCard;
