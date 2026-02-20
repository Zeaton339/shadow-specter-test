import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const stages = [
  '正在扫描神经元网络...',
  '分析潜意识模式...',
  '解码暗影人格层...',
  '计算多维暗黑指数...',
  '生成人格光谱图...',
  '扫描完成',
];

const LoadingPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    // Check if answers exist
    const answers = sessionStorage.getItem('darkSpectrum_answers');
    if (!answers) {
      navigate('/');
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 3 + 1;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => navigate('/result'), 600);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [navigate]);

  useEffect(() => {
    const newIndex = Math.min(Math.floor(progress / (100 / stages.length)), stages.length - 1);
    setStageIndex(newIndex);
  }, [progress]);

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <div className="text-center max-w-sm w-full">
        {/* Scanning animation */}
        <div className="relative w-40 h-40 mx-auto mb-10">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-rotate-slow" />
          {/* Middle ring */}
          <div 
            className="absolute inset-4 rounded-full border border-accent/30"
            style={{ animation: 'rotate-slow 15s linear infinite reverse' }}
          />
          {/* Inner ring */}
          <div className="absolute inset-8 rounded-full border border-primary/40 animate-rotate-slow" style={{ animationDuration: '10s' }} />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse-glow" />
          </div>
          {/* Scan line */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden"
          >
            <div 
              className="absolute left-1/2 top-1/2 w-px h-1/2 origin-bottom"
              style={{
                background: 'linear-gradient(to top, hsl(330, 85%, 55%), transparent)',
                animation: 'rotate-slow 2s linear infinite',
                transformOrigin: 'bottom center',
              }}
            />
          </div>
        </div>

        {/* Progress number */}
        <div className="mb-4">
          <span className="text-4xl font-display font-bold text-gradient-primary">
            {Math.round(progress)}%
          </span>
        </div>

        {/* Stage text */}
        <p className="text-sm text-muted-foreground mb-8 h-5 transition-all duration-300">
          {stages[stageIndex]}
        </p>

        {/* Progress bar */}
        <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-100"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(330, 85%, 55%), hsl(280, 70%, 50%), hsl(190, 95%, 50%))',
              boxShadow: '0 0 10px hsl(330, 85%, 55%, 0.5)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
