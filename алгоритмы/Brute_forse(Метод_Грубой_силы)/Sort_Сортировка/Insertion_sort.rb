arr = [12, 1, 8, -3, 0, 14, 3, -2, 1]

# ! сортировка вставками
def my_method(arr)
  count = 1

  loop do
    return arr if count >= arr.size

    count2 = count

    loop do
      if arr[count2 - 1] > arr[count2]
        arr[count2 - 1], arr[count2] = arr[count2], arr[count2 - 1]
        count2 -= 1
      else
        break
      end

      break if count2 == 0
    end

    count += 1
  end
end

p my_method(arr)

# ============================================================================

arr2 = [12, 1, 8, -3, 0, 14, 3, -2, 1]

# ! сортировка вставками
def my_method2(arr)
  arr.each_with_index do |value, index|
    if index > 0 && arr[index - 1] > arr[index]
      count = index

      while count > 0
        arr[count - 1], arr[count] = arr[count], arr[count - 1] if arr[count - 1] > arr[count]
          
        count -= 1
      end
    end
  end
end

p my_method2(arr2)