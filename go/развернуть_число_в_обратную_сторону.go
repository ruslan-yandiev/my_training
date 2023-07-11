package main

import (
	"fmt"
	"strconv"
)

func main() {
	fmt.Println(myF(12345))
}

func myF(num int) int {
	str := strconv.Itoa(num)
	result := ""

	for i := len(str) - 1; i >= 0; i-- {
		result += string(str[i])
	}

	number, _ := strconv.Atoi(result)

	return number
}
