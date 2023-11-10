export function shuffle(arr: any[]) {
  const arrClone = [...arr];
  for (
    let currentIndex = arrClone.length - 1;
    currentIndex > 0;
    currentIndex--
  ) {
    const swapIndex = Math.floor(Math.random() * (currentIndex + 1));
    [arrClone[currentIndex], arrClone[swapIndex]] = [
      arrClone[swapIndex],
      arrClone[currentIndex],
    ];
  }
  return arrClone;
}
