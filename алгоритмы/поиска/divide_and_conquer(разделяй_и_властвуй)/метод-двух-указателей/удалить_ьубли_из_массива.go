// удалить дубликаты в отсортированном массиве и вернуть в том же порядке, без использования дополнительной памяти. Сложность O(n)
// ! Метод двух указателей
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
