package main

import (
	"fmt"
)

func quickSort(arr []int) []int {
	if len(arr) < 2 {
		return arr
	}

	pivotIndex := len(arr) / 2
	pivot := arr[pivotIndex]
	min, max := make([]int, 0, len(arr)/2), make([]int, 0, len(arr)/2)

	for i := 0; i < len(arr); i++ {
		if i == pivotIndex {
			continue
		}

		if arr[i] < pivot {
			min = append(min, arr[i])
		} else {
			max = append(max, arr[i])
		}
	}

	result := make([]int, 0, len(arr))

	result = append(result, quickSort(min)...)
	result = append(result, pivot)
	result = append(result, quickSort(max)...)

	return result
}

func main() {
	fmt.Println(quickSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
}
