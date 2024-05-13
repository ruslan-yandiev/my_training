//! Два указание - это название нескольких способов оптимизации решений, содержащих вложенные циклы.
//! Оптимизация происходит за счет того, что во внутреннем цикле инекс движется только в одном направлении и не возвращается назат
//! Вариант 1: Два указателя движутся в одну сторону (скользящее окно - sliding window)
//! Вариант 2: Два указателя движутся на встречу друг другу
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