import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORIES } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';

const CategoryBreakdown = React.memo(function CategoryBreakdown({ expenses }) {
  const data = useMemo(() => {
    return CATEGORIES.map(category => {
      const total = expenses
        .filter(e => e.category === category.id)
        .reduce((sum, e) => sum + e.amount, 0);
      return { ...category, value: total };
    }).filter(c => c.value > 0);
  }, [expenses]);

  const totalSum = useMemo(() => data.reduce((sum, d) => sum + d.value, 0), [data]);

  if (data.length === 0) {
    return (
      <div className="bg-surface border border-border p-6 rounded flex items-center justify-center h-full text-text-muted font-mono italic">
        Awaiting categorised entries
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border p-6 rounded flex flex-col md:flex-row gap-8 items-center h-full text-sm">
      <div className="w-48 h-48 flex-shrink-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: 'var(--void)', borderColor: 'var(--border)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              itemStyle={{ color: 'var(--gold-bright)' }}
              formatter={(value) => formatCurrency(value)}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <span className="font-mono text-gold-muted text-xs tracking-widest">BREAKDOWN</span>
        </div>
      </div>
      
      <div className="flex-grow w-full font-mono">
        <h3 className="tracking-widest text-gold-muted uppercase mb-4 text-xs">Terminal Output</h3>
        <div className="space-y-3">
          {data.sort((a,b) => b.value - a.value).map(c => {
            const percentage = Math.round((c.value / totalSum) * 100);
            return (
              <div key={c.id} className="flex items-center justify-between text-text-primary text-xs">
                <div className="flex items-center gap-2 flex-grow">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                  <span>{c.name}</span>
                  <div className="flex-grow border-b border-dashed border-border mx-2 mt-2 opacity-30" />
                </div>
                <div className="text-right flex-shrink-0 whitespace-nowrap">
                  <span className="text-text-muted mr-3">{percentage}%</span>
                  <span className="font-semibold">{formatCurrency(c.value)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default CategoryBreakdown;
