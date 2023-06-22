package main

import (
	"fmt"
)

func main() {
	fmt.Printf("%v\n", intersection([]int{23, 3, 1, 2}))
	fmt.Printf("%v\n", intersection([]int{23, 3, 1, 2}, []int{6, 2, 4, 23}))                                                 // [23, 2]
	fmt.Printf("%v\n", intersection([]int{1, 1, 1}, []int{1, 1, 1, 1}))                                                      // [1, 1, 1]
	fmt.Printf("%v\n", intersection([]int{1, 2, 2, 1}, []int{2, 2}))                                                         // [2, 2]
	fmt.Printf("%v\n", intersection([]int{4, 9, 5}, []int{9, 4, 9, 8, 4}))                                                   // [9, 4]
	fmt.Printf("%v\n", intersection([]int{4, 9, 5}, []int{9, 4, 9, 8, 4}, []int{3, 1, 8, 9, 8, 1}))                          // [9]
	fmt.Printf("%v\n", intersection([]int{4, 9, 5}, []int{9, 4, 9, 8, 4}, []int{3, 1, 8, 9, 8, 1}, []int{4, 5, 8, 9, 7, 7})) // [9]
}

func intersection(arrs ...[]int) []int {

}
