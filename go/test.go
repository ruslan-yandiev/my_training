package main

import (
	"fmt"
)

func f(arr []int) []int {
	if len(arr) < 2 {
		return arr
	}

	mid := arr[len(arr)/2]
	min, max := make([]int, 0, len(arr)/2), make([]int, 0, len(arr)/2)

	for _, el := range arr {
		if el < mid {
			min = append(min, el)
		} else if el > mid {
			max = append(max, el)
		}
	}

	result := make([]int, 0, len(arr))
	result = append(result, f(min)...)
	result = append(result, mid)
	result = append(result, f(max)...)

	return result
}

func main() {
	fmt.Println(f([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
}
