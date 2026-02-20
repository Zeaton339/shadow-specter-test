import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { questions, answerOptions } from '@/data/questions';

const TestPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  // currentQuestion is defined above
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const currentQuestion = questions[currentIndex];

  const handleAnswer = useCallback((value: number) => {
    if (!currentQuestion) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
    
    if (currentIndex < questions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      }, 250);
    }
  }, [currentIndex, currentQuestion]);

  const handleSubmit = () => {
    if (Object.keys(answers).length === questions.length) {
      sessionStorage.setItem('darkSpectrum_answers', JSON.stringify(answers));
      navigate('/loading');
    }
  };

  const canGoBack = currentIndex > 0;
  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="min-h-screen bg-gradient-dark flex flex-col">
      {/* Progress */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-0.5 bg-muted">
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(330, 85%, 55%), hsl(190, 95%, 50%))',
              boxShadow: '0 0 10px hsl(330, 85%, 55%, 0.5)',
            }}
          />
        </div>
        <div className="flex justify-between items-center px-4 py-3">
          <button
            onClick={() => canGoBack && setCurrentIndex(prev => prev - 1)}
            className={`text-sm ${canGoBack ? 'text-muted-foreground hover:text-foreground' : 'text-transparent pointer-events-none'} transition-colors`}
          >
            ← 上一题
          </button>
          <span className="text-xs text-muted-foreground font-display">
            {currentIndex + 1} / {questions.length}
          </span>
          <div className="w-14" />
        </div>
      </div>

      {/* Question */}
      {currentQuestion && <div className="flex-1 flex items-center justify-center px-4 pt-20 pb-8">
        <div 
          className={`w-full max-w-lg transition-all duration-250 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
        >
          {/* Question number */}
          <div className="text-center mb-8">
            <span className="text-5xl font-display font-bold text-primary/20">
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Question text */}
          <p className="text-lg sm:text-xl text-center text-foreground leading-relaxed mb-12 font-medium">
            {currentQuestion.text}
          </p>

          {/* Answer options */}
          <div className="space-y-3">
            {answerOptions.map((option) => {
              const isSelected = answers[currentQuestion.id] === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className={`w-full py-3.5 px-5 rounded-lg text-sm font-medium transition-all duration-200 border ${
                    isSelected
                      ? 'bg-primary/20 border-primary/50 text-primary'
                      : 'bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50 hover:border-border hover:text-foreground'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Submit button when all answered and on last question */}
          {allAnswered && currentIndex === questions.length - 1 && (
            <button
              onClick={handleSubmit}
              className="w-full mt-8 py-4 rounded-lg font-semibold text-primary-foreground transition-all hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, hsl(330, 85%, 55%), hsl(280, 70%, 50%))',
              }}
            >
              🔮 查看我的暗黑人格
            </button>
          )}
        </div>
      </div>}
    </div>
  );
};

export default TestPage;
