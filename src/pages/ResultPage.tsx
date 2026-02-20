import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DarkRadarChart from '@/components/DarkRadarChart';
import GaugeChart from '@/components/GaugeChart';
import ShareCard from '@/components/ShareCard';
import { dimensions, DimensionKey } from '@/data/questions';
import { calculateScores, getOverallScore, getPersonality, getPercentile } from '@/data/personalities';

const ResultPage = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<Record<DimensionKey, number> | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const raw = sessionStorage.getItem('darkSpectrum_answers');
    if (!raw) {
      navigate('/');
      return;
    }
    const answers = JSON.parse(raw);
    setScores(calculateScores(answers));
    setTimeout(() => setVisible(true), 100);
  }, [navigate]);

  if (!scores) return null;

  const overallScore = getOverallScore(scores);
  const personality = getPersonality(overallScore);
  const percentile = getPercentile(overallScore);

  return (
    <div className="min-h-screen bg-gradient-dark pb-20">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Header */}
        <div className={`text-center mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3 font-display">
            Scan Complete
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gradient-primary font-display mb-1">
            {personality.title}
          </h1>
          <h2 className="text-2xl font-bold text-foreground mb-4">{personality.name}</h2>
          <p className="text-primary font-medium text-lg">"{personality.description}"</p>
        </div>

        {/* Gauge */}
        <div className={`transition-all duration-700 delay-200 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <GaugeChart value={overallScore} />
        </div>

        {/* Percentile */}
        <div className={`text-center mb-8 transition-all duration-700 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p className="text-muted-foreground text-sm">
            你的暗黑指数超过了 <span className="text-accent font-bold font-display text-lg">{percentile}%</span> 的测试者
          </p>
        </div>

        {/* Radar Chart */}
        <div className={`bg-glass rounded-xl p-4 mb-6 transition-all duration-700 delay-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h3 className="text-center text-sm text-muted-foreground mb-2 font-display tracking-wider">
            多维人格光谱
          </h3>
          <DarkRadarChart scores={scores} size={300} />
        </div>

        {/* Dimension scores */}
        <div className={`bg-glass rounded-xl p-5 mb-6 space-y-3 transition-all duration-700 delay-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {dimensions.map(d => (
            <div key={d.key} className="flex items-center gap-3">
              <span className="text-lg w-7">{d.icon}</span>
              <span className="text-sm text-foreground w-16 shrink-0">{d.label}</span>
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? `${scores[d.key]}%` : '0%',
                    background: scores[d.key] >= 70 
                      ? 'linear-gradient(90deg, hsl(330, 85%, 55%), hsl(330, 90%, 65%))' 
                      : scores[d.key] >= 40
                      ? 'linear-gradient(90deg, hsl(280, 60%, 50%), hsl(300, 70%, 55%))'
                      : 'linear-gradient(90deg, hsl(190, 95%, 50%), hsl(210, 90%, 60%))',
                    transitionDelay: '0.8s',
                  }}
                />
              </div>
              <span className="text-xs font-display text-muted-foreground w-8 text-right">
                {scores[d.key]}
              </span>
            </div>
          ))}
        </div>

        {/* Character mapping */}
        <div className={`bg-glass rounded-xl p-5 mb-6 transition-all duration-700 delay-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h3 className="text-sm text-muted-foreground mb-3 font-display tracking-wider">影视人物映射</h3>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
              🎭
            </div>
            <div>
              <p className="text-foreground font-semibold">{personality.character}</p>
              <p className="text-sm text-muted-foreground">{personality.characterFrom}</p>
            </div>
          </div>
        </div>

        {/* Detailed description */}
        <div className={`bg-glass rounded-xl p-5 mb-8 transition-all duration-700 delay-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h3 className="text-sm text-muted-foreground mb-3 font-display tracking-wider">深度解读</h3>
          <p className="text-foreground/80 text-sm leading-relaxed">{personality.detailedDescription}</p>
        </div>

        {/* Actions */}
        <div className={`space-y-3 transition-all duration-700 delay-[800ms] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <button
            onClick={() => setShowShare(!showShare)}
            className="w-full py-3.5 rounded-lg font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, hsl(330, 85%, 55%), hsl(280, 70%, 50%))',
            }}
          >
            📤 生成分享卡片
          </button>

          {showShare && (
            <div className="animate-fade-in">
              <ShareCard
                personality={personality}
                scores={scores}
                overallScore={overallScore}
                percentile={percentile}
              />
            </div>
          )}

          <button
            onClick={() => {
              sessionStorage.removeItem('darkSpectrum_answers');
              navigate('/');
            }}
            className="w-full py-3 rounded-lg text-sm text-muted-foreground border border-border hover:border-primary/30 hover:text-foreground transition-all"
          >
            重新测试
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
