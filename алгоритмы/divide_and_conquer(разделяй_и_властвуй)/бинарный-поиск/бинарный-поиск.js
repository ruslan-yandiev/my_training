// ! Сложность бинарного поиска O(log n):

/*
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
найти 2
Делим массив пополам и смотрим [1, 2, 3, 4]. Отбрасываем => [5, 6, 7, 8]
делим снова [1, 2]. Отбрасываем => [3, 4]
делим снова [2]. Отбрасываем [1]
Логорифмическая сложность поиска
*/
function myFind(arr, num) {
    if (arr.length > 1) {
        const mid = Math.floor(arr.length / 2);
        const left = arr.slice(0, mid);
        const right = arr.slice(mid);

        return num > left[left.length - 1] ? myFind(right, num) : myFind(left, num);
    }

    return arr[0];
}

console.log(myFind([1, 2, 3, 4, 5, 6, 7, 8], 8));