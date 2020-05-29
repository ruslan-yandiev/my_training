# Given: an array containing hashes of names
# Return: a string formatted as a list of names separated by commas except for the last two names, which should be separated by an ampersand.
# Дано: массив, содержащий хэши имен
# Return: строка, отформатированная в виде списка имен, разделенных запятыми, за исключением двух последних имен, которые должны быть разделены амперсандом.
# list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])
# # returns 'Bart, Lisa & Maggie'
# Example:
# list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ]) # returns 'Bart, Lisa & Maggie'
# list([ {name: 'Bart'}, {name: 'Lisa'} ]) # returns 'Bart & Lisa'
# list([ {name: 'Bart'} ]) # returns 'Bart'
# list([]) # returns ''

def list names
  a = (names.map { |e| e.values }).join(' ').split(' ')

  if a.size > 2
    (a.select { |i| a.index(i) != a.size - 1}).join(', ') + ' & ' + a[a.size - 1]
  elsif a.size == 2
    a.join(' & ')
  else
    a.join
  end
end

p list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ])

# p list([ {name: 'Bart'}, {name: 'Lisa'} ])

# p list([ {name: 'Bart'} ])


