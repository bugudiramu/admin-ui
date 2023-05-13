export const getCurrencyFormat = (currency: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(currency);
};
