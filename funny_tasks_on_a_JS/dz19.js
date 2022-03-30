// /*
// Напишите функцию, replaceItems(arr, item, replaceItem) которая находит все
// элементы массива arr, равные item и возвращает новый массив, в котором на
// месте найденных значений стоит replaceItem.
// */

// function replaceItems(arr, item, replaceItem) {
// 	for (let i = 0; i < arr.length; i++) {
// 		if (arr[i] === item) arr[i] = replaceItem;
// 	}
// 	return arr;
// }

// console.log(replaceItems([1,2,3,4,2], 2, 'a')); //  [1,'a',3,4,'a']

// // №2 фукционально.
function replaceItems2(arr, item, replaceItem) {
	return arr.map((elem, index) => elem === item ? replaceItem : elem)
}

console.log(replaceItems2([1,2,3,4,2], 2, 'a')); //  [1,'a',3,4,'a']

//* ===========================================================================
/*
Имеется массив чисел, все числа повторяются по три раза, а одно нет. Нужно найти это одно уникальное.
Желательно не сортировать.
*/
// не самое быстрое решение, но вроде норм.
function single_number(nums) {
	for (let i = 0; i < nums.length; i++) {
		if (nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])) return nums[i];
	}
}

// console.log(single_number([-2, -2, 1, 1, -3, 1, -3, -3, -4, -2])); // -4
// console.log(single_number([-2, -2, 1, 1, -3, 1, -3, -3, -4, -2, -4, -4, 33])); // 33
// console.log(single_number([-2, -2, 1, 0, 1, -3, 1, -3, -3, -4, -2, -4, -4, 33, 33, 33])); // 0

function replaceItems(arr, item, replaceItem) {
    return arr.reduce((acc, el, index) => {
        el === item ? acc.push(replaceItem) : acc.push(el)
        return acc;
    }, []);
}

console.log(replaceItems([1,2,3,4,2], 2, 'a')); //  [1,'a',3,4,'a']

// * ===============================================================================================================
/*
Дан массив вида `[1, 2, [3,4,[5]], 6, 7, [[8]]]`, необходимо получить массив
без вложенных массивов, то есть: `[1, 2, 3, 4, 5, 6, 7, 8]`.
*/
let arr = [1, 2, [3, 4, [5]], 6, 7, [[8]]];

//! решение 1, некорректное
function compact(arr) {
	return [...[].concat.apply([], arr).join('')].map(e => +e);
}

console.log(compact(arr));

// решение 5
function compact(arr) {
    return arr.reduce((acc, el) => {
        Array.isArray(el) ? acc.push(...compact(el)) : acc.push(el);
        return acc
    }, [])
}

console.log(compact(arr));

// решение 2
function compact2(arr) {
	const newArr = [];

	function extractElement(arg) {
		for (let i = 0; i < arg.length; i++) {
			if (Array.isArray(arg[i])) {
				extractElement(arg[i]);
			} else {
				newArr.push(arg[i]);
			}
		}
		return newArr;
	}

	return extractElement(arr);
}

console.log(compact2(arr));

// решение 3
function compact3(arr) {
	return arr.flat(Infinity);
}

console.log(compact3(arr));

// решение 4
function compact4(arr) {
	return arr.toString().split(",").map(x => x);
}

console.log(compact4(arr));
// * ======================================================================================================

const obj = {
	str: "hello",
	a() {
		console.log(this.str);
	}
};

console.log(obj.a()); // hello
let temp = obj.a;
console.log(temp()); // undefined (контекст потерян)

// ! ну или сразу при присвоении забиндить let temp = obj.a.bind(obj); console.log(temp());
console.log(temp.bind(obj)()); // hello (вручную присвоим контекст, bind вернет функцию)

