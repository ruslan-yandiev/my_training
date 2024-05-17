package main

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
