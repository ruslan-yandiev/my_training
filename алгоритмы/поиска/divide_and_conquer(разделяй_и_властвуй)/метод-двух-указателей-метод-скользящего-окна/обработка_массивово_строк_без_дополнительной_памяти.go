//! Два указание - это название нескольких способов оптимизации решений, содержащих вложенные циклы.
//! Оптимизация происходит за счет того, что во внутреннем цикле инекс движется только в одном направлении и не возвращается назат
//! Вариант 1: Два указателя движутся в одну сторону (скользящее окно - sliding window)
//! Вариант 2: Два указателя движутся на встречу друг другу
//! Вариант 3: указатели движутся в одну сторону но по разным массивам
//! - найти максимальный/минимальный "хороший" участок кода
//!- нати количество "хороших" участков
//! - обработать массив за один проход
// =============================================================================================================================================
/*
	УДАЛИТЬ ИЗ НЕ ОТСОРТИРОВАННОГО МАССИВА НЕОБХОДИМОЕ ЧИСЛО
	без использования дополнительной памяти
*/

func foo(arr []int, num int) []int {
	index := 0

	for l, r := 0, 0; r < len(arr); r++ {
		if arr[r] != num {
			arr[l] = arr[r]
			l++
			index++
		}
	}

	return arr[:index]
}

func main() {
	arr := []int{5, 2, 0, 3, 0, 0, 2, 4}

	fmt.Println(foo(arr, 0))
}

// ==============================================================================================================================
/*
	Перенести все нули в конец массива
	без использования дополнительной памяти
*/

func moveZeroes(nums []int) {
	for l, r := 0, 0; r < len(nums); r++ {
		if nums[r] != 0 {
			nums[l], nums[r] = nums[r], nums[l]
			l++
		}
	}
}

func main() {
	arr := []int{5, 2, 0, 3, 0, 0, 2, 4}
	moveZeroes(arr)

	fmt.Println(arr)
}

// ===============================================================================================================
//! Вариант 2: Два указателя движутся на встречу друг другу
// --------------------------------------------------------
/*
Дан отсортированный массив чисел и вторым аргументом дано целевое число. Нужно вернуть номера двух элементов в массиве которые в сумме дают целевое число
*/
// это НЕ метод двух указателей и дорого по памяти!!!
// func twoSum(numbers []int, target int) []int {
//     hh := make(map[int]int)

//     for i := 0; i < len(numbers); i++  {
//         if vel, ok := hh[numbers[i]]; ok {
//             return []int{vel+1, i+1}
//         }

//         hh[target - numbers[i]] = i
//     }

//	    return []int{}
//	}
//
// ----------------------------------------------
// Странно, что по памяти и по скорости тесты показывают одинаковый результат с верхним решением без указателей.
func twoSum(numbers []int, target int) []int {
	for l, r := 0, len(numbers)-1; l < len(numbers); l++ {
		for numbers[r]+numbers[l] > target || numbers[r] > target && numbers[l] > -1 {
			r--
		}

		if numbers[r]+numbers[l] == target {
			return []int{l + 1, r + 1}
		}
	}
	return []int{}
}

// -----------------------------------------------
func twoSum(numbers []int, target int) []int {
	for l, r := 0, len(numbers)-1; ; {
		if numbers[r]+numbers[l] == target {
			return []int{l + 1, r + 1}
		} else if numbers[l]+numbers[r] > target {
			r--
		} else if numbers[l]+numbers[r] < target {
			l++
		}
	}
	return []int{}
}

// ------------------------------------------------
// Более быстрый вариант из всех так как сочетает обработку вариантов помимо двух указателей идущих на встречу использует бинарный поиск в тех случаях когда это необходимо.
func twoSum(numbers []int, target int) []int {
	low := 0
	high := len(numbers) - 1
	mid := high / 2

	for high-mid > 1 {
		if numbers[low]+numbers[mid] > target {
			high = mid
		} else {
			mid = (mid + high) / 2
		}
	}

	for numbers[low]+numbers[high] != target {
		if numbers[low]+numbers[high] > target {
			high--
		} else {
			low++
		}
	}

	return []int{low + 1, high + 1}
}

// ======================================================================================================================================
/*
Является ли указанная строка палендромом без учета пробелов, регистра символов и знаков препинания.
*/
func isPalindrome(s string) bool {
	s = strings.ToLower(s) // как вариат можно использовать только при сравнении ниже
	check := map[string]bool{
		"":  true,
		" ": true,
		".": true,
		",": true,
		"!": true,
		"?": true,
		":": true,
		";": true,
		"@": true,
		"%": true,
		"#": true,
		"$": true,
		"^": true,
		"&": true,
		"*": true,
		"(": true,
		")": true,
		"+": true,
		"=": true,
		"-": true,
		"_": true,
		`\`: true,
		"|": true,
		"/": true,
		"<": true,
		">": true,
		"`": true,
		"~": true,
		"'": true,
		`"`: true,
		"[": true,
		"]": true,
		"{": true,
		"}": true,
	}

	for l, r := 0, len(s)-1; l < r; {
		for check[string(s[l])] && l < r {
			l++
		}

		for check[string(s[r])] && l < r {
			r--
		}

		if s[l] != s[r] { // strings.ToLower(string(s[l])) != strings.ToLower(string(s[r]))
			return false
		}

		l++
		r--
	}

	return true
}

