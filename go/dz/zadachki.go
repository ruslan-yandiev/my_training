package main

import (
	"fmt"
)

// вернуть массив повторяющихся чисел во всех трех подмассивах
func myFunc(arr ...[]int) []int {
	result := []int{}
	detect := map[int]int{}

	for i := 0; i < len(arr); i++ {
		for j := 0; j < len(arr[i]); j++ {
			value, ok := detect[arr[i][j]]

			if ok && value+1 == 6 {
				result = append(result, arr[i][j])
			} else if ok {
				detect[arr[i][j]] += 1
			} else {
				detect[arr[i][j]] = 1
			}
		}
	}

	return result
}

func main() {
	fmt.Println(myFunc([]int{0, 1, 2, 3, 1, 0}, []int{1, 4, 5, 1, 6, 0, 0}, []int{1, 4, 0, 5, 1, 0, 6}))
}
