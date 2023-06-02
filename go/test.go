package main

import "fmt"

func main() {
	arr := []int64{33, 103, 1, 2, 0, 8, 111, 9, 9, 9, 9, 9, 9, 9, 9, 9, 55, 9, 10, 0, 0, 33, 1}
	fmt.Println(UniqueUserIDs(arr))
}

func UniqueUserIDs(userIDs []int64) []int64 {
	hrr := make(map[int64]int, len(userIDs))

	for i := 0; i < len(userIDs); i++ {
		if hrr[userIDs[i]] == 0 {
			hrr[userIDs[i]] = i + 1
		}
	}

	arr := make([]int64, len(hrr), len(hrr))

	for key, value := range hrr {
		arr[value-1] = key
	}

	return arr
}
