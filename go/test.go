package main

import (
	"fmt"
)

func mySort(arr []int) []int {

	
	if len(arr) > 1 {
		mid := len(arr) / 2
		left := make([]int, 0)
		right := []int{}

		for i := 0; i < len(arr); i++ {
			if i < mid {
				left = append(left, arr[i])
			} else {
				right = append(right, arr[i])
			}
		}

		mySort(left)
		mySort(right)

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
	fmt.Println(mySort([]int{3, 1, -3, 2, 0, -1, -2}))
}
