type MyList struct {
	Val  int
	Next *MyList
}

// Дан сортированный связанный список. Нужно удалить дубли из списка без использования дополнительной памяти. со сложностью не выше O(n)
func deleteD(list *MyList) *MyList {
	nextList := list.Next
	current := list

	for nextList != nil {
		if current.Val != nextList.Val {
			current.Next = &MyList{
				Val:  nextList.Val,
				Next: nil,
			}

			current = current.Next
		}

		nextList = nextList.Next
	}

	return list
}

func main() {
	fmt.Println(deleteD(&MyList{1, &MyList{1, &MyList{1, &MyList{2, &MyList{2, &MyList{3, &MyList{4, &MyList{4, &MyList{4, nil}}}}}}}}})) // [1, 2, 3, 4]
}
