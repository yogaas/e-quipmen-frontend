const getPaginationPages = (current: number, total: number) => {
  const delta = 2;
  const pages: (number | "...")[] = [];

  const start = Math.max(2, current - delta);
  const end = Math.min(total - 1, current + delta);

  pages.push(1);
  if (start > 2) pages.push("...");

  for (let i = start; i <= end; i++) pages.push(i);

  if (end < total - 1) pages.push("...");
  if (total > 1) pages.push(total);

  return pages;
};

/** Format date for display (e.g. in tables) */
export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString();
}

export function formatNumberID(value: number | string): string {
  const number = typeof value === "string" ? Number(value) : value;

  if (isNaN(number)) return "0";

  return number.toLocaleString("id-ID");
}

export default getPaginationPages;
