package main

import (
	"fmt"
)

// Вариант с использованием дополнительной памяти временная O(n log n) по памяти фиг знает))))
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

// ===================================================================================================
func quickSort(arr []int) []int {
	if len(arr) <= 1 {
		return arr
	}
	pivot := arr[len(arr)/2]
	var less []int
	var equal []int
	var greater []int
	for _, v := range arr {
		switch {
		case v < pivot:
			less = append(less, v)
		case v == pivot:
			equal = append(equal, v)
		case v > pivot:
			greater = append(greater, v)
		}
	}
	less = quickSort(less)
	greater = quickSort(greater)
	return append(append(less, equal...), greater...)
}

// ==================================================================================================
// без затрат по памяти, временная O(n log n) и константная по памяти O(1) где 1 количество операций(шагов, тиков)
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
	pivot := arr[(left+right)/2]

	for left <= right {
		for arr[left] < pivot {
			left++
		}

		for arr[right] > pivot {
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

// =======================================================================

func main() {
	fmt.Println(quickSort([]int{4, 8, 15, 1, 0, 11, 3, 6, 22, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{11, 4, 8, 15, 1, 0, 11, 3, 6, 22, 11, 1, 4, 8, 15}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 0, 1, 2, 3, 4, 5, 5, 4, 3, 2, 1, 0}))
	fmt.Println(quickSort([]int{5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5}))
	fmt.Println(quickSort([]int{0, 1, 2, 3, -6, 14, 4, 5, 0, 1, -33, 2, 3, 4, 5}))
}

// ================================================================================================
func qweekSort(arr []int) []int {
	return qweekHelper(arr, 0, len(arr)-1)
}

func qweekHelper(arr []int, left, right int) []int {
	if len(arr) < 2 {
		return arr
	}

	index := partition(arr, left, right)

	if left < index-1 {
		qweekHelper(arr, left, index-1)
	}

	if index < right {
		qweekHelper(arr, index, right)
	}
	return arr
}

func partition(arr []int, left, right int) int {
	pivot := arr[left]
	for left < right {
		for left < right && arr[right] >= pivot {
			right--
		}
		arr[left] = arr[right]
		for left < right && arr[left] <= pivot {
			left++
		}
		arr[right] = arr[left]
	}
	arr[left] = pivot
	return left + 1
}

func main() {
	fmt.Println(qweekSort([]int{-22, 14, 1, -33, 2, 11, 2, 14, -4, 5, 2, 0}))
}

// ===============================================================================================
func main() {
	arr := []int{7, 2, 1, 6, 8, 5, 3, 4}
	quickSort(arr, 0, len(arr)-1)
	fmt.Println(arr)
}

func quickSort(arr []int, low, high int) {
	if low < high {
		pi := partition(arr, low, high)
		quickSort(arr, low, pi-1)
		quickSort(arr, pi+1, high)
	}
}

func partition(arr []int, low, high int) int {
	pivot := arr[high]
	i := low - 1
	for j := low; j < high; j++ {
		if arr[j] < pivot {
			i++
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	arr[i+1], arr[high] = arr[high], arr[i+1]
	return i + 1
}
