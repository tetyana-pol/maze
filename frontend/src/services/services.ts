export const nextNumber = (arr: number[]) => {
  return arr.length > 0 ? Math.max(...arr) + 1 : 1;
};
