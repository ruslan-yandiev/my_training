arr = [3, 22, 3, -1, 11, 12, 4, 1, 8, 14]

# ! Сортировка слиянием
def sort_merge(arr)
  len = arr.size

  if len > 1
    # округлим до меньшего числа
    mid = (len / 2).floor

    # сделаем копии массивов в указанных диапазонах
    left_arr = arr[0...mid]
    right_arr = arr[mid..(len - 1)]

    # применим рекурсию для разбивания массива до единичного отсортированного элемента в нем
    sort_merge(left_arr)
    sort_merge(right_arr)

    l = r = 0

    len.times do |k|
      if left_arr[l].nil?
        arr[k] = right_arr[r]
        r += 1
      elsif right_arr[r].nil?
        arr[k] = left_arr[l]
        l += 1
      elsif left_arr[l] <= right_arr[r]
        arr[k] = left_arr[l]
        l += 1
      else
        arr[k] = right_arr[r]
        r += 1
      end
    end
  end

  arr
end

p arr
p sort_merge(arr)

# * =========================================================================================

arr2 = [3, 22, 3, -1, 11, 12, 4, 1, 8, 14]
# ! Сортировка слиянием вариант 2
def sort_merge2(arr)
  len = arr.size

  if len > 1
    mid = (len / 2).floor

    left_arr = arr[0...mid]
    right_arr = arr[mid..(len - 1)]

    sort_merge2(left_arr)
    sort_merge2(right_arr)

    l = r = k = 0
    size_left, size_right = left_arr.size, right_arr.size

    while l < size_left && r < size_right
      if left_arr[l] <= right_arr[r]
        arr[k] = left_arr[l]
        l += 1
      else
        arr[k] = right_arr[r]
        r += 1
      end
      
      k += 1
    end

    # добиваем если остались
    while l < size_left
      arr[k] = left_arr[l]
      l += 1
      k += 1
    end

    # добиваем если остались
    while r < size_right
      arr[k] = right_arr[r]
      r += 1
      k += 1
    end
  end

  arr
end

p arr2
p sort_merge2(arr2)