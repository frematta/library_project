Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:5173", "http://localhost:3001", "*" # adjust as needed

    resource "*",
      headers: :any,
      expose: [ "Authorization" ],
      methods: [ :get, :post, :options, :delete, :put, :patch ],
      max_age: 600
  end
end