// ---------------------------------------------------------
// Лучший и самый быстрый вариант как по памяти, так и по быстродействию
func isPalindrome(s string) bool {
	for l, r := 0, len(s)-1; l < r; {
		for l < r && !unicode.IsLetter(rune(s[l])) && !unicode.IsNumber(rune(s[l])) {
			l++
		}

		for l < r && !unicode.IsLetter(rune(s[r])) && !unicode.IsNumber(rune(s[r])) {
			r--
		}

		if unicode.ToLower(rune(s[l])) != unicode.ToLower(rune(s[r])) {
			return false
		}

		l++
		r--
	}

	return true
}

func main() {
	fmt.Println(isPalindrome("A man, a plan, a canal: Panama"))
}

// =====================================================================================================================
/*
Компания из N человек собирается пойти в байдарочный поход, i-ый человек характеризуется своей массой Mi кг. На лодочной базе имеется в наличии неограниченное количество одинаковых байдарок. Каждая байдарка может вмещать одного или двух людей. Байдарки имеют грузоподъемность D кг. Какое наименьшее количество байдарок придется арендовать компании, чтобы всем отправиться в поход?

Входные данные
В первой строке входного файла INPUT.TXT содержится пара натуральных чисел N, D (1 ≤ N ≤ 15000; 1 ≤ D ≤ 15000). Во второй строке содержится последовательность натуральных чисел M1, M2, ... , MN (1 ≤ Mi ≤ D).

Выходные данные
В выходной файл OUTPUT.TXT выведите искомое наименьшее количество необходимых байдарок.

Примеры
INPUT
4 135
50 74 60 82

OUTPUT
2

INPUT
6 135
50 120 74 60 100 82

OUTPUT
4

INPUT
8 135
50 120 15 74 82 60 100 35

OUTPUT
4
*/

func main() {
	var n, d, person int
	arr := []int{}

	fmt.Scan(&n, &d)

	for i := 0; i < n; i++ {
		fmt.Scan(&person)
		arr = append(arr, person)
	}

	count := 0

	sort.Ints(arr)

	for l, r := 0, len(arr)-1; l <= r; {
		for l < r && arr[l]+arr[r] > d {
			count++
			r--
		}

		count++
		l++
		r--
	}

	fmt.Println(count)
}

// ==================================================================================================================
/*
https://leetcode.com/problems/container-with-most-water/
11. Container With Most Water
Solved
Medium
Topics
Companies
Hint
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
*/
func maxArea(height []int) int {
	result := 0

	for l, r := 0, len(height)-1; l < r; {
		currArea := r - l

		if height[l] < height[r] {
			currArea *= height[l]
			l++
		} else {
			currArea *= height[r]
			r--
		}

		if result < currArea {
			result = currArea
		}
	}

	return result
}

func main() {
	fmt.maxArea([]int{1, 8, 6, 2, 5, 4, 8, 3, 7})
}

// ---------------------------------------------------
func maxArea(height []int) int {
	var result float64

	for l, r := 0, len(height)-1; l < r; {
		result = math.Max(result, float64((r-l))*math.Min(float64(height[l]), float64(height[r])))

		if height[l] < height[r] {
			l++
		} else {
			r--
		}
	}

	return int(result)
}

// =======================================================================================================================================
//! Вариант 3: указатели движутся в одну сторону но по разным массивам
//--------------------------------------------------------------------
/*
Объеденить два отсортированных массива в один отсортированный массив данный первым аргументом nums1
*/

func merge(nums1 []int, m int, nums2 []int, n int) []int {
	if len(nums2) == 0 {
		return nums1
	} else if len(nums1) == 0 {
		nums1 = append(nums1, nums2...)
	}

	for l, r, length := m-1, n-1, len(nums1)-1; length >= 0; length-- {
		if l > -1 && r > -1 && nums1[l] > nums2[r] {
			nums1[length] = nums1[l]
			l--
		} else if r > -1 {
			nums1[length] = nums2[r]
			r--
		}
	}

	return nums1
}
func main() {
	fmt.Println(merge([]int{1, 2, 3, 0, 0, 0}, 3, []int{2, 5, 6}, 3)) // [1, 2, 2, 3, 5, 6]
	fmt.Println(merge([]int{4, 5, 6, 0, 0, 0}, 3, []int{1, 2, 3}, 3))
	fmt.Println(merge([]int{1}, 1, []int{}, 0))
	fmt.Println(merge([]int{}, 0, []int{1}, 1))
}

// ==================================================================================================
/*
даны два отсортированных массива. Необходимо вернуь массив с двумя ближайшими числами из каждого
*/

func merge(arr1, arr2 []int) []int {
	result := []int{0, 0}
	detect := 9999999

	for l, r := 0, len(arr2)-1; l < len(arr1) && r >= 0; {
		if arr1[l] > arr2[r] {
			if detect > arr1[l]-arr2[r] {
				detect = arr1[l] - arr2[r]
				result[0] = arr1[l]
				result[1] = arr2[r]
			}
			r--
		} else if arr1[l] < arr2[r] {
			if detect > arr2[r]-arr1[l] {
				detect = arr2[r] - arr1[l]
				result[0] = arr1[l]
				result[1] = arr2[r]
			}
			l++
		} else {
			result[0] = arr1[l]
			result[1] = arr2[r]
			return result
		}
	}

	return result
}
func main() {
	fmt.Println(merge([]int{3, 4}, []int{1, 2, 3}))            //[3, 3]
	fmt.Println(merge([]int{4, 5}, []int{1, 2, 3}))            // [4, 3]
	fmt.Println(merge([]int{2, 5, 16, 44}, []int{13, 26, 27})) // [16, 13]
}

// ==============================================================================
