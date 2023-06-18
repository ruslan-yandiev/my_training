package main

import (
	"fmt"
)

func main() {
	arr := []int{1, 3, 4, 3, 2, 5, 6, 2, 7, 8, 3}

	fmt.Println(myFunc(arr))
}

func myFunc(arr []int) []int {
	detect := map[int]int{}

	result := make([]int, 0)

	for i := 0; i < len(arr); i++ {
		_, value := detect[arr[i]]

		if value == false {
			detect[arr[i]] = 1
			continue
		} else {
			detect[arr[i]] += 1
		}

		if detect[arr[i]] == 3 {
			result = append(result, arr[i])
		}
	}

	fmt.Println(detect)

	return result
}
