// default export

function add(a, b) {
    return a + b;
}
export default add;

// named export

function subtract(a, b) {
    return a - b;
}
export { subtract };

export const product = (a, b) => a * b;


// export multiple

function divide(a, b) {
    return a / b;
}

function factorial(n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

export { divide, factorial };  //* agregate export