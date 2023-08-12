package main

import (
	"fmt"
)

func quickSort(arr []int) []int {
	return quickSortHelper(arr, 0, len(arr)-1)
}

func quickSortHelper(arr []int, left, right int) []int {
	if len(arr) < 2 {
		return arr
	}

	index := partition(arr, left, right)

	if left < index-1 {
		quickSortHelper(arr, left, index-1)
	}

	if index < right {
		quickSortHelper(arr, index, right)
	}

	return arr
}

func partition(arr []int, left, right int) int {
	piv := arr[(left+right)/2]

	for left <= right {
		if arr[left] < piv {
			left++
		}

		if arr[right] > piv {
			right--
		}

		if left <= right {
			swap(arr, left, right)
			left++
			right--
		}
	}

	return left
}

func swap(arr []int, i, j int) {
	item := arr[i]
	arr[i] = arr[j]
	arr[j] = item
}

func main() {
	fmt.Println(quickSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5}))
}
