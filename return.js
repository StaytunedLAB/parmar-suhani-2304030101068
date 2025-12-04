// c:\Users\suhani parmar\Desktop\returnvalue_node.js
const readline = require('readline');

function checkAge(age, askParentalPermission) {
  if (age >= 18) {
    return Promise.resolve(true);
  } else {
    return askParentalPermission();
  }
}

function askYesNo(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question + ' (y/n): ', (answer) => {
      rl.close();
      const normalized = (answer || '').trim().toLowerCase();
      resolve(normalized === 'y' || normalized === 'yes');
    });
  });
}

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  rl.question('How old are you? ', async (input) => {
    rl.close();
    const age = Number(input);
    if (Number.isNaN(age)) {
      console.log('Please enter a valid number for age.');
      return;
    }
    const granted = await checkAge(age, () => askYesNo('Do you have permission from your parents?'));
    console.log(granted ? 'Access granted' : 'Access denied');
  });
}

main();