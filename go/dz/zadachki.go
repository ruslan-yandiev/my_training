package main

import (
	"fmt"
)

// вернуть массив повторяющихся чисел во всех трех подмассивах
func myFunc(arr ...[]int) []int {
	result := []int{}
	detect := map[int]int{}

	for i := 0; i < len(arr); i++ {
		for j := 0; j < len(arr[i]); j++ {
			value, ok := detect[arr[i][j]]

			if ok && value+1 == 6 {
				result = append(result, arr[i][j])
			} else if ok {
				detect[arr[i][j]] += 1
			} else {
				detect[arr[i][j]] = 1
			}
		}
	}

	return result
}

func main() {
	fmt.Println(myFunc([]int{0, 1, 2, 3, 1, 0}, []int{1, 4, 5, 1, 6, 0, 0}, []int{1, 4, 0, 5, 1, 0, 6}))
}

// ========================================================================================================
func main() {
	// дан отсортированный массив, нужно вывести квадраты всех целых чисел. тут сложность O(n)

	arr := []int{-11, -10, 3, 4, 5, 6, 7, 8, 9}
	result := make([]int, len(arr), len(arr))
	count := 0

	for i := 0; i < len(arr); i++ {
		if arr[i] < 0 {
			result[len(arr)-1-i] = arr[i] * arr[i]
			count++
		} else {
			result[i-count] = arr[i] * arr[i]
		}
	}

	fmt.Println(result)
}

// =====================================================================================================================
// ! Сложность плохая O(n*k)
func myFunc(arr []int, k int) []int {
	var max int
	result := []int{}

	for i := 0; i <= len(arr)-k; i++ {
		max = arr[i]

		for j := i; j < i+k; j++ {
			if arr[j] > max {
				max = arr[j]
			}
		}
		result = append(result, max)
	}

	return result
}

func main() {
	// дан не отсортированный массив и число окна промежутка. Необходимо вывести массив из наибольших чисел по каждой итерации окна.
	fmt.Println(myFunc([]int{6, 2, 3, 7, 0, 1}, 3)) // [6,7,7,7]
}

// ============================================================================
// удалить дубликаты в отсортированном массиве и вернуть в том же порядке. Сложность O(n)
func deleteD(arr []int) []int {
	detect := make(map[int]int)
	result := []int{}

	// одновременно проверяя в хэш таблице и добавляя отсутствующие элементы мы сохраняем порядок элементов
	for i := 0; i < len(arr); i++ {
		if _, ok := detect[arr[i]]; !ok {
			detect[arr[i]] = arr[i]
			result = append(result, arr[i])
		}
	}

	return result
}

func main() {
	fmt.Println(deleteD([]int{1, 1, 2}))                   // [1, 2]
	fmt.Println(deleteD([]int{1, 2, 3, 3, 3, 4, 4, 5, 6})) // [1, 2, 3, 4, 5, 6]
}

// удалить дубликаты в отсортированном массиве и вернуть в том же порядке Сложность O(n)
// ! Метод двух указателей
func deleteD(arr []int) []int {
	result := []int{}
	result = append(result, arr[0])

	for i := 1; i < len(arr); i++ {
		if arr[i] != arr[i-1] {
			result = append(result, arr[i])
		}
	}

	return result
}

func main() {
	fmt.Println(deleteD([]int{1, 1, 2}))                   // [1, 2]
	fmt.Println(deleteD([]int{1, 2, 3, 3, 3, 4, 4, 5, 6})) // [1, 2, 3, 4, 5, 6]
}

// Без затрат по памяти. удалить дубликаты в отсортированном массиве и вернуть в том же порядке, без использования дополнительной памяти. Сложность O(n)
// ! Метод двух указателей
func deleteD(arr []int) []int {
	index := 1

	for i := 1; i < len(arr); i++ {
		if arr[i] != arr[i-1] {
			arr[index] = arr[i]
			index++
		}
	}

	return arr[:index] // сделаем срез с нашего массива тем самым не затравит память
}

func main() {
	fmt.Println(deleteD([]int{1, 1, 2}))                            // [1, 2]
	fmt.Println(deleteD([]int{1, 1, 1, 1, 2, 3, 3, 3, 4, 4, 5, 6})) // [1, 2, 3, 4, 5, 6]
}

// ! Метод двух указателей
// удалить дубликаты в отсортированном массиве и вернуть в том же порядке, без использования дополнительной памяти. Сложность O(n)
func deleteD(arr []int) []int {
	first, second := 0, 0

	for second < len(arr) {
		if second < len(arr)-1 && arr[second] == arr[second+1] {
			second++
		} else {
			arr[first] = arr[second]
			first++
			second++
		}
	}

	return arr[:first]
}

func main() {
	fmt.Println(deleteD([]int{1, 1, 2}))                            // [1, 2]
	fmt.Println(deleteD([]int{1, 1, 1, 1, 2, 3, 3, 3, 4, 4, 5, 6})) // [1, 2, 3, 4, 5, 6]
}

// =============================================================================================================
type MyList struct {
	Val  int
	Next *MyList
}

// Дан сортированный связанный список. Нужно удалить дубли из списка без использования дополнительной памяти. со сложностью не выше O(n)
// ! Метод двух указателей
func deleteD(list *MyList) *MyList {
	nextList := list.Next
	current := list

	for nextList != nil {
		if current.Val != nextList.Val {
			current.Next = &MyList{
				Val:  nextList.Val,
				Next: nil,
			}

			current = current.Next
		}

		nextList = nextList.Next
	}

	return list
}

func main() {
	fmt.Println(deleteD(&MyList{1, &MyList{1, &MyList{1, &MyList{2, &MyList{2, &MyList{3, &MyList{4, &MyList{4, &MyList{4, nil}}}}}}}}})) // [1, 2, 3, 4]
}

// ========================================================================================
// удалить дубли в не отсортированном массиве
func foo(arr []int) []int {
	index := 0
	hh := make(map[int]bool)

	for i := 0; i < len(arr); i++ {
		if _, ok := hh[arr[i]]; !ok {
			arr[index] = arr[i]
			index++
		}

		hh[arr[i]] = true
	}

	return arr[:index+1]
}

func main() {
	fmt.Println(foo([]int{11, 0, 0, 1, 1, 1, 55, 11, 2, 2, 2, 3, 3, 55, 55, -13, 3, 4, 4, -13, 4, 5, 5, 5, 6}))
}
