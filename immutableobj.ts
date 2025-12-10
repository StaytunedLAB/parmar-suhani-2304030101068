type User = {
  id: number;
  name: string;
  address: { street: string; zip: string };
};
function updateStreet(user: User, newStreet: string): User {
  return {
    ...user,
    address: {
      ...user.address, 
      street: newStreet, 
    },
  };
}
const user: User = { id: 1, name: "Bob", address: { street: "123 Old St", zip: "10001" } };
const updatedUser = updateStreet(user, "456 New Blvd");
console.log(user.address.street);         
console.log(updatedUser.address.street);  