package main

import (
	"fmt"
)

func main() {
	fmt.Println(GenerateSelfStory("Ruslan", 37, 100000000000.1000043))
}

func GenerateSelfStory(name string, age int, money float64) string {
	return fmt.Sprintf("Hello! My name is %s. I'm %d y.o. And I also have $%.2f in my wallet right now.", name, age, money)
}
