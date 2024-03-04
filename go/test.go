package main

import (
	"fmt"
)

// ! Бинарный поиск по ответу - название техники бинарного поиска
// задача "Дипломы"
// есть N дипломов размера (H x W)
// все дипломы нужно повесить на квадратной доске размера (S x S). Дипломы нельзя поворачивать
// Требуется определить минимальный размер стороны доски S, позволяющий разместить все дипломы.
func can(diplomCount, diplomHeight, diplomWidth, boardSize int) bool {
	// вычислим сколько строк и столбцов дипломов мы сможем уместить на доске
	rows := boardSize / diplomHeight
	colums := boardSize / diplomWidth

	// получаем общее количество дипломов умещающихся на доске
	return rows*colums >= diplomCount
}

func findingD(n, h, w int) int {

}

func main() {
	fmt.Println(findingD(7, 10, 5))
}
