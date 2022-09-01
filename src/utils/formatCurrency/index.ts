const dollarUSLocale = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatCurrency = (cost: number): string => dollarUSLocale.format(cost);
