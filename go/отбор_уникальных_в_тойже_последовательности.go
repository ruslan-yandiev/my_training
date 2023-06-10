package main

import "fmt"

func main() {
	arr := []int64{33, 103, 1, 2, 0, 8, 111, 9, 9, 9, 9, 9, 9, 9, 9, 9, 55, 9, 10, 0, 0, 33, 1}
	fmt.Println(UniqueUserIDs(arr))
}

func UniqueUserIDs(userIDs []int64) []int64 {
	// пустая структура struct{} — это тип данных, который занимает 0 байт
	// используется, когда нужно проверять в мапе только наличие ключа
	processed := make(map[int64]struct{})

	uniqUserIDs := make([]int64, 0)

	for _, uid := range userIDs {
		_, ok := processed[uid]

		if ok {
			continue
		}

		uniqUserIDs = append(uniqUserIDs, uid)
		processed[uid] = struct{}{}
	}

	return uniqUserIDs
}

// ======================================================================================================

func UniqueUserIDs2(userIDs []int64) []int64 {
	uniqUserIDs := make([]int64, 0)
	detect := make(map[int64]struct{})

	for i := 0; i < len(userIDs); i++ {

		_, ok := detect[userIDs[i]]

		if ok {
			continue
		}

		uniqUserIDs = append(uniqUserIDs, userIDs[i])
		detect[userIDs[i]] = struct{}{}
	}

	return uniqUserIDs
}

// ======================================================================================================

func UniqueUserIDs3(userIDs []int64) []int64 {
	hrr := make(map[int64]int64, len(userIDs))
	arr := make([]int64, 0)
	index := int64(1)

	for i := 0; i < len(userIDs); i++ {
		if hrr[userIDs[i]] == 0 {
			hrr[userIDs[i]] = index
			index++
			arr = append(arr, userIDs[i])
		}
	}

	return arr
}

// ======================================================================================================

func UniqueUserIDs4(userIDs []int64) []int64 {
	hrr := make(map[int64]int64, len(userIDs))
	index := int64(1)

	for i := 0; i < len(userIDs); i++ {
		if hrr[userIDs[i]] == 0 {
			hrr[userIDs[i]] = index
			index++
		}
	}

	arr := make([]int64, len(hrr), len(hrr))

	for key, value := range hrr {
		arr[value-1] = key
	}

	return arr
}
