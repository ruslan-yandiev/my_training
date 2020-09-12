# Имеется массив чисел, все числа посторяются по три раза, а одно нет. Нужно найти это одно уникальное. Используйте линейный алгоритм
arr = [-2,-2,1,1,-3,1,-3,-3,-4,-2]

start_time = Time.now
# def single_number(nums)
#   nums.find { |num| nums.count(num) == 1 }
# end

# Более быстрое
# def single_number(nums)
#   nums.each { |num| return num if nums.index(num) == nums.rindex(num) }
# end

# самое быстрое по скорости
def single_number(nums)
  set = nums.uniq
  diff = set.inject(:+) * 3 - nums.inject(:+)
  diff / (set.size * 3 - nums.size)
end

p single_number(arr)
puts Time.now - start_time
