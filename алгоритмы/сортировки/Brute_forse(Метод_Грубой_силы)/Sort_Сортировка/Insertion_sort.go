package main

import (
	"fmt"
)

func quickSort(arr []int) []int {
	for i := 1; i < len(arr); i++ {
		for j := i; j > 0 && arr[j-1] > arr[j]; j-- {
			arr[j], arr[j-1] = arr[j-1], arr[j]
		}
	}

	return arr
}

func main() {
	fmt.Println(quickSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5}))
}
