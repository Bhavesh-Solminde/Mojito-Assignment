import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { getCategoryConfig } from '../utils/categories';
import { formatCurrency } from '../utils/formatCurrency';

const ExpenseCard = React.memo(function ExpenseCard({ expense, onDelete }) {
  const { icon: Icon, color } = getCategoryConfig(expense.category);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 0.2 } }}
      whileHover={{ y: -4, borderColor: 'var(--gold-bright)', boxShadow: '0 0 15px var(--gold-glow)' }}
      className="bg-surface border border-border p-5 rounded-sm flex flex-col justify-between group transition-colors duration-300"
    >
      <div className="flex justify-between items-start mb-6">
        <div>
          <h4 className="font-mono text-lg text-text-primary mb-2 line-clamp-1">{expense.name}</h4>
          <div 
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono"
            style={{ backgroundColor: `${color}20`, color: color }}
          >
            <Icon size={12} />
            <span>{expense.category}</span>
          </div>
        </div>
        <button 
          onClick={() => onDelete(expense.id)}
          className="text-text-muted hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-1"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      <div className="text-right">
        <span className="font-display text-2xl tracking-wider text-text-primary">
          {formatCurrency(expense.amount)}
        </span>
      </div>
    </motion.div>
  );
});

export default ExpenseCard;
