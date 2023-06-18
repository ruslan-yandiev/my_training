package main

import (
	"fmt"
)

func main() {
	arr := []int{1, 3, 4, 3, 2, 5, 6, 2, 7, 8}

	fmt.Println(myFunc(arr)) // [3, 2]
}

// ======================================================================================================

// ? Вернуть массив чисел повторяющиеся два раза
// ! временная сложность O(n), по памяти O(n) - так как если все числа имеют дубликаты то и хэш таблица будет заполняться линейно
func myFunc(arr []int) []int {
	detect := map[int]int{}
	result := make([]int, 0)

	for i := 0; i < len(arr); i++ {
		_, value := detect[arr[i]]

		if value == false {
			detect[arr[i]] = 1
			continue
		}

		result = append(result, arr[i])
	}

	return result
}

// ================================================================================================

// ? Вернуть массив чисел повторяющиеся три раза
// ! временная сложность O(n), по памяти O(n) - так как если все числа имеют дубликаты то и хэш таблица будет заполняться линейно
func myFunc2(arr []int) []int {
	detect := map[int]int{}

	result := make([]int, 0)

	for i := 0; i < len(arr); i++ {
		_, value := detect[arr[i]]

		if value == false {
			detect[arr[i]] = 1
			continue
		} else {
			detect[arr[i]] += 1
		}

		if detect[arr[i]] == 3 {
			result = append(result, arr[i])
		}
	}

	fmt.Println(detect)

	return result
}
