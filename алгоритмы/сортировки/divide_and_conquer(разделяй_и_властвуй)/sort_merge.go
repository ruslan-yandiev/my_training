package main

import (
	"fmt"
)

// ! мутабельный способ сортировки. Именно переданный массив будет отсортирован, а значит изменен.
func mergeSort(arr []int) []int {
	if len(arr) > 1 {
		mid := len(arr) / 2
		left := make([]int, 0, mid+1)
		right := make([]int, 0, mid+1)

		for i := 0; i < len(arr); i++ {
			if i < mid {
				left = append(left, arr[i])
			} else {
				right = append(right, arr[i])
			}
		}

		mergeSort(left)
		mergeSort(right)

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
	fmt.Println(mergeSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
	fmt.Println(mergeSort([]int{11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15}))
	fmt.Println(mergeSort([]int{5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0}))
	fmt.Println(mergeSort([]int{5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5}))
	fmt.Println(mergeSort([]int{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5}))
	fmt.Println(mergeSort([]int{0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5}))
}

// ===================================================================================
// ! имутабельный способ. переданный массив не будет изменен, вместо ӕтого вернется новый отсортированный массив.
func mergeSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}

	mid := len(arr) / 2
	left := mergeSort(arr[:mid])
	right := mergeSort(arr[mid:])

	return merge(left, right)
}

func merge(left, right []int) []int {
	var result []int
	i, j := 0, 0
	for i < len(left) && j < len(right) {
		if left[i] < right[j] {
			result = append(result, left[i])
			i++
		} else {
			result = append(result, right[j])
			j++
		}
	}

	for ; i < len(left); i++ {
		result = append(result, left[i])
	}
	for ; j < len(right); j++ {
		result = append(result, right[j])
	}

	return result
}

func main() {
	fmt.Println(mergeSort([]int{-22, 14, 1, -33, 2, 11, 2, 14, -4, 5, 2, 0}))
}
