/*
Результатом декоратора debounce(f, ms) должна быть обёртка, 
которая передаёт вызов f не более одного раза в ms миллисекунд. 
Другими словами, когда мы вызываем debounce, 
это гарантирует, что все остальные вызовы будут игнорироваться в течение ms.

На практике debounce полезен для функций, которые получают/обновляют данные, 
и мы знаем, что повторный вызов в течение короткого промежутка времени не даст ничего нового. 
Так что лучше не тратить на него ресурсы.
*/
// function debounce(f, ms) {
//   let detect = true;

//   return function (arg) {
//     if (detect) {
//       f(arg);
//       detect = false;
//     }

//     setTimeout(() => (detect = true), ms);
//   };
// }

// let f = debounce(console.log, 1000);

// f(1); // выполняется немедленно
// f(2); // проигнорирован

// setTimeout(() => f(3), 100); // проигнорирован (прошло только 100 мс)
// setTimeout(() => f(4), 1100); // выполняется
// setTimeout(() => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)
// setTimeout(() => f(6), 2300); // выполняется

//* =======================================================================================================================
/*
Даны две строки.
Написать функцию, которая вернёт True, если из первой строки можно получить вторую, совершив не более 1 изменения 
(== удаление / замена символа).
*/

//! собес #24
class MyPromise {
    constructor(executor) {
        this.queue = [];
        this.errorHendler = () => {};
        this.finallyHendler = () => {};

        try {
            executor.call(null, this.onResolve.bind(this), this.onReject.bind(this));
        } catch(e) {
            this.errorHendler(e);
        } finally {
            this.finallyHendler();
        } 
    }

    onResolve(data) {
        this.queue.forEach((callback) => {
            data = callback(data);
        });
        this.finallyHendler();
    }

    onReject(error) {
        this.errorHendler(error);
        this.finallyHendler();
    }

    then(fn) {
        this.queue.push(fn);
        return this;
    }

    catch(fn) {
        this.errorHendler = fn;
        return this;
    }

    finally(fn) {
        this.finallyHendler = fn;
        return this;
    }
}

const promise = new MyPromise(function(resolve, reject) {
    setTimeout(() => resolve(10), 2000);
});
