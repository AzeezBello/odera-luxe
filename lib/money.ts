export function formatMoney(amount: number, currency = 'NGN') {
  try {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: currency || 'NGN', maximumFractionDigits: 0 }).format(amount);
  } catch {
    return `${currency || 'NGN'} ${amount.toLocaleString()}`;
  }
}

export function totalsByCurrency(items: { price: number; currency: string }[]) {
  return items.reduce<Record<string, number>>((acc, item) => {
    const currency = item.currency || 'NGN';
    acc[currency] = (acc[currency] || 0) + Number(item.price || 0);
    return acc;
  }, {});
}
