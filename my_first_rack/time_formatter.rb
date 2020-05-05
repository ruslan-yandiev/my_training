# frozen_string_literal: true

class TimeFormatter
  DEFINITION = { 'year' => '%Y', 'month' => '%m',
                 'day' => '%d', 'hour' => '%H',
                 'minute' => '%m', 'second' => '%S' }.freeze

  attr_reader :params

  def initialize(params)
    @params = params.split(',')
  end

  def time
    body = params.reduce('') { |accumulation, param| accumulation << DEFINITION[param] }
    body = body.split('').join('-')
    Time.now.strftime(body)
  end

  def invalid_params
    params - DEFINITION.keys
  end

  def valid?
    invalid_params.empty?
  end
end
