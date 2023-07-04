package main

func main() {
	var t interface {
		talk() string
	}

	type martian struct{}
}
