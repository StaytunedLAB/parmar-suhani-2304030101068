const compose = <A, B, C>(f: (b: B) => C, g: (a: A) => B) => (x: A): C =>
  f(g(x));
const addOne = (x: number): number => x + 1;
const double = (x: number): number => x * 2;
const addOneThenDouble = compose(double, addOne);
console.log(addOneThenDouble(3)); 