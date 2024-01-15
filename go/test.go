package main

import (
	"fmt"
)

func bableSort(arr []int) []int {
	for i := 1; i < len(arr); i++ {
		for j := i; j > 0 && arr[j] < arr[j-1]; j-- {
			arr[j], arr[j-1] = arr[j-1], arr[j]
		}
	}

	return arr
}

func main() {
	fmt.Println(bableSort([]int{-22, 14, 1, -33, 2, 11, 2, 14, -4, 5, 2, 0}))
}
