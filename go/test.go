package main

import (
	"fmt"
)

// func maximumCount(nums []int) int {
// 	left := -1
// 	right := len(nums)
// 	var mid int
// 	l, r := 0, 0

// 	for left+1 < right {
// 		mid = (left + right) / 2

// 		if nums[mid] >= 0 {
// 			right = mid
// 		} else {
// 			left = mid
// 		}
// 	}

// 	l = left
// 	left = -1
// 	right = len(nums)

// 	for left+1 < right {
// 		mid = (left + right) / 2

// 		if nums[mid] <= 0 {
// 			left = mid
// 		} else {
// 			right = mid
// 		}
// 	}

// 	r = right

// 	l += 1
// 	r = len(nums) - r

// 	if l > r {
// 		return l
// 	}

// 	return r
// }

// func main() {
// 	fmt.Println(maximumCount([]int{-3, -2, -1, 1, 2, 3}))                                  // 3
// 	fmt.Println(maximumCount([]int{-4, -3, -2, -1, 1, 2, 3}))                              // 4
// 	fmt.Println(maximumCount([]int{-3, -2, -1, 1, 2, 3, 4}))                               // 4
// 	fmt.Println(maximumCount([]int{-6, -5, -4, -3, -2, -1, 1, 2, 3}))                      // 6
// 	fmt.Println(maximumCount([]int{-3, -2, -1, 1, 2, 3, 4, 5, 6}))                         // 6
// 	fmt.Println(maximumCount([]int{-3, -2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3})) // 3
// 	fmt.Println(maximumCount([]int{-4, -3, -2, -1, 0, 1, 2, 3}))                           // 4
// 	fmt.Println(maximumCount([]int{-3, -2, -1, 0, 0, 0, 0, 1, 2, 3, 4}))                   // 4
// 	fmt.Println(maximumCount([]int{-6, -5, -4, -3, -2, -1, 0, 0, 1, 2, 3}))                // 6
// 	fmt.Println(maximumCount([]int{-3, -2, -1, 0, 0, 1, 2, 3, 4, 5, 6}))                   // 6
// }

func qweekSort(arr []int) []int {
	return helperQweekSort(arr, 0, len(arr)-1)
}

func helperQweekSort(arr []int, left, right int) []int {
	if len(arr) < 1 {
		return arr
	}

	index := pivouting(arr, left, right)

	if left < index-1 {
		helperQweekSort(arr, left, index-1)
	}

	if index < right {
		helperQweekSort(arr, index, right)
	}

	return arr
}

func pivouting(arr []int, left, right int) int {
	piv := (left + right) / 2

	for left <= right {
		for arr[left] < arr[piv] {
			left++
		}

		for arr[right] > arr[piv] {
			right--
		}

		if left <= right {
			swop(arr, left, right)
			left++
			right--
		}
	}

	return left
}

func swop(arr []int, i, j int) {
	item := arr[i]
	arr[i] = arr[j]
	arr[j] = item
}

func main() {
	fmt.Println(qweekSort([]int{22, 33, 11, 3, -3, 0, -3, -5, -1, 4, 7}))
}
