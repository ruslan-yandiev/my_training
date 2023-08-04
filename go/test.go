package main

import (
	"fmt"
)

func quickSort(arr []int) []int {
	if len(arr) < 2 {
		return arr
	}

	pivIndex := len(arr) / 2
	piv := arr[pivIndex]
	left := make([]int, 0, pivIndex)
	right := make([]int, 0, pivIndex)

	for i := 0; i < len(arr); i++ {
		if i == pivIndex {
			continue
		}

		if arr[i] < piv {
			left = append(left, arr[i])
		} else {
			right = append(right, arr[i])
		}
	}

	result := make([]int, 0, len(arr))
	result = append(result, quickSort(left)...)
	result = append(result, piv)
	result = append(result, quickSort(right)...)
	return result
}

func main() {
	fmt.Println(quickSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5}))
}
