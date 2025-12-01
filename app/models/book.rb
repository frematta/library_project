# == Schema Information
#
# Table name: books
#
#  id           :integer          not null, primary key
#  author       :string
#  genre        :string
#  isbn         :string
#  title        :string
#  total_copies :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Book < ApplicationRecord
end
