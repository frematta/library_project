class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :role)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :role)
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: resource, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
