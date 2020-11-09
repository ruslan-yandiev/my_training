@arr = [2, 1, 22, 7, 15, 11, 5, 5, 2, 2, 2, 2, 4]

# ! сортировка пузырьком
def babble_function(a)
  bul = false

  loop do
    bul = false

    @arr.each_with_index do |value, index|
      if @arr[index + 1] != nil && @arr[index] > @arr[index + 1]
        @arr[index], @arr[index + 1] = @arr[index + 1], @arr[index]
        bul = true
      end
    end

    return if bul == false
  end
end

p babble_function(@arr)
p @arr