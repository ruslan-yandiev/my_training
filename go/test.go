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

func rightBinSearch(arr []int, target int) int {
	left := 0
	right := len(arr) - 1
	var mid int

	for left <= right {
		mid = (left + right) / 2

		if arr[mid] > target {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}

	if arr[right] == target {
		return right
	}

	return -1
}

func main() {
	fmt.Println(rightBinSearch([]int{11, 33, 33, 33, 44, 111, 111, 111, 122, 122, 133, 133, 133, 222}, 10))
}
