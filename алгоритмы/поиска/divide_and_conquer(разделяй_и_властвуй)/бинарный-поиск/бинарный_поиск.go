package main

import (
	"fmt"
)

// * поиск индекса любого вхождения искомого элемента колекции
func binSearch(arr []int, item int) int {
	left := 0
	right := len(arr) - 1
	index := (right-left)/2 + left //! (left + right) / 2  может быть переполнено при больших цифрах. использовать left + (right - left) / 2  который точно не приведёт к переполнениям, если имеем дело с неотрицательными целыми числами и first<last.
	mid := arr[index]              //! mid = (left + right) >> 1 при побитовом сдвиге тоже можно получить отрезок без переполнения (по идее так, но не точно)

	for left <= right {
		if item == mid {
			return index
		} else if item < mid {
			right = index - 1
		} else {
			left = index + 1
		}

		index = (right-left)/2 + left // (left + right) / 2  может быть переполнено при больших цифрах. использовать left + (right - left) / 2 который точно не приведёт к переполнениям, если имеем дело с неотрицательными целыми числами и first<last.
		mid = arr[index]
	}

	return -1
}

func main() {
	fmt.Println(binSearch([]int{1, 2, 2, 2, 5, 7, 7, 7, 7, 11, 14, 77, 111, 111, 112, 121, 122, 222, 333, 444, 1234, 3333}, 7))
}

// ==============================================================================================================
func leftBinSearch(arr []int, target int) int {
	left := 0
	right := len(arr) - 1
	var mid int

	if arr[len(arr)-1] < target {
		return -1
	}

	for left <= right {
		mid = (left + right) / 2

		if arr[mid] < target {
			left = mid + 1
		} else {
			right = mid - 1
		}
	}

	if arr[left] == target {
		return left
	}

	return -1
}

func main() {
	fmt.Println(leftBinSearch([]int{11, 33, 33, 33, 44, 111, 111, 111, 122, 122, 133, 133, 133, 222}, 111))
}

// ===============================================================================================================
// * Поиск первого вхождения искомого элемента в коллекции
func leftBinSearch(arr []int, item int) int {
	left := 0
	right := len(arr) - 1
	var mid int

	for left+1 < right {
		mid = left + (right-left)/2 // (left + right) / 2  может быть переполнено при больших цифрах. использовать left + (right - left) / 2

		if arr[mid] < item { // ! важна последовательность в условии
			left = mid
		} else {
			right = mid
		}
	}

	if item == arr[left] { // ! важна последовательность в условии
		return left
	}

	if item == arr[right] { // ! важна последовательность в условии
		return right
	}

	return -1
}

func main() {
	fmt.Println(leftBinSearch([]int{1, 2, 2, 2, 2, 5, 7, 7, 7, 7, 7, 11, 14, 77, 111, 111, 112, 121, 122, 222, 333, 444, 1234, 3333}, 2))
}

// --------------------------------------------------------------------------------
// более короткий варинт //! Двоичный поиск в ИНТЕРВАЛЕ когда стартовые позиции выходят за область и в конце одно обязательно укажет на искомое
func leftBinSearch(arr []int, item int) int {
	left := -1
	right := len(arr)
	var mid int

	for left+1 < right {
		mid = left + (right-left)/2

		if arr[mid] < item { // ! важна последовательность в условии
			left = mid
		} else {
			right = mid
		}
	}

	if right < len(arr) && item == arr[right] {
		return right
	}

	return -1
}

func main() {
	fmt.Println(leftBinSearch([]int{1, 2, 2, 2, 2, 5, 7, 7, 7, 7, 7, 11, 14, 77, 111, 111, 112, 121, 122, 222, 333, 444, 1234, 3333}, 7))
}

// =======================================================================================
func leftBinSearch(arr []int, target int) int {
	left := -1
	right := len(arr)
	var mid int

	for left+1 < right {
		mid = (left + right) / 2

		if arr[mid] >= target {
			right = mid
		} else {
			left = mid
		}
	}

	if right < len(arr) && arr[right] == target {
		return right
	}

	return -1
}

func main() {
	arr := []int{2, 2, 2, 4, 4, 4, 5, 5, 5, 6, 6, 8, 8, 8, 11, 14, 14, 14, 33}

	fmt.Println(leftBinSearch(arr, 2))   // 0
	fmt.Println(leftBinSearch(arr, 4))   // 3
	fmt.Println(leftBinSearch(arr, 6))   // 9
	fmt.Println(leftBinSearch(arr, 11))  // 14
	fmt.Println(leftBinSearch(arr, 66))  // -1
	fmt.Println(leftBinSearch(arr, -33)) // -1
}

// !  ==========================================================================================================================
// =============================================================================================================================
func rightBinSearch(arr []int, target int) int {
	left := 0
	right := len(arr) - 1
	var mid int

	if arr[0] > target {
		return -1
	}

	for left <= right {
		mid = (left + right) / 2

		if arr[mid] > target {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}

	if arr[right] == target {
		return right
	}

	return -1
}

func main() {
	fmt.Println(rightBinSearch([]int{11, 33, 33, 33, 44, 111, 111, 111, 122, 122, 133, 133, 133, 222}, 22222))
}

// ==============================================================================================================================
// * Поиск последнего вхождения искомого элемента в коллекции
func rightBinSearch(arr []int, item int) int {
	left := 0
	right := len(arr) - 1
	var mid int

	for left+1 < right {
		mid = left + (right-left)/2

		if arr[mid] > item { // ! важна последовательность в условии
			right = mid
		} else {
			left = mid
		}
	}

	if item == arr[right] { // ! важна последовательность в условии
		return right
	}

	if item == arr[left] { // ! важна последовательность в условии
		return left
	}

	return -1
}

func main() {
	fmt.Println(rightBinSearch([]int{1, 2, 2, 2, 2, 5, 7, 7, 7, 7, 7, 11, 14, 77, 111, 111, 112, 121, 122, 222, 333, 444, 1234, 3333}, 7))
}

// ---------------------------------------------
// более короткий варинт //! Двоичный поиск в ИНТЕРВАЛЕ когда стартовые позиции выходят за область и в конце одно обязательно укажет на искомое
func rightBinSearch(arr []int, item int) int {
	left := -1
	right := len(arr)
	var mid int

	for left+1 < right {
		mid = left + (right-left)/2

		if arr[mid] > item { // ! важна последовательность в условии
			right = mid
		} else {
			left = mid
		}
	}

	if left > -1 && item == arr[left] {
		return left
	}

	return -1
}

func main() {
	fmt.Println(rightBinSearch([]int{1, 2, 2, 2, 2, 5, 7, 7, 7, 7, 7, 11, 14, 77, 111, 111, 112, 121, 122, 222, 333, 444, 1234, 3333}, 7))
}

// ==================================================================================================================================
