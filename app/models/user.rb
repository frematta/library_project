# frozen_string_literal: true

class User < ApplicationRecord
  # We are using stateless JWTs, so Null revocation strategy is fine.
  devise :database_authenticatable, :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  enum :role, {
    member: 0,
    librarian: 1,
    admin: 2
  }
end
