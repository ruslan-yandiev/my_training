package main

import (
	"fmt"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {

	sum := 0
	inc := 1

	for l1 != nil || l2 != nil {
		if l1 != nil {
			sum = l1.Val*inc + sum
			l1 = l1.Next
		}

		if l2 != nil {
			sum = l2.Val*inc + sum
			l2 = l2.Next
		}

		sum / inc % 10,
			inc *= 10
	}

	return result
}

func main() {
	result := addTwoNumbers(&ListNode{2, &ListNode{4, &ListNode{3, nil}}}, &ListNode{5, &ListNode{6, &ListNode{4, nil}}})

	fmt.Println(result) // [7, 0, 8]
	// fmt.Println(7 / 1 % 10)
}
