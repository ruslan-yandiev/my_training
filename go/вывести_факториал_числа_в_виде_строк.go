package main

import (
	"fmt"
	"strings"
)

func main() {
	fmt.Println(myF(5))
}

func myF(num int) string {
	// Не копируйте strings.Builder значение, поскольку оно кэширует базовые данные.
	// Если вы хотите поделиться strings.Builder значением, используйте указатель на него.
	// наиболее эффективный способ конкатинации строк
	var result strings.Builder

	for i := num - 1; i > 0; i-- {
		result.WriteString(fmt.Sprintf("%d * %d = %d \n", num, i, num*i))
		num = num * i
	}

	return result.String()
}
