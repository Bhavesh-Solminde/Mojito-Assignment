import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatCurrency } from '../utils/formatCurrency';

const SummaryPanel = React.memo(function SummaryPanel({ total }) {
  const formattedTotal = formatCurrency(total);

  return (
    <div className="bg-surface border border-border p-6 rounded flex flex-col justify-center items-center text-center h-full">
      <h3 className="font-mono text-sm tracking-widest text-gold-muted mb-4 uppercase">Grand Total</h3>
      
      <div className="h-24 overflow-hidden relative flex items-center justify-center w-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={total}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute font-display text-5xl md:text-7xl text-gold-bright tracking-wider drop-shadow-md"
          >
            {formattedTotal}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-4 text-text-muted font-mono text-sm max-w-[200px]">
        Total accumulated expenses in your ledger.
      </div>
    </div>
  );
});

export default SummaryPanel;
