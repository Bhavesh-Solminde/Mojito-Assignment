import React, { useState, useMemo } from 'react';
import { useCurrencyRates } from '../hooks/useCurrencyRates';
import { formatCurrency } from '../utils/formatCurrency';
import { RefreshCw, AlertCircle } from 'lucide-react';

const CURRENCIES = ['EUR', 'GBP', 'INR', 'AED', 'JPY'];

const CurrencyConverter = React.memo(function CurrencyConverter({ totalUSD }) {
  const { rates, loading, error } = useCurrencyRates();
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');

  const handleCurrencyChange = (e) => setSelectedCurrency(e.target.value);

  const convertedAmount = useMemo(() => {
    return rates && rates[selectedCurrency] ? totalUSD * rates[selectedCurrency] : 0;
  }, [rates, totalUSD, selectedCurrency]);

  return (
    <div className="bg-surface border border-border p-6 rounded flex flex-col justify-between h-full">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-mono text-sm tracking-widest text-gold-muted uppercase">Live Exchange</h3>
        <select
          value={selectedCurrency}
          onChange={handleCurrencyChange}
          className="bg-void border border-border text-text-primary px-3 py-1 font-mono text-sm focus:outline-none focus:border-gold-bright cursor-pointer"
        >
          {CURRENCIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex-grow flex flex-col justify-center">
        {loading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-8 bg-border rounded w-3/4"></div>
            <div className="h-4 bg-border rounded w-1/2"></div>
          </div>
        ) : error || !rates ? (
          <div className="text-danger flex flex-col justify-center gap-1 font-mono text-sm py-2">
            <div className="flex items-center gap-2"><AlertCircle size={16} /> Data Unavailable</div>
            <span className="text-border text-xs opacity-70">Verify API key or network</span>
          </div>
        ) : (
          <div>
            <div className="font-display text-4xl text-text-primary mb-2">
              {formatCurrency(convertedAmount, selectedCurrency)}
            </div>
            <div className="font-mono text-xs text-text-muted">
              1 USD = {rates[selectedCurrency]} {selectedCurrency}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export default CurrencyConverter;
