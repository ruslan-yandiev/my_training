package main

import "fmt"

func main() {
	//! В golang нет передачи параметров по ссылке - параметры всегда передаются по значению, т.е. копируются.
	//! Оператор & - это взятие адреса переменной, т.е. передача указателя, а не передача параметра по ссылке,
	//! т.е. как частный случай по значению передаются указатели. map, slice - тоже передаются по значению,
	//! просто у них внутри указатели и происходит копирование указателей, а не содержимого таблицы/среза.

	a := 1
	b := &a
	c := &b

	fmt.Printf("%p %p %p\n", &a, &b, &c) // 0xc000018030 0xc00000e028 0xc00000e030
	// ================================================================================

	answer := 42
	fmt.Println(&answer) // Выводит: 0x1040c108

	address := &answer
	fmt.Println(*address) // Выводит: 42
	// ================================================================================

	answer2 := 42
	address2 := &answer2

	fmt.Printf("address это %T\n", address2) // Выводит: address это *int
	// ================================================================================

	canada := "Canada"

	var home *string
	fmt.Printf("home is a %T\n", home) // Выводит:  home is a *string

	home = &canada
	fmt.Println(*home) // Выводит: Canada
	//! Звездочка перед типом обозначает тип указателя, а звездочка перед названием переменной нужна для указания на значение, к которому отсылается указатель.
	// ======================================================================================

	var administrator *string

	scolese := "Christopher J. Scolese"
	administrator = &scolese
	fmt.Println(*administrator) // Выводит: Christopher J. Scolese

	bolden := "Charles F. Bolden"
	administrator = &bolden
	fmt.Println(*administrator) // Выводит: Charles F. Bolden

	bolden = "Charles Frank Bolden Jr."
	fmt.Println(*administrator) // Выводит: Charles Frank Bolden Jr.

	// Можно разыменовать administrator для непрямого изменения значения bolden:
	*administrator = "Maj. Gen. Charles Frank Bolden Jr."
	fmt.Println(bolden) // Выводит: Maj. Gen. Charles Frank Bolden Jr.

	// Результатом присваивания major к administrator является новый указатель, что также указывает на строку bolden.
	major := administrator
	*major = "Major General Charles Frank Bolden Jr."
	fmt.Println(bolden) // Выводит: Major General Charles Frank Bolden Jr.

	// Указатели major и administrator оба содержат один и тот же адрес памяти, следовательно, они равны:
	fmt.Println(administrator == major) // Выводит: true

	// После данного изменения administrator и major перестали указывать на одинаковый адрес памяти
	lightfoot := "Robert M. Lightfoot Jr."
	administrator = &lightfoot
	fmt.Println(administrator == major) // Выводит: false

	// Присваивание разыменованного значения major к другой переменной создает копию строки.
	// После создания клона прямые и непрямые изменения с bolden не будут иметь эффект над значением charles и наоборот:
	charles := *major
	*major = "Charles Bolden"
	fmt.Println(charles) // Выводит: Major General Charles Frank Bolden Jr.
	fmt.Println(bolden)  // Выводит: Charles Bolden

	// Если две переменные содержат одинаковую строку, они считаются равными, как в случае с charles и bolden в следующем коде.
	// Даже несмотря на то, что их адреса памяти отличаются:
	charles = "Charles Bolden"
	fmt.Println(charles == bolden)   // Выводит: true
	fmt.Println(&charles == &bolden) // Выводит: false

	aaa := "Ruslan"
	bbb := &aaa                  // будет скопирован адрес с указателем на переменную aaa
	ccc := *bbb                  // будет из памяти по адресу скопировано значение "Ruslan" у которой уже будет совой новый адрес и место в памяти
	fmt.Println(&aaa, bbb, &ccc) // 0xc000046270 0xc000046270 0xc000046280

	// В отличие от строк и чисел, перед композитными литералами ставится префикс в виде оператора адреса.
	// В следующем примере переменная timmy содержит адрес памяти, указывающий на структуру person.
	type person struct {
		name, superpower string
		age              int
	}

	timmy := &person{
		name: "Timothy",
		age:  10,
	}

	timmy.superpower = "flying"
	fmt.Printf("%+v\n", timmy) // Выводит: &{name:Timothy superpower:flying age:10}

	superpowers := &[3]string{"flight", "invisibility", "super strength"}
	// Массив автоматически разыменуется во время индексирования или создания среза. Нет необходимости писать более громоздкий (*superpowers)[0].
	fmt.Println(superpowers[0])   // Выводит: flight
	fmt.Println(superpowers[1:2]) // Выводит: [invisibility]
	//! Композитным литералам для срезов и карт также можно добавить префиксы с оператором адреса (&), однако тогда не будет автоматического разыменования.

	//* Указатели хранят адреса памяти;
	//* Оператор адреса (&) предоставляет память адреса переменной;
	//* Указатель может быть разыменован (*) для получения доступа или редактирования значения, на которое он указывает;
	//* Указателями являются типы, объявленные со звездочкой-префиксом. К примеру, *int;
	//* Используйте указатели для изменения значений через границы функций и методов;
	//* Указатели наиболее полезны со структурами и массивами;
	//* Карты и срезы неявно используют указатели;
	//* Внутренние указатели могут указать на поля внутри структур без объявления данных полей как указателей;
	//* Используйте указатели, когда в них есть смысл, но не переусердствуйте.
}
