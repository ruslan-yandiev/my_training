package main

import (
	"fmt"
)

func main() {

	str := "wwwww"
	arr := []string{str}
	arr = append(arr, "qqqq", "zzzzzz")
	str2 := ""

	for i := 0; i < len(arr); i++ {
		str2 += arr[i]
		str2 += " "
	}

	fmt.Println(str2)
}
