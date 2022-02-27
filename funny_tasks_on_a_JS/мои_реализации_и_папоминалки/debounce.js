function debounce(f, ms) {
    let detect = true;

    return function (str) {
        if (detect) {
            f(str);
            // f.call(this, str); // * если вдруг потребуется сохранить контекст вызова
            detect = false;
            setTimeout(() => detect = true, ms);
        }
    }
}

let debounceFunc = debounce(console.log, 1000);
// выполняется немедленно
debounceFunc('MockInterview 1');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
debounceFunc('MockInterview 2');
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc('MockInterview 500'), 500);
// Выполнится
setTimeout(() => debounceFunc('MockInterview 1200'), 1200);
// ничего не выполнится, так как не прошло еще 1000 ms с последнего выполнения
setTimeout(() => debounceFunc('MockInterview 1500'), 1500);
// выполнится
setTimeout(() => debounceFunc('MockInterview 2210'), 2210);