package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

func main() {
	r, err := rand.Int(rand.Reader, big.NewInt(80))
	fmt.Println(r, err)
}

// ! второй вариант
// import (
// 	"fmt"
// 	"math/rand"
// 	"time"
// )

// func randNumsGenerator(n int) <-chan int {
// 	r := rand.New(rand.NewSource(time.Now().UnixNano()))

// 	out := make(chan int)
// 	go func() {
// 		for i := 0; i < n; i++ {
// 		out <- r.Intn(n)
// 		}
// 		close(out)
// 	}()
// 	return out
// }

// func main() {
// 	for num := range randNumsGenerator(10) {
// 		fmt.Println(num)
// 	}
// }

//! трентий вариант с каналами
// Главная особенность - не выделять память заранее под случайные числа, так как их могут быть миллионы (в этом же и есть весть смысл генератора). Функция RandomGen возвращает канал, в который пишутся случайные сислы и функцию, которая генератор останавливает, освобождая все необходимые ресурсы
// import (
// 	"math/rand"
// 	"sync/atomic"
// 	"time"
// )

// func main() {
// 	rnd, stop := RandomGen()
// 	defer stop() // можно вызвать несколько раз - ничего страшного

// 	for i := 0; i < 3; i++ {
// 		println(<-rnd) // выведет 3 случайных числа
// 	}

// 	stop() // останавливаем генератор

// 	println(<-rnd, <-rnd) // вернёт дважды 0
// }

// func RandomGen() (<-chan int, func()) {
// 	var (
// 		rnd       = rand.New(rand.NewSource(time.Now().UnixNano()))
// 		out, exit = make(chan int), make(chan struct{})
// 		exited    uint32 // atomic usage only
// 	)

// 	go func() {
// 		defer close(out) // уходя гасим за собой свет (закрываем канал)

// 		for {
// 		select {
// 		case <-exit: // закрытие канала exit вызовет этот case
// 			return

// 		case out <- rnd.Int(): // пока канал exit не закрыт - отправляем
// 			// do nothing
// 		}
// 		}
// 	}()

// 	return out, func() { // вызов функции закроет канал exit
// 		if atomic.CompareAndSwapUint32(&exited, 0, 1) { // защита от повторного вызова
// 		close(exit)
// 		}
// 	}
// }
