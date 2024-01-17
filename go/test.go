package main

import (
	"fmt"
)

func qweekSort(arr []int) []int {
	if len(arr) < 1 {
		return arr
	}

	index := len(arr) / 2
	pointe := arr[index]
	left := []int{}
	right := []int{}

	for i := 0; i < len(arr); i++ {
		if i != index && arr[i] < pointe {
			left = append(left, arr[i])
		} else if i != index {
			right = append(right, arr[i])
		}
	}

	newArr := []int{}
	newArr = append(newArr, qweekSort(left)...)
	newArr = append(newArr, pointe)
	newArr = append(newArr, qweekSort(right)...)

	return newArr
}

func main() {
	fmt.Println(qweekSort([]int{-22, 14, 1, -33, 2, 11, 2, 14, -4, 5, 2, 0}))
}
