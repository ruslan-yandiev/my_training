package main

import (
	"fmt"
)

func main() {
	fmt.Printf("%v\n", intersection([]int{23, 3, 1, 2}))
	fmt.Printf("%v\n", intersection([]int{23, 3, 1, 2}, []int{6, 2, 4, 23}))                                                 // [23, 2]
	fmt.Printf("%v\n", intersection([]int{1, 1, 1}, []int{1, 1, 1, 1}))                                                      // [1, 1, 1]
	fmt.Printf("%v\n", intersection([]int{1, 2, 2, 1}, []int{2, 2}))                                                         // [2, 2]
	fmt.Printf("%v\n", intersection([]int{4, 9, 5}, []int{9, 4, 9, 8, 4}))                                                   // [9, 4]
	fmt.Printf("%v\n", intersection([]int{4, 9, 5}, []int{9, 4, 9, 8, 4}, []int{3, 1, 8, 9, 8, 1}))                          // [9]
	fmt.Printf("%v\n", intersection([]int{4, 9, 5}, []int{9, 4, 9, 8, 4}, []int{3, 1, 8, 9, 8, 1}, []int{4, 5, 8, 9, 7, 7})) // [9]
}

func intersection(arrs ...[]int) []int {
	if len(arrs) < 2 {
		return arrs[0]
	}

	result := make([]int, 0)
	detect := make(map[int]int, 0)

	a := arrs[0]
	b := arrs[1]

	for i := range a {
		detect[a[i]]++
	}

	for i := range b {
		if value, ok := detect[b[i]]; ok && value > 0 {
			result = append(result, b[i])
			detect[b[i]]--
			continue
		}

		delete(detect, b[i])
	}

	newArrs := [][]int{result}
	newArrs = append(newArrs, arrs[2:]...)

	return intersection(newArrs...)
}
