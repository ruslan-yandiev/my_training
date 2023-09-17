package main

import (
	"fmt"
)

func myF(num int) int {
	accum := 0

	for i := 0; i <= num; i++ {
		if i%3 == 0 && i%5 == 0 && i%7 == 0 {
			accum += i
		}
	}

	return accum
}

func main() {
	fmt.Println(myF(70))
}
