import React, { useState } from 'react';
import { CATEGORIES } from '../utils/categories';

const ExpenseForm = React.memo(function ExpenseForm({ onAdd }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].id);

  const handleSubmit = () => {
    if (!name.trim() || !amount || isNaN(amount)) return;
    onAdd({
      id: crypto.randomUUID(),
      name: name.trim(),
      amount: parseFloat(amount),
      category,
      date: new Date().toISOString()
    });
    setName('');
    setAmount('');
    setCategory(CATEGORIES[0].id);
  };

  return (
    <div className="bg-surface border border-border p-6 rounded relative overflow-hidden group">
      <h3 className="font-display text-2xl text-gold-muted mb-6">New Entry</h3>
      
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Subject"
            className="w-full bg-transparent border-b border-border py-2 text-text-primary focus:outline-none font-mono placeholder-text-muted peer"
          />
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-bright transition-all duration-300 peer-focus:w-full" />
        </div>

        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            step="0.01"
            className="w-full bg-transparent border-b border-border py-2 text-text-primary focus:outline-none font-mono placeholder-text-muted peer"
          />
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-bright transition-all duration-300 peer-focus:w-full" />
        </div>

        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-surface border-b border-border py-2 text-text-primary focus:outline-none font-mono appearance-none peer cursor-pointer"
          >
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id} className="bg-void text-text-primary">{c.name}</option>
            ))}
          </select>
          <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-bright transition-all duration-300 peer-focus:w-full" />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full py-3 mt-4 border border-gold-muted text-gold-bright font-mono tracking-widest hover:bg-gold-glow hover:border-gold-bright transition-all uppercase"
        >
          Record
        </button>
      </div>
    </div>
  );
});

export default ExpenseForm;
