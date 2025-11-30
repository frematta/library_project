# frozen_string_literal: true

class Api::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: { user: resource, message: "Signed up successfully" }, status: :ok
  end
end
