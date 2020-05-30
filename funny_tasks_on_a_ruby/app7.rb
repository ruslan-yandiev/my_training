# In this kata you will create a function that takes a list of non-negative integers and strings and returns a new list with the strings filtered out.
# В этом ката вы создадите функцию, которая принимает список неотрицательных целых чисел и строк и возвращает новый список с отфильтрованными строками.

# пример
# filter_list([1,2,'a','b']) == [1,2]
# filter_list([1,'a','b',0,15]) == [1,0,15]
# filter_list([1,2,'aasf','1','123',123]) == [1,2,123]

# def filter_list(l)
#   arr = l.map { |i| i if i.class == Integer }.compact
# end

# def filter_list(l)
#   l.reject { |x| x.is_a? String }
# end

# def filter_list(l)
# l.select{ |i| i.is_a?(Integer) }
# end

# def filter_list(l)
#   l.delete_if { |x| x.class == String }
# end

# def filter_list(l)
#   # return a new list with the strings filtered out
#   l.select! {  |e| e.respond_to?("abs") }
# end

# def filter_list(l)
#   l.grep_v(String)
# end

# def filter_list(l)
#   l.reject { |l| l =~ /\A[a-z]|[0-9]\z/ }
# end

def filter_list(l)
 l.grep(Numeric)
end

p filter_list([1,2,'aasf','1','123',123]) == [1,2,123]

