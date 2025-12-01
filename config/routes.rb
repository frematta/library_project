Rails.application.routes.draw do
  devise_for :users,
    path: "",
    path_names: {
      sign_in: "login",
      sign_out: "logout",
      registration: "signup"
    },
    controllers: {
      sessions: "users/sessions",
      registrations: "users/registrations"
    }

  get "/me", to: "users#me"
  namespace :api do
    resources :books
  end
  match "*path", to: "application#preflight", via: :options
end
