package main

import (
	"fmt"
)

func main() {
	a := "mfgah134517095aldrfgvh8h"

	fmt.Println(cutOffLetter(a))
}

// По времени O(n), по памяти O(1)
func cutOffLetter(str string) string {
	result := ""
	detect := map[string]bool{
		"0": true,
		"1": true,
		"2": true,
		"3": true,
		"4": true,
		"5": true,
		"6": true,
		"7": true,
		"8": true,
		"9": true,
	}

	for i := 0; i < len(str); i++ {
		_, ok := detect[string(str[i])]

		if ok {
			result += string(str[i])
		}
	}

	return result
}
