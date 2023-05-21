package main

import "fmt"

func main() {
	mySlice := []int{1, 2, 3, 4, 5}

	fmt.Println(Remove(mySlice, 2))
}

//! Удалит и вернет последовательный слайс
func Remove(nums []int, i int) []int {
	// * выделяем в срез элементы до него, затем элементы после него,
	// * а затем объединить два новых среза в один срез, не содержащий удаленного элемента.
	return append(nums[:i], nums[i+1:]...)
}

//! Удалит и вернет последовательный слайс
func Remove2(nums []int, i int) []int {
	if i >= len(nums) || i < 0 {
		return nums
	}

	newNums := make([]int, 0, len(nums)-1)

	for j := 0; j < len(nums); j++ {
		if j != i {
			newNums = append(newNums, nums[j])
		}
	}

	return newNums // [1, 2, 4, 5]
}

//! Ужалит и вернет не последовательный слайс
func Remove3(nums []int, i int) []int {
	if i < 0 || i > len(nums)-1 {
		return nums
	}

	nums[i] = nums[len(nums)-1] // перезапишем значение

	return nums[:len(nums)-1] // [1, 2, 5, 4] // вернем новый слайс без последнего элемента
}
