import { useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { dimensions, DimensionKey } from '@/data/questions';

interface DarkRadarChartProps {
  scores: Record<DimensionKey, number>;
  size?: number;
}

const DarkRadarChart = ({ scores, size = 300 }: DarkRadarChartProps) => {
  const data = dimensions.map(d => ({
    subject: d.label,
    value: scores[d.key] || 0,
    fullMark: 100,
  }));

  return (
    <div style={{ width: size, height: size }} className="mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
          <PolarGrid 
            stroke="hsla(240, 10%, 30%, 0.5)" 
            strokeDasharray="3 3"
          />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'hsla(0, 0%, 70%, 0.8)', fontSize: 11, fontFamily: 'Noto Sans SC' }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]} 
            tick={false}
            axisLine={false}
          />
          <Radar
            name="暗黑指数"
            dataKey="value"
            stroke="hsl(330, 85%, 55%)"
            fill="hsl(330, 85%, 55%)"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DarkRadarChart;
