export function shuffle(arr: any[]) {
  if (!Array.isArray(arr)) return [];
  const res = Array.from(arr);
  return res.sort(() => 0.5 - Math.random());
}
