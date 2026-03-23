import { useState, useEffect } from 'react';

const API_URL = 'https://v6.exchangerate-api.com/v6/1f27fe3f38c9476650054a63/latest/USD';

export function useCurrencyRates() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchRates() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (active) {
          setRates(data.conversion_rates);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          console.error("Failed to fetch rates:", err);
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchRates();

    return () => {
      active = false;
    };
  }, []);

  return { rates, loading, error };
}
