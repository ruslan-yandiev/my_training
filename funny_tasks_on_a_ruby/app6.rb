# Summation
# Write a program that finds the summation of every number from 1 to num. The number will always be a positive integer greater than 0.
# Суммирование
# Напишите программу, которая находит сумму каждого числа от 1 до num. Число всегда будет положительным целым числом больше 0.

# Например:

# summation(2) -> 3
# 1 + 2

# summation(8) -> 36
# 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8

# def summation(num)
#   sum = 1

#     if num == 2
#         num.times do
#             sum += 1
#         end
#     end

#     if num != 1 && num != 2
#         sum2 = 2
#         (num - 1).times do
#             sum += sum2
#             sum2 += 1
#         end
#     end

#   sum
# end

# def summation(num)
#   (num + 1).times.sum
# end

# def summation(num)
#   return num if num == 1
#   num += summation(num-1)
# end

# def summation(num)
#   (1..num).inject(&:+)
# end

# def summation(num)
#   (1..num).sum
# end

def summation(num)
  num * (num + 1) / 2
end

puts summation(8)