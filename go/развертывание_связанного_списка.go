package main

import "fmt"

// Одна из самых популярных структур в алгоритмическом программировании — это связный список (linked list).
// Эта структура используется как основа для стеков и очередей, графов, хранения связанных данных в больших количествах.
// Реализуйте метод func (head *ListNode) Reverse() *ListNode, который возвращает развернутый связный список.
// Учтите, что исходный список не должен измениться.
// ListNode is a node of a linked list.
type ListNode struct {
	Next *ListNode
	Val  int
}

func main() {
	// связный список вида: 1 -> 2
	list := &ListNode{
		Next: &ListNode{
			Next: &ListNode{
				Next: nil,
				Val:  30,
			},
			Val: 20,
		},
		Val: 10,
	}

	reversed := list.Reverse() // 2 -> 1
	fmt.Println(reversed)

	fmt.Println(list) // 1 -> 2, то есть исходный список не изменился
}

func (head *ListNode) Reverse() *ListNode {
	if head == nil {
		return nil
	}

	var result *ListNode
	current := head

	for current != nil {
		result = &ListNode{
			Next: result,
			Val:  current.Val,
		}

		current = current.Next
	}

	return result
}
