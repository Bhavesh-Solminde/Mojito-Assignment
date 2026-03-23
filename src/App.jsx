import React, { useState, useEffect, Suspense, lazy, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const ScrollyCanvas = lazy(() => import('./components/ScrollyCanvas'));
const ExpenseForm = lazy(() => import('./components/ExpenseForm'));
const ExpenseList = lazy(() => import('./components/ExpenseList'));
const SummaryPanel = lazy(() => import('./components/SummaryPanel'));
const CategoryBreakdown = lazy(() => import('./components/CategoryBreakdown'));
const CurrencyConverter = lazy(() => import('./components/CurrencyConverter'));

const INITIAL_STATE = [
  { id: '1', name: 'Private Jet Charter', amount: 14500.00, category: 'Travel', date: new Date().toISOString() },
  { id: '2', name: 'Michelin Star Dinner', amount: 840.50, category: 'Food', date: new Date().toISOString() }
];

export default function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = useCallback((expense) => {
    setExpenses(prev => [expense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  }, []);

  const totalAmount = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-void text-text-primary selection:bg-gold-muted selection:text-void">
      
      <Suspense fallback={<div className="h-screen bg-void flex items-center justify-center text-gold-muted font-mono tracking-widest">LOADING SCENE...</div>}>
        <ScrollyCanvas />
      </Suspense>

      <div className="relative z-50 bg-void -mt-1 pt-4 md:pt-20 pb-40">
        
        <motion.div 
          className="max-w-[1500px] mx-auto px-4 md:px-8 xl:px-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
        >
          <motion.header 
            variants={itemVariants} 
            className="flex flex-row lg:flex-col justify-between lg:justify-center items-center mb-8 lg:mb-16 sticky top-0 z-40 bg-void/95 backdrop-blur-md py-4 border-b border-border/50 lg:px-0 lg:relative lg:bg-transparent lg:py-0 lg:border-none"
          >
            <div className="flex items-center gap-4 lg:gap-0 lg:flex-col lg:items-center">
              <div className="relative lg:mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-gold-bright flex items-center justify-center animate-[spin_20s_linear_infinite] shadow-[0_0_20px_5px_rgba(212,168,83,0.15)]">
                   <div className="w-8 h-8 lg:w-12 lg:h-12 rounded-full border border-dashed border-gold-muted flex items-center justify-center">
                      <span className="text-gold-bright font-display text-lg lg:text-xl">$</span>
                   </div>
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="font-display text-2xl lg:text-4xl tracking-widest text-text-primary lg:mb-4 lg:text-center mt-1 lg:mt-0 leading-none">THE LEDGER</h2>
                <div className="hidden lg:block h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-gold-muted to-transparent"></div>
              </div>
            </div>
          </motion.header>

          <Suspense fallback={<div className="text-center text-text-muted py-20 font-mono">Loading modules...</div>}>
            <div className="grid grid-cols-1 lg:grid-cols-4 xl:grid-cols-5 gap-6 xl:gap-8 mb-12">
              
              <motion.div variants={itemVariants} className="lg:col-span-1 xl:col-span-2">
                <ExpenseForm onAdd={addExpense} />
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-3 xl:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
                <SummaryPanel total={totalAmount} />
                <CurrencyConverter totalUSD={totalAmount} />
                <div className="md:col-span-2">
                  <CategoryBreakdown expenses={expenses} />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="font-display text-2xl text-text-primary tracking-widest">TRANSACTIONS</h3>
                <div className="flex-grow h-[1px] bg-border"></div>
              </div>
              <ExpenseList expenses={expenses} onDelete={deleteExpense} />
            </motion.div>
          </Suspense>

        </motion.div>
      </div>

    </div>
  );
}
