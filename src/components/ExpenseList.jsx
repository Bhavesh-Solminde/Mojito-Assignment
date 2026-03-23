import React from 'react';
import { AnimatePresence } from 'framer-motion';
import ExpenseCard from './ExpenseCard';

const ExpenseList = React.memo(function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-50 relative">
        <img 
          src="/coin/ezgif-frame-120.png" 
          alt="Coin" 
          className="w-32 h-32 opacity-15 mb-4 grayscale"
        />
        <p className="font-display italic text-2xl text-text-muted">
          Your ledger is empty. Begin recording.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
      <AnimatePresence>
        {expenses.map((exp) => (
          <ExpenseCard key={exp.id} expense={exp} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
});

export default ExpenseList;
