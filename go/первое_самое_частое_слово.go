package main

func main() {

}

func MostPopularWord(words []string) string {
	hrr := make(map[string]int)
	detect := 0
	word := words[0]

	for i := len(words) - 1; i >= 0; i -= 1 {
		hrr[words[i]] += 1

		if hrr[words[i]] >= detect {
			detect = hrr[words[i]]
			word = words[i]
		}
	}

	return word
}
