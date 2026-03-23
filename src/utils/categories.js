import { Coffee, Plane, Megaphone, Zap, Box } from 'lucide-react';

export const CATEGORIES = [
  { id: 'Food', name: 'Food', icon: Coffee, color: '#D4A853' },
  { id: 'Travel', name: 'Travel', icon: Plane, color: '#B8922A' },
  { id: 'Marketing', name: 'Marketing', icon: Megaphone, color: '#9A7A22' },
  { id: 'Utilities', name: 'Utilities', icon: Zap, color: '#7D6420' },
  { id: 'Other', name: 'Other', icon: Box, color: '#5a4a18' }
];

export const getCategoryConfig = (categoryId) => {
  return CATEGORIES.find(c => c.id === categoryId) || CATEGORIES[4];
};
