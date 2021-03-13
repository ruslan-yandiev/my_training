/*
Given two arrays a and b write a function comp(a, b) (orcompSame(a, b)) that checks whether the two arrays have the "same" elements, with the same multiplicities. "Same" means, here, that the elements in b are the elements in a squared, regardless of the order.

Examples
Valid arrays
a = [121, 144, 19, 161, 19, 144, 19, 11]  
b = [121, 14641, 20736, 361, 25921, 361, 20736, 361]
comp(a, b) returns true because in b 121 is the square of 11, 14641 is the square of 121, 20736 the square of 144, 361 the square of 19, 25921 the square of 161, and so on. It gets obvious if we write b's elements in terms of squares:

a = [121, 144, 19, 161, 19, 144, 19, 11] 
b = [11*11, 121*121, 144*144, 19*19, 161*161, 19*19, 144*144, 19*19]
Invalid arrays
If, for example, we change the first number to something else, comp may not return true anymore:

a = [121, 144, 19, 161, 19, 144, 19, 11]  
b = [132, 14641, 20736, 361, 25921, 361, 20736, 361]
comp(a,b) returns false because in b 132 is not the square of any number of a.

a = [121, 144, 19, 161, 19, 144, 19, 11]  
b = [121, 14641, 20736, 36100, 25921, 361, 20736, 361]
comp(a,b) returns false because in b 36100 is not the square of any number of a.

Remarks
a or b might be [] (all languages except R, Shell).
a or b might be nil or null or None or nothing (except in C++, Elixir, Haskell, PureScript, Pascal, R, Rust, Shell).
If a or b are nil (or null or None), the problem doesn't make sense so return false.

Note for C
The two arrays have the same size (> 0) given as parameter in function comp.
*/
function comp(array1, array2) {
    if (!array1 || !array2) return false;
    if (array1.length !== array2.length) return false;

    let detect = array1.length;

    check: for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] * array1[i] === array2[j]) {
                detect -= 1;
                array2.splice(j, 1);
                continue check;
            }
        }
    }

    return detect === 0;
}

console.log(comp([2, 2, 5, 8, 10, 7, 4, 10, 8, 1, 2, 4, 9, 3, 9, 0, 6], [100, 9, 4, 81, 100, 1, 49, 82, 64, 4, 16, 4, 64, 25, 0, 36, 16]));
// ==========================================================
function comp(array1, array2) {
    if (array1 == null || array2 == null) return false;
    array1.sort((a, b) => a - b);
    array2.sort((a, b) => a - b);
    return array1.map((v) => v * v).every((v, i) => v == array2[i]);
}
// =========================================================================
function comp(a, b) {
    return (
        !!a &&
        !!b &&
        a
            .map((x) => x * x)
            .sort()
            .join() == b.sort().join()
    );
}
// =======================================
