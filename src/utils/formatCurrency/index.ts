export const formatCurrency = (cost: number): string => (Math.round(cost * 100) / 100).toFixed(2);
