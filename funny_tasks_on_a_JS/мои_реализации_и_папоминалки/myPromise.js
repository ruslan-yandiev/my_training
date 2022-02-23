// ! Промисы это обертка над асинхронностью.


// ! Асинхронность с помощью колбеков
// console.log('Request data...');

// setTimeout(() => {
//     console.log('Preparing data...');

//     const backendData = {
//         server: 'aws',
//         port: 2000
//     }

//     setTimeout(() => {
//         backendData.modified = true;
//         console.log('Data received', backendData);
//     }, 2000);
// }, 2000); 

// * ==========================
// ! Асихронность с помощью Промисов
const promise = new Promise(function(resolve, reject) {
    setTimeout(() => {
        console.log('Request data...');

        const backendData = {
            server: 'aws',
            port: 2000
        }

        resolve(backendData);
    }, 2000);
})

promise.then((data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            data.modified = true;
            resolve(data);
            // reject(data) .. для отлова ошибок вместо resolve вызвать reject
        }, 2000)
    })
}).catch((err) => {
    console.log('Error: ', err); // можем отловить ошибку в наших цепочках вызова и прервать цепь, вставляя доп цепочку с условием для вылавливания
}).then((clientData) => {
    console.log('Data resoved', clientData);
    clientData.fromPromise = true;
    return clientData;
}).then((data) => {
    console.log('Data: ', data);
}).finally(() =>{ // finally будет выводиться вне зависимости была ли ошибка в цепочке или не было.
    console.log('Finally');
})


function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    })
}

sleep(2000).then(() => console.log('After 2 sec'));
sleep(3000).then(() => console.log('After 3 sec'));

Promise.resolve(1234).then((num) => console.log(num));
Promise.all([sleep(2000), sleep(5000)]).then(() => {
    console.log('All promises');
}) // будет ждать пока выполнятся фсе промисы переданные в массиве.

Promise.race([sleep(2000), sleep(5000)]).then(() => {
    console.log('Race promises');
}) // Отработает как тоько выполнится самый первый и быстрый из промисов, остальных ждать не будет


// * ============================================================================================================================
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