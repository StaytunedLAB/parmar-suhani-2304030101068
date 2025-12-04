let user = {
  name: "John",
  age: 30,
 toString() {
    return `{name: "${this.name}", age: ${this.age}}`;
  }
};
console.log(user); // {name: "John", age: 30}