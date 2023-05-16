package main

import "fmt"

// точка входа самозапускающаяся, не должна принимать никакие аргументы (и не возвращает вроде бы...)
func main() {
	arr := make([]int, 0)

	for i := 0; i < 10; i++ {
		arr = append(arr, i)
	}

	fmt.Println(arr)

	main2()
}

func main2() {
	engToRus := make(map[string]string, 0)

	engToRus["Ruslan"] = "Yandiev"
	engToRus["Ivan"] = "Ivanov"
	engToRus["keyyy"] = "kuuu"

	delete(engToRus, "keyyy")

	for key, value := range engToRus {
		fmt.Println("key:", key, "value:", value)
	}
}
