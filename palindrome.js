function isPalindromeString(str) {
    let original = str.toLowerCase();                 
    let reversed = original.split("").reverse().join(""); 
if (original === reversed) {
        console.log(str + " is a Palindrome");
    } else {
        console.log(str + " is NOT a Palindrome");
    }
}
isPalindromeString("madam");
isPalindromeString("hello");
