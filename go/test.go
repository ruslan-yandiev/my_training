package main

import (
	"fmt"
)

func mySort(arr []int) []int {
	if len(arr) < 2 {
		return arr
	}

	pivot := arr[len(arr)/2]

	left := []int{}
	right := []int{}

	for i := 0; i < len(arr); i++ {
		if i == len(arr)/2 {
			continue
		} else if arr[i] < pivot {
			left = append(left, arr[i])
		} else {
			right = append(right, arr[i])
		}
	}

	result := []int{}
	result = append(result, mySort(left)...)
	result = append(result, pivot)
	result = append(result, mySort(right)...)

	return result
}

func main() {
	fmt.Println(mySort([]int{3, 1, -3, 2, 0, -1, -2}))
}
