class Formatter

  EXTENSION = 'rb'

  attr_accessor :params

  def initialize(params)
    @params = params
  end

  def extension
    body = number_of_files(@params)
  end

  def invalid_params
    @params
  end

  def valid?
    Formatter::EXTENSION == @params
  end

  def number_of_files(params)
    Dir.glob("/home/../**/*.#{params}").size
  end
end
