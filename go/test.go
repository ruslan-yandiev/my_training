package main

import (
	"fmt"
	"strings"
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

func main() {
	var str string
	fmt.Scan(&str)
	hh := make(map[string]bool)
	result := str

	for _, v := range str {
		if _, ok := hh[string(v)]; ok {
			result = strings.Trim(result, string(v))
		}

		hh[string(v)] = true
	}

	fmt.Println(result)
}
