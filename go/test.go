package main

import (
	"fmt"
)

func main() {
	n := 9876543210

	// Повторить в цикле десяток раз по количеству цифр в числе
	r := n % 10
	fmt.Println(r)
	n /= 10
	r = n % 10
	fmt.Println(r)
	//.............
}
