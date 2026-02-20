import { useNavigate } from 'react-router-dom';
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-gradient-dark flex flex-col items-center justify-center px-4 overflow-hidden">
      <ParticleBackground />

      {/* Decorative rings */}
      <div className="absolute w-[500px] h-[500px] border border-primary/10 rounded-full animate-rotate-slow" />
      <div className="absolute w-[700px] h-[700px] border border-accent/5 rounded-full animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      {/* Content */}
      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-glass mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
          <span className="text-xs text-muted-foreground tracking-wider uppercase font-display">
            Dark Personality Spectrum
          </span>
        </div>

        {/* Title */}
        <h1 
          className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <span className="text-foreground">3分钟，看见你</span>
          <br />
          <span className="text-gradient-primary glow-text">隐藏的反派人格</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-muted-foreground text-base sm:text-lg mb-10 max-w-md mx-auto animate-fade-in leading-relaxed"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          每个人内心都潜藏着一个暗影。<br />
          这套精密的人格扫描系统，将揭示你不愿面对的另一面。
        </p>

        {/* CTA */}
        <div className="animate-fade-in" style={{ animationDelay: '0.6s', opacity: 0 }}>
          <button
            onClick={() => navigate('/test')}
            className="group relative px-10 py-4 rounded-lg font-semibold text-primary-foreground overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, hsl(330, 85%, 55%), hsl(280, 70%, 50%))',
            }}
          >
            {/* Glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(330, 90%, 60%), hsl(280, 75%, 55%))',
                boxShadow: '0 0 30px hsl(330, 85%, 55%, 0.4), 0 0 60px hsl(330, 85%, 55%, 0.2)',
              }}
            />
            <span className="relative z-10 text-lg">⚡ 立即开始测试</span>
          </button>
        </div>

        {/* Stats */}
        <div 
          className="flex items-center justify-center gap-6 mt-10 text-xs text-muted-foreground animate-fade-in"
          style={{ animationDelay: '0.8s', opacity: 0 }}
        >
          <span>🧠 28道精选题目</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>⏱ 仅需3分钟</span>
          <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
          <span>🔬 7维深度分析</span>
        </div>
      </div>

      {/* Bottom scan line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
};

export default Index;
