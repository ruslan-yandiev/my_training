package main

import (
	"fmt"
)

func mergeSort(arr []int) []int {
	if len(arr) > 1 {
		mid := len(arr) / 2
		left := mergeSort(arr[0:mid])
		right := mergeSort(arr[mid:])

		var result []int

		l, r := 0, 0

		for l < len(left) && r < len(right) {
			if left[l] <= right[r] {
				result = append(result, left[l])
				l++
			} else {
				result = append(result, right[r])
				r++
			}
		}

		for l < len(left) {
			result = append(result, left[l])
			l++
		}

		for r < len(right) {
			result = append(result, right[r])
			r++
		}

		return result
	}

	return arr
}

func main() {
	fmt.Println(mergeSort([]int{-22, 14, 1, -33, 2, 11, 2, 14, -4, 5, 2, 0})) // [-33 -22 -4 0 1 2 2 2 5 11 14 14]
}
