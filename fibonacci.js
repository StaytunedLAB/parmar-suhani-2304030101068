function fibonacci(n) {
    let a = 0, b = 1;
console.log(a); 
    if (n > 1) console.log(b); 
    for (let i = 2; i < n; i++) {
        let next = a + b;
        console.log(next);
        a = b;
        b = next;
    }
}
fibonacci(10);
