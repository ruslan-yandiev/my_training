# В функцию передается массив целых чисел и число r. Написать функцию которая вернет булевое значение,
# true в случае если в переданном массиве есть два числа, сумма которых равна r, иначе вернет false
def check(arr, num)
  arr.each_with_index do |e, i|
    arr.each_with_index do |el, ind|
      return true if !arr[ind + 1].nil? && e + arr[ind + 1] === num
    end
  end

  false
end

puts check([10, 15, 3, 7], 17) # => true
puts check([10, 15, 3, 7], 20) # => false