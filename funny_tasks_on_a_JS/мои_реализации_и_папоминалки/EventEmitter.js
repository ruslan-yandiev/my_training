// ! Event Emitter вариант с навешиванием на одно события сразу несколько обработчиков события
class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(eventName, callback) {
    !this.events[eventName] && (this.events[eventName] = []);
    this.events[eventName].push(callback);
  }

  unsubscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName].filter((eventCallback) => callback !== eventCallback);
  }

  emit(eventName, args) {
    const event = this.events[eventName];
    event && event.forEach((callback) => callback.call(null, args));
  }
}

// * ======================================================================================================================
/*
Транслятор событий
Cоздайте класс EventEmitter для управления событиями. У этого класса должны быть следующие методы:
.on(event, callback) - добавить обработчик события

.off(event, callback) - удалить обработчик события

.once(event, callback) - добавить обработчик события, который сработает единожды

.emit(event, [...arg]) - вызвать все обработчики события event, можно передать аргументы

Расширьте EventEmitter классом BroadcastEventEmitter так, чтобы была возможность вызвать все обработчики всех событий:
emit("*", [...arg]) - вызвать все обработчики событий, можно передать аргументы
Event Emitter можно перевести как “транслятор” событий.

Представьте себе такую ситуацию: происходит какое-то событие, например пользователь кликнул на кнопку, 
на которое должны отреагировать разные участки программы. Чтобы проще организовать такую логику, 
используют шаблон Event Emitter, который можно реализовать разными способами. Основная идея в том, 
чтобы грамотно создать основу для управления событиями и реализовать возможность любым элементам “подписаться” на него 
(и быть в курсе происходящего).
*/

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (this.events[eventName] === undefined) {
      this.events[eventName] = [];
      this.events[eventName].push(callback);
    } else {
      this.events[eventName].push(callback);
    }
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter((el) => el !== callback);
    }
  }

  once(eventName, callback) {
    const oncing = (fn) => {
      const f = (arg) => {
        this.off(eventName, f);
        return fn(arg);
      };

      return f;
    };

    this.on(eventName, oncing(callback));
  }

  emit(eventName, args) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        this.events[eventName][i].call(null, args);
      }
    }
  }
}

class BroadcastEventEmitter extends EventEmitter {
  emit(eventName, ...args) {
    if (eventName !== "*") {
      if (this.events[eventName]) {
        for (let i = 0; i < this.events[eventName].length; i++) {
          this.events[eventName][i].apply(null, args);
        }
      }
    } else {
      for (let key in this.events) {
        for (let i = 0; i < this.events[key].length; i++) {
          this.events[key][i].apply(null, args);
        }
      }
    }
  }
}

let emitter = new EventEmitter();

const multiplyTwo = (num) => num * 2;
const multiplyThree = (num) => num * 3;

const divideTwo = (num) => num / 2;
const divideThree = (num) => num / 3;

// Добавляем для события multiplication два обработчка
emitter.on("multiplication", multiplyTwo);
emitter.on("multiplication", multiplyThree);
emitter.emit("multiplication", 2); // 4  // 6

// Удалим обработчик multiplyThree для события multiplication
emitter.off("multiplication", multiplyThree);

// Еще раз вызываем событие multiplication, теперь срабатывает только один обработчик multiplyTwo
emitter.emit("multiplication", 2);
// -> 4

// Создадим новое событие divideTwo и добавим два обработчика:
// divideTwo - срабатывает всегда, когда вызывается событие division (до тех пор, пока не удалим этот обработчик)
//  divideThree - сработает только ОДИН раз, во время первого ВЫЗОВА события division
emitter.on("division", divideTwo);
emitter.once("division", divideThree);

// Вызываем событие division - срабатывают обработчики divideTwo и divideThree
emitter.emit("division", 6);
// -> 3
// -> 2

// Вызываем еще раз событие division - срабатывает ТОЛЬКО обработчики divideTwo
emitter.emit("division", 6);
// -> 3

// Вызываем еще раз событие division - срабатывает ТОЛЬКО обработчики divideTwo
emitter.emit("division", 6);
//-> 3

let broadcastEmitter = new BroadcastEventEmitter();

broadcastEmitter.on("multiplication", multiplyTwo);
broadcastEmitter.on("multiplication", multiplyThree);
broadcastEmitter.on("division", divideTwo);
broadcastEmitter.on("division", divideThree);

// Вызываем все события (multiplication и division) => все обработчики для всех событий будут вызваны.
// Для события multiplication - вызовутся обработчики multiplyTwo и multiplyThree.
// Для события division - вызовутся обработчики divideTwo и divideThree.
broadcastEmitter.emit("*", 6);
// -> 12
// -> 18
// -> 3
// -> 2

broadcastEmitter.emit("multiplication", 6);
// -> 12
// -> 18
// * ======================================================================================================================
