# Новый фильм "Мстители" только что вышел! В кассе кинотеатра много людей, стоящих в огромной очереди. Каждый из них имеет один 100, 50или 25купюру. Билет "Мстители" стоит 25 dollars.
# Вася сейчас работает клерком. Он хочет продать билет каждому человеку в этой линии.
# Может ли Вася продать билет каждому человеку и дать сдачу, если у него изначально нет денег и он продает билеты строго в порядке очереди людей?
# Вернитесь YES, если Вася сможет продать билет каждому человеку и дать сдачу со счетами, которые у него есть на тот момент. В противном случае вернитесь NO.
# Примеры:
# tickets([25, 25, 50]) # => YES
# tickets([25, 100]) # => NO. Vasya will not have enough money to give change to 100 dollars
# tickets([25, 25, 50, 50, 100]) # => NO. Vasya will not have the right bills to give 75 dollars of change (you can't make two bills of 25 from one of 50)

def tickets(people)
  a = []
  b = 'NO'
  people = people.compact

  people.each do |v|
    if v == 25
      a << v
      b = 'YES'
    elsif v == 50 && a.include?(25)
      a.delete_at(a.index(25))
      a << v
      b = 'YES'
    elsif v == 100 && people.size == 1
      return 'NO'
    elsif v == 100 && a.include?(25) && a.include?(50)
      a.delete_at(a.index(25))
      a.delete_at(a.index(50))
      b = 'YES'
    elsif v == 100 && a.reduce(:+)&.==(75) && !a.include?(50)
      3.times { a.delete_at(a.index(25)) }
      b = 'YES'
    else
      return 'NO'
    end
  end
  b
end

# def tickets(people)
#   a = b = 0
#   people.all? { |e| e == 25 ? a += 1 : e == 50 ? a < 1 ? false :(b += 1; a -= 1) : a * b > 0 ? (a-=1; b-=1) : a > 2 ? a -= 3 : false } ? "YES" : "NO"
# end

# def tickets(people)
#   bills_25, bills_50 = 0, 0

#   people.each { |v|
#     if v == 25
#       bills_25 += 1        # keep the 25
#     elsif v == 50 and bills_25 > 0
#       bills_50 += 1        # keep the 50
#       bills_25 -= 1        # return 25
#     elsif v == 100 and (bills_25 >= 3 or (bills_50 > 0 and bills_25 > 0))
#       if bills_50 > 0
#         bills_50 -= 1    # return 50
#         bills_25 -= 1    # return 25
#       else
#         bills_25 -= 3    # return 3x25
#       end
#     else
#       return "NO"
#     end
#   }
#   "YES"
# end

# def tickets(people)
#   people.each_with_object({25=>0, 50=>0, 100=>0}) do |bill, cash|
#     if bill == 25
#       cash[25] += 1
#     elsif bill == 50
#       if cash[25] > 0
#         cash[25] -= 1
#         cash[50] += 1
#       else
#         return 'NO'
#       end
#     else
#       if cash[50] > 0 && cash[25] > 0
#         cash[25] -= 1
#         cash[50] -= 1
#         cash[100] += 1
#       elsif cash[25] >= 3
#         cash[25] -= 3
#         cash[100] += 1
#       else
#         return 'NO'
#       end
#     end
#   end
#   return 'YES'
# end

# def tickets(people)
#   people.each_with_object(25 => 0, 50 => 0, 100 => 0) do |bill, cash_register|
#     cash_register[bill] += 1
#     cash_register[25] -= 1 if bill != 25
#     if bill == 100
#       if cash_register[50] >= 1
#         cash_register[50] -= 1
#       elsif cash_register[25] -= 2
#       end
#     end
#     return 'NO' if cash_register.values.any?(&:negative?)
#   end
#   'YES'
# end

# p tickets([25, 25, 25, 25, 25, 100, 100]) # no

# p tickets([25,25,50,100,25,50,25,100,25,25,25,100]) # yes

# p tickets([25,25,25,100,25,25,50,100,25,25,25,100]) # yes

# p tickets([25, 25, 25, 25, 25, 25, 25, 50, 50, 50, 100, 100, 100, 100]) # => no

# p tickets([25, 25, 50]) # yes

# p tickets([25, 100]) # no

# p tickets([25, 25, 50, 50, 100]) #no

# p tickets([25, 50, 25, 100]) # yes

# p tickets([25, 50, 50]) # no

# p tickets([25, 25, 25, 100]) # yes

# p tickets([25, 25, 25, 25, 25, 50, 100]) # yes

# p tickets([25, 100]) # no

# p tickets([nil, 50, 25]) # no

# p tickets([100, nil, 50, 25]) # no
