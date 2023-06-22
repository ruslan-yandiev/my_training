package main

import (
	"fmt"
)

func main() {
	a := []int{37, 5, 1, 2}
	b := []int{6, 2, 4, 37}
	// [2, 37]
	fmt.Printf("%v\n", intersection(a, b))

	a = []int{1, 1, 1}
	b = []int{1, 1, 1, 1}
	// [1, 1, 1]
	fmt.Printf("%v\n", intersection(a, b))
}

func intersection(a, b []int) []int {
	result := make([]int, 0, len(a))
	detect := make(map[int]int, 0)

	for i := range a {
		detect[a[i]]++
	}

	for i := range b {
		if value, ok := detect[b[i]]; ok && value > 0 {
			result = append(result, b[i])
			detect[b[i]]--
			continue
		}

		delete(detect, b[i])
	}

	return result
}

func intersection2(a, b []int) []int {
	result := make([]int, 0, len(a))
	detect := make(map[int]int, 0)

	for i := 0; i < len(a); i++ {
		if _, ok := detect[a[i]]; ok {
			detect[a[i]] += 1
		} else {
			detect[a[i]] = 1
		}
	}

	for i := 0; i < len(b); i++ {
		if _, ok := detect[b[i]]; ok && detect[b[i]] > 0 {
			detect[b[i]] -= 1
			result = append(result, b[i])
		}
	}

	return result
}

func intersection3(a, b []int) []int {
	result := make([]int, 0, len(a))
	detect := make(map[int]int, 0)

	for i := 0; i < len(a); i++ {
		_, ok := detect[a[i]]

		if ok {
			detect[a[i]] += 1
		} else {
			detect[a[i]] = 1
		}
	}

	for i := 0; i < len(b); i++ {
		_, ok := detect[b[i]] //! при таком диструктурировании первая переменная будет значением хэша(мапы), а вторая булевым значением, а не ключ и значение хэша

		if ok && detect[b[i]] > 0 {
			detect[b[i]] -= 1
			result = append(result, b[i])
		}
	}

	return result
}
