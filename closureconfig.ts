function createMinLengthValidator(minLength: number): (input: string) => boolean {
  return function (input: string): boolean {
    return input.length >= minLength;
  };
}
const checkPasswordLength = createMinLengthValidator(8);
const checkUsernameLength = createMinLengthValidator(4);
console.log("Password OK:", checkPasswordLength("12345678")); 
console.log("Username OK:", checkUsernameLength("Bob")); 