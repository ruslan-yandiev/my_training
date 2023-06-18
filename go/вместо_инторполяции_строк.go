package main

import (
	"fmt"
)

func main() {
	fmt.Println(GenerateSelfStory("Ruslan", 37, 100000000000.1000043))

	// Указатель является переменной, что указывает на адрес другой переменной. В программировании указатели являются формой косвенной адресации, что может быть довольно мощным инструментом.
	a := 1
	b := &a
	c := &b

	fmt.Printf("%p %p %p\n", &a, &b, &c) // 0xc000018030 0xc00000e028 0xc00000e030
}

func GenerateSelfStory(name string, age int, money float64) string {
	return fmt.Sprintf("Hello! My name is %s. I'm %d y.o. And I also have $%.2f in my wallet right now.", name, age, money)
}
