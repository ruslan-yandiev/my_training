package main

import (
	"fmt"
)

type Parent struct {
	Name     string
	Children []Child
}

type Child struct {
	Name string
	Age  int
}

func main() {
	cp := CopyParent(nil) // Parent{}

	p := &Parent{
		Name: "Harry",
		Children: []Child{
			{
				Name: "Andy",
				Age:  18,
			},
		},
	}

	cp = CopyParent(p)

	// при мутациях в копии "cp"
	// изначальная структура "p" не изменяется
	cp.Children[0] = Child{}
	fmt.Println(p.Children) // [{Andy 18}]

}

func CopyParent(p *Parent) Parent {
	if p == nil {
		return Parent{}
	}

	children := make([]Child, len(p.Children))
	copy(children, p.Children)

	return Parent{
		Name:     p.Name,
		Children: children,
	}
}
