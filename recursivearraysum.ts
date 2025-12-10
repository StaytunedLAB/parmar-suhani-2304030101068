function recursiveSum(numbers: number[]): number {
  if (numbers.length === 0) {
    return 0;
  }
  const [head, ...tail] = numbers; 
  return head + recursiveSum(tail);
}
const data = [10, 20, 30, 40];
console.log(recursiveSum(data)); 