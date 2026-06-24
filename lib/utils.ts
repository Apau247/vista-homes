export function cn(...classes: (string | boolean | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: number, status: string): string {
  if (status === "For Rent") {
    return `$${price.toLocaleString()}/mo`;
  }
  return `$${price.toLocaleString()}`;
}

export function getPropertyTypeCount(type: string): string {
  const counts: Record<string, string> = {
    House: "icon-home",
    Apartment: "icon-building",
    Villa: "icon-villa",
    Commercial: "icon-store",
    Condo: "icon-building-2",
  };
  return counts[type] || "icon-home";
}
