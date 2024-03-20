// найти сумму данного числа в отсортированном массиве и вернуть индексы этих чисел +1 к индексам
func twoSum(numbers []int, target int) []int {
	left, right := 0, len(numbers)-1
	sum := numbers[left] + numbers[right]

	for sum != target {
		if sum > target {
			right--
		} else {
			left++
		}

		sum = numbers[left] + numbers[right]
	}

	return []int{left + 1, right + 1}
}