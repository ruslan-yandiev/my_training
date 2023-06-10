package main

import (
	"fmt"
)

func main() {
	arr := make([]int, 5, 5)
	arr2 := Append(arr, 99, 88, 77)

	fmt.Println(arr, arr2)
}

// Append добавляет элементы к срезу.
// Эффективная версия.
func Append(slice []int, elements ...int) []int {
	n := len(slice)
	total := len(slice) + len(elements)
	if total > cap(slice) {
		// Перераспределяем.
		// Выращиваем в 1,5 раза новый размер,
		// чтобы мы могли расти.
		newSize := total*3/2 + 1
		newSlice := make([]int, total, newSize)
		copy(newSlice, slice)
		slice = newSlice
	}
	slice = slice[:total]
	copy(slice[n:], elements)
	return slice
}
