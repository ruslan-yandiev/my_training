package main

import (
	"fmt"
)

func main() {
	fmt.Println(any([]int{1, 2, 3, 4}, func(el, i int) bool { return el > 5 }))
}

func any(arr []int, f func(el, i int) bool) bool {
	detect := false

	for i := 0; i < len(arr); i++ {
		if detect == true {
			return detect
		}

		detect = f(arr[i], i)
	}

	return detect
}
