package main

import (
	"fmt"
)

func quickSort(arr []int) []int {
	if len(arr) > 1 {
		mid := len(arr) / 2
		left := []int{}
		right := []int{}

		for i := 0; i < len(arr); i++ {
			if i < mid {
				left = append(left, arr[i])
			} else {
				right = append(right, arr[i])
			}
		}

		quickSort(left)
		quickSort(right)

		l, r, k := 0, 0, 0

		for l < len(left) && r < len(right) {
			if left[l] <= right[r] {
				arr[k] = left[l]
				l++
			} else {
				arr[k] = right[r]
				r++
			}

			k++
		}

		for l < len(left) {
			arr[k] = left[l]
			l++
			k++
		}

		for r < len(right) {
			arr[k] = right[r]
			r++
			k++
		}
	}

	return arr
}

func main() {
	// fmt.Println(quickSort([]int{2, 1}))
	fmt.Println(quickSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5}))
}
