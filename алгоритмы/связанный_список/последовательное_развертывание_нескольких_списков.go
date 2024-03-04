package main

import (
	"fmt"
)

type ListNode struct {
	Val  int
	Next *ListNode
}

func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	result := &ListNode{}
	current := result

	for l1 != nil || l2 != nil {
		if l1 != nil {
			current.Val += l1.Val
			l1 = l1.Next
		}

		if l2 != nil {
			current.Val += l2.Val
			l2 = l2.Next
		}

		if current.Val > 9 {
			current.Val -= 10
			current.Next = &ListNode{Val: 1}
		} else if l1 != nil || l2 != nil {
			current.Next = &ListNode{}
		}

		current = current.Next
	}

	return result
}

func main() {
	arr1 := []int{1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1}
	arr2 := []int{5, 6, 4}
	listA1 := &ListNode{}
	var listA2 *ListNode
	listB1 := &ListNode{}
	var listB2 *ListNode

	for i := 0; i < len(arr1); i++ {
		if listA2 == nil {
			listA1.Val = arr1[i]
			listA2 = listA1
		} else {
			newList := &ListNode{
				Val:  arr1[i],
				Next: nil,
			}

			listA2.Next = newList
			listA2 = newList
		}
	}

	for i := 0; i < len(arr2); i++ {
		if listB2 == nil {
			listB1.Val = arr2[i]
			listB2 = listB1
		} else {
			newList := &ListNode{
				Val:  arr2[i],
				Next: nil,
			}

			listB2.Next = newList
			listB2 = newList
		}
	}

	fmt.Println(addTwoNumbers(listA1, listB1))
}
