// Модуль из ядра ноды
const EventEmittec = require('events');
const emitter = new EventEmittec();

// прослушаем событие
emitter.on('anything', (data) => {
    console.log('ON: anything', data);
});

// за эмитим событие (cоздадим событие)
emitter.emit('anything', { a: 1 });
emitter.emit('anything', { b: 2 });
setTimeout(() => emitter.emit('anything', { c: 3 }), 500);

// Можем наследоваться от класса EventEmittec, чтобы к примеру писать свой собственный функционал
class Dispatcher extends EventEmittec {
    subscribe(eventName, callback) {
        console.log('[Subscribe...]');
        this.on(eventName, callback);
    }

    dispatch(eventName, data) {
        console.log('[Dispatch...]');
        this.emit(eventName, data);
    }
}

const dis = new Dispatcher();

dis.subscribe('newevent', (data) => {
    console.log('Новое обработаное событие:', data);
});
// ! само событие (точнее эметим его) только после создания его обработчика(прослушку события) выше по коду
dis.dispatch('newevent', { abc: 'My abc' });
