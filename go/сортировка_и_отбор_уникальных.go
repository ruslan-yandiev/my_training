package main

import (
	"fmt"
	"sort"
)

// ! Ищим все уникальные значение с временной линейной сложностью O(n) и сложностью по памяти O(1) - Точно не уверен
func main() {

	userIDs := []int64{55, 13, 55, 88, 1, 1, 1, 2, 2, 3, 88, 88, 99}

	sort.Slice(userIDs, func(i, j int) bool { return userIDs[i] < userIDs[j] }) // сортирует алгоритмом быстрой сортировки

	index := 0

	for i := 1; i < len(userIDs); i++ {
		if userIDs[index] != userIDs[i] {
			index++
			userIDs[index] = userIDs[i]
		}
	}

	fmt.Println(userIDs[:index+1])
}
