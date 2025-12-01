require_relative "boot"
require "rails/all"

Bundler.require(*Rails.groups)

module LibraryProject
  class Application < Rails::Application
    config.load_defaults 8.1
    config.api_only = false  # IMPORTANT for Devise

    # Needed for Devise sessions/cookies
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
    config.middleware.use Rack::Cors
  end
end
