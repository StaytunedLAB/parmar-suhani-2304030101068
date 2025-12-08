function simpleInterest(principal, rate, time) {
    let SI = (principal * rate * time) / 100;
    return SI;
}
function compoundInterest(principal, rate, time, n = 1) {
    let amount = principal * Math.pow((1 + (rate / (100 * n))), n * time);
    let CI = amount - principal;
    return CI;
}
let P = 1000;  
let R = 5;     
let T = 2;     
console.log("Simple Interest: " + simpleInterest(P, R, T));
console.log("Compound Interest (yearly): " + compoundInterest(P, R, T));
console.log("Compound Interest (quarterly): " + compoundInterest(P, R, T, 4));
