import { useEffect, useState } from 'react';

interface GaugeChartProps {
  value: number; // 0-100
  label?: string;
}

const GaugeChart = ({ value, label = '暗黑指数' }: GaugeChartProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const radius = 80;
  const strokeWidth = 8;
  const center = 100;
  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;
  const valueAngle = startAngle + (animatedValue / 100) * totalAngle;

  const polarToCartesian = (angle: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad),
    };
  };

  const describeArc = (startA: number, endA: number) => {
    const start = polarToCartesian(endA);
    const end = polarToCartesian(startA);
    const largeArcFlag = endA - startA <= 180 ? '0' : '1';
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
  };

  const getColor = () => {
    if (value >= 80) return 'hsl(330, 85%, 55%)';
    if (value >= 60) return 'hsl(300, 70%, 50%)';
    if (value >= 40) return 'hsl(280, 60%, 50%)';
    return 'hsl(190, 95%, 50%)';
  };

  return (
    <div className="flex flex-col items-center">
      <svg width="200" height="160" viewBox="0 0 200 160">
        {/* Background arc */}
        <path
          d={describeArc(startAngle, endAngle)}
          fill="none"
          stroke="hsla(240, 10%, 20%, 0.5)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={describeArc(startAngle, valueAngle)}
          fill="none"
          stroke={getColor()}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          style={{
            transition: 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)',
            filter: `drop-shadow(0 0 6px ${getColor()})`,
          }}
        />
        {/* Center text */}
        <text
          x={center}
          y={center - 5}
          textAnchor="middle"
          className="font-display"
          style={{ fill: getColor(), fontSize: '28px', fontWeight: 700 }}
        >
          {animatedValue}
        </text>
        <text
          x={center}
          y={center + 18}
          textAnchor="middle"
          style={{ fill: 'hsla(0, 0%, 60%, 0.8)', fontSize: '11px' }}
        >
          {label}
        </text>
      </svg>
    </div>
  );
};

export default GaugeChart;
