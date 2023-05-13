export const getCurrencyFormat = (currency: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(currency);
};

export const formatDateTime = (date: string): string => {
  return `${new Date(date)
    .toLocaleDateString()
    .replaceAll("/", "-")
    .split("-")
    .reverse()
    .join("-")} ${new Date().toLocaleTimeString()}`;
};
