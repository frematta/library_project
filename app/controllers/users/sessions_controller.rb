class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      message: "Logged in successfully",
      user: resource
    }, status: :ok
  end

  def respond_to_on_destroy
    # jwt_payload = JWT.decode(request.headers["Authorization"].split(" ").last,
    #                          Rails.application.credentials.devise_jwt_secret_key).first

    # current_user = User.find(jwt_payload["sub"])

    render json: { message: "Logged out successfully" }, status: :ok
  rescue
    render json: { error: "Invalid token" }, status: :unauthorized
  end
end
