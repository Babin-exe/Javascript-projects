
function f(x) {
    return x * x - 4;
}


function bisection(a, b, tol = 1e-6, maxIter = 100) {
    if (f(a) * f(b) >= 0) {
        console.log("Bisection method failed : f(a) and f(b) must have opposite signs.");
        return null;
    }

    let mid;
    for (let i = 0; i < maxIter; i++) {
        mid = (a + b) / 2;
        const fMid = f(mid);

        // Check if mid is a root or within tolerance
        if (Math.abs(fMid) < tol) {
            console.log(`Root found: x = ${mid}, after ${i + 1} iterations`);
            return mid;
        }

        if (f(a) * fMid < 0) {
            b = mid;
        } else {
            a = mid;
        }
    }

    console.log(`Root after max iterations: x = ${mid}`);
    return mid;
}


const root = bisection(0, 3);
console.log("Approximate root:", root);
