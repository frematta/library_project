require "devise/orm/active_record"
Devise.setup do |config|
  config.jwt do |jwt|
    jwt.secret = Rails.application.credentials.devise_jwt_secret_key
    jwt.dispatch_requests = [ [ "POST", %r{^/login$} ] ]
    jwt.revocation_requests = [ [ "DELETE", %r{^/logout$} ] ]
    jwt.expiration_time = 1.day
  end

  config.navigational_formats = []
end
