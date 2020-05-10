require_relative 'formatter'

class App
  def call(env)
    perform_response(env)
  end

  def perform_response(env)
    request = Rack::Request.new(env)

    path = request.path
    request_params = request.params['format']

    if path != '/ruby'
      return [404, headers, ["404\n"]]
    elsif request_params.nil?
      return [400, headers, ["invalid_format_name\n"]]
    end

    formatter = Formatter.new(request_params)

    if formatter.valid?
      body = formatter.extension
      status = 200
    else
      invalid_params = formatter.invalid_params
      status = 400
    end
    [status, headers, ["С расширением #{ormatter::EXTENSION} всего файлов: #{body}\n"]]
  end

  def headers
    { 'Content-Type' => 'text/plain' }
  end
end
