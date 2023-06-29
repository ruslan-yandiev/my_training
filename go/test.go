package main

import "fmt"

type Person struct {
	Age uint8
}

type PersonList []Person

func main() {
	pl := PersonList{
		{Age: 18},
		{Age: 44},
		{Age: 18},
		{Age: 18},
	}

	fmt.Println(pl.GetAgePopularity()) // map[18:2 44:1]
	// pl.GetAgePopularity() // map[18:2 44:1]
}

func (pl PersonList) GetAgePopularity() map[uint8]int {
	result := make(map[uint8]int, len(pl))

	for _, v := range pl {
		result[v.Age]++
	}

	return result
}