// * ===========================================================================
/*
	leetcode.com №4 
	сложность: Hard
	общая сложность времени выполнения должна быть O(log (m+n)).

	Основное условие: Имеются два отсартированных массива, длинною m и n. вернуть медианное значение двух отсортированных массивов. 

	Ограничения:
	nums1.length == m
	nums2.length == n
	0 <= m <= 1000
	0 <= n <= 1000
	1 <= m + n <= 2000
	-106 <= nums1[i], nums2[i] <= 106
*/
function findMedianSortedArrays(nums1, nums2) {
    const arr = [...nums1, ...nums2]; // nums1.concat(nums2) - будет быстрее чем [...nums1, ...nums2]
    const size = arr.length;

    // сортировка вставками
    for (let i = 0; i < size; i++) {
    	for (let j = i; arr[j] <  arr[j - 1]; j--) {
    		[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
    	}
    }

    const mid = Math.floor(size / 2);

    return size % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 192 ms, faster than 17.52% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 45.1 MB, less than 56.31% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

// console.log(findMedianSortedArrays([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
// console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
// console.log(findMedianSortedArrays([0, 0], [0, 0])); // 0,00000
// console.log(findMedianSortedArrays([], [1])); // 1.00000
// console.log(findMedianSortedArrays([2], [])); // 2.00000

// более быстрый вариант за счет сортировки слиянием
function findMedianSortedArrays2(nums1, nums2) {
    const arr = nums1.concat(nums2); // nums1.concat(nums2); concat быстрее будет чем [...nums1, ...nums2]
    const size = arr.length;

    function sortMerge(arr) {
    	if (arr.length > 1) {
    		const mid = Math.floor(arr.length / 2);
    		let left = arr.slice(0, mid);
    		let right = arr.slice(mid);

    		sortMerge(left);
    		sortMerge(right);

    		let l = r = k = 0;

    		while(l < left.length && r < right.length) {
    			if (left[l] <= right[r]) {
    				arr[k] = left[l];
    				l++;
    			} else {
    				arr[k] = right[r];
    				r++;
    			}
    			k++;
    		}

    		while(l < left.length) {
    			arr[k] = left[l];
    			l++;
    			k++;
    		}

    		while(r < right.length) {
    			arr[k] = right[r];
    			r++;
    			k++;
    		}
    	}
    	return arr;
    }

    sortMerge(arr);

    const mid = Math.floor(size / 2);

    return size % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 144 ms, faster than 44.45% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 45.9 MB, less than 20.54% of JavaScript online submissions for Median of Two Sorted Arrays.

	Runtime: 136 ms, faster than 69.59% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 47.8 MB, less than 16.56% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

// console.log(findMedianSortedArrays2([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
// console.log(findMedianSortedArrays2([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
// console.log(findMedianSortedArrays2([0, 0], [0, 0])); // 0,00000
// console.log(findMedianSortedArrays2([], [1])); // 1.00000
// console.log(findMedianSortedArrays2([2], [])); // 2.00000

// Еще быстрее вариант, не мое решение
function findMedianSortedArrays3(nums1, nums2) {
	let m = nums1.length;
    let n = nums2.length;
    let a=0,b=0;

    for(let k=0;k<(m+n+1)/2;k++){
        let i = nums1[0];
        let j = nums2[0];
        a=b;
        if(i!=undefined && (j==undefined ||i<j)){
            b = nums1.shift();
        }
        else {
            b = nums2.shift();
        }
    }  
    return (m+n)%2===0 ? (a+b)/2:b;

    	// * еще вариант
	  // const len = nums1.length + nums2.length;
	  // const nums = [];
	  // let l = 0, r = 0;
	  // // Merge arrays
	  // while (nums.length < len) {
	  //   if (nums1[l] < nums2[r] || r >= nums2.length) {
	  //     nums.push(nums1[l++]);
	  //   }
	  //   else if (nums1[l] >= nums2[r] || l >= nums1.length) {
	  //     nums.push(nums2[r++]);
	  //   }
	  // }
	  // // Calculate and return median
	  // return (len % 2
	  //   ? nums[Math.floor(len / 2)]
	  //   : (nums[len / 2 - 1] + nums[len / 2]) / 2);
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 132 ms, faster than 81.05% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 43.2 MB, less than 94.27% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

// console.log(findMedianSortedArrays3([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
// console.log(findMedianSortedArrays3([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
// console.log(findMedianSortedArrays3([0, 0], [0, 0])); // 0,00000
// console.log(findMedianSortedArrays3([], [1])); // 1.00000
// console.log(findMedianSortedArrays3([2], [])); // 2.00000

// Самый быстрый вариант  !!!!
function findMedianSortedArrays4(nums1, nums2) {
    const arr = nums1.concat(nums2).sort((a, b) => a - b);
    const size = arr.length;

    const mid = Math.floor(size / 2);

    return size % 2 === 0 ? (arr[mid - 1] + arr[mid]) / 2 : arr[mid];
};
/*
	Данное решение прошло успешно тесты на leetcode.com
	Аналитическая оценка:
	Runtime: 128 ms, faster than 90.49% of JavaScript online submissions for Median of Two Sorted Arrays.
	Memory Usage: 44.8 MB, less than 61.71% of JavaScript online submissions for Median of Two Sorted Arrays.
*/

// console.log(findMedianSortedArrays4([1, 3], [2])); // 2.0000 (объединенный массив = [1,2,3] и медиана равна 2.)
// console.log(findMedianSortedArrays4([1, 2], [3, 4])); // 2,50000 (объединенный массив = [1,2,3,4], а медиана равна (2 + 3) / 2 = 2,5.)
// console.log(findMedianSortedArrays4([0, 0], [0, 0])); // 0,00000
// console.log(findMedianSortedArrays4([], [1])); // 1.00000
// console.log(findMedianSortedArrays4([2], [])); // 2.00000

// * ==============================================================================
