export function shuffle(arr: any[]) {
  const res = [...arr];
  return res.sort(() => 0.5 - Math.random());
}
