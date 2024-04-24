package main

import (
	"fmt"
)

// func maximumCount(nums []int) int {
// 	left := -1
// 	right := len(nums)
// 	var mid int
// 	l, r := 0, 0

// 	for left+1 < right {
// 		mid = (left + right) / 2

// 		if nums[mid] >= 0 {
// 			right = mid
// 		} else {
// 			left = mid
// 		}
// 	}

// 	l = left
// 	left = -1
// 	right = len(nums)

// 	for left+1 < right {
// 		mid = (left + right) / 2

// 		if nums[mid] <= 0 {
// 			left = mid
// 		} else {
// 			right = mid
// 		}
// 	}

// 	r = right

// 	l += 1
// 	r = len(nums) - r

// 	if l > r {
// 		return l
// 	}

// 	return r
// }

//	func main() {
//		fmt.Println(maximumCount([]int{-3, -2, -1, 1, 2, 3}))                                  // 3
//		fmt.Println(maximumCount([]int{-4, -3, -2, -1, 1, 2, 3}))                              // 4
//		fmt.Println(maximumCount([]int{-3, -2, -1, 1, 2, 3, 4}))                               // 4
//		fmt.Println(maximumCount([]int{-6, -5, -4, -3, -2, -1, 1, 2, 3}))                      // 6
//		fmt.Println(maximumCount([]int{-3, -2, -1, 1, 2, 3, 4, 5, 6}))                         // 6
//		fmt.Println(maximumCount([]int{-3, -2, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3})) // 3
//		fmt.Println(maximumCount([]int{-4, -3, -2, -1, 0, 1, 2, 3}))                           // 4
//		fmt.Println(maximumCount([]int{-3, -2, -1, 0, 0, 0, 0, 1, 2, 3, 4}))                   // 4
//		fmt.Println(maximumCount([]int{-6, -5, -4, -3, -2, -1, 0, 0, 1, 2, 3}))                // 6
//		fmt.Println(maximumCount([]int{-3, -2, -1, 0, 0, 1, 2, 3, 4, 5, 6}))                   // 6
//	}

/*
Когда у Валеры появляется свободное время, он идет в библиотеку и читает книги. Вот и сегодня у него появилось t свободных минут для чтения. Поэтому Валера взял n книг в библиотеке и для каждой книги оценил: какое время потребуется, чтобы ее прочитать. Пронумеруем книги целыми числами от 1 до n. Для прочтения i-той книги Валере требуется ai минут.

Валера решил, что он выберет произвольную книгу с номером i и будет читать книги друг за другом, начиная с этой книги. Другими словами, сначала он прочитает книгу c номером i, затем книгу с номером i + 1, затем книгу с номером i + 2 и так далее. Он продолжает этот процесс до тех пор, пока либо не закончится его свободное время, либо не прочитает книгу с номером n. Каждую книгу Валера читает целиком, то есть он не читает книгу, которую не успеет дочитать до конца из-за нехватки свободного времени.

Посчитайте максимальное количество книг, которое Валера сможет прочитать.

Входные данные
В первой строке заданы два целых числа n и t (1 ≤ n ≤ 105; 1 ≤ t ≤ 109) — количество книг и количество свободных минут у Валеры соответственно. Во второй строке задана последовательность из n целых чисел a1, a2, ..., an (1 ≤ ai ≤ 104), в которой число ai обозначает количество минут, которое требуется для прочтения i-ой книги.

Выходные данные
Выведите единственное целое число — максимальное количество книг, которое Валера сможет прочитать.
*/

// func foo(n, t int, timeCollection []int) int {
// 	for i := 1; i < len(timeCollection); i++ {
// 		for j := i; j > 0 && timeCollection[j] < timeCollection[j-1]; j-- {
// 			timeCollection[j], timeCollection[j-1] = timeCollection[j-1], timeCollection[j]
// 		}
// 	}

// 	var count, time int

// 	for _, v := range timeCollection {
// 		if time+v <= t {
// 			count++
// 			time += v
// 		}
// 	}

//		return count
//	}

/*
В парке города Питсбурга есть чудесная аллея, состоящая из N посаженных в один ряд деревьев, каждое одного из K сортов. В связи с тем, что Питсбург принимает открытый чемпионат Байтландии по программированию, было решено построить огромную арену для проведения соревнований. Так, согласно этому плану вся аллея подлежала вырубке. Однако министерство деревьев и кустов воспротивилось этому решению, и потребовало оставить некоторые из деревьев в покое. Согласно новому плану строительства все деревья, которые не будут вырублены, должны образовывать один непрерывный отрезок, являющийся подотрезком исходного. Каждого из K видов деревьев требуется сохранить хотя бы по одному экземпляру. На вас возложена задача найти отрезок наименьшей длины, удовлетворяющий указанным ограничениям.

Входные данные
В первой строке входного файла находятся два числа N и K ( 1 ≤ N , K ≤ 250000 ). Во второй строке входного файла следуют N чисел (разделенных пробелами), i -ое число второй строки задает цвет i -ого слева дерева в аллее. Гарантируется, что присутствует хотя бы одно дерево каждого цвета

Выходные данные
В выходной файл выведите два числа, координаты левого и правого концов отрезка минимальной длины, удовлетворяющего условию. Если оптимальных ответов несколько, выведите любой.
*/

func foo(n, k int, arr []int) []int {
	result := []int{1, 1}

	for l, r := 0, 0; r < n; r++ {

		result[1] = r + 1

		for l < r && arr[r] == arr[l] {
			l++
			result[0] = l + 1
		}
	}

	return result
}

func main() {
	fmt.Println(foo(5, 3, []int{1, 2, 1, 3, 2}))    // [2, 4]
	fmt.Println(foo(6, 4, []int{2, 4, 2, 3, 3, 1})) // [2, 6]
	fmt.Println(foo(6, 1, []int{3, 3, 3, 3, 3, 3})) // [1, 1]
	fmt.Println(foo(6, 2, []int{3, 3, 4, 3, 3, 4})) // [2, 3]
}
