type Person = { firstName: string; lastName: string; age: number };
const people: Person[] = [
  { firstName: "priyanshi", lastName: "parikh", age: 21 },
  { firstName: "divya", lastName: "parmar", age: 19 },
  { firstName: "suhani", lastName: "parmar", age: 18 },
  { firstName: "vaidehi", lastName: "patel", age: 20 },
];
const adultNames = people
  .filter((p) => p.age >= 18) 
  .map((p) => `${p.firstName} ${p.lastName}`) 
  .reduce((acc, name) => (acc === "" ? name : `${acc}, ${name}`), ""); 
console.log(adultNames); 