class User < ApplicationRecord
  include JwtToken
  authenticates_with_sorcery!

  has_many :results, dependent: :destroy
  has_many :performances, dependent: :destroy
  has_one :setting, dependent: :destroy

  validates :password, length: { minimum: 3 }, if: -> { new_record? || changes[:crypted_password] }
  validates :password, confirmation: true, if: -> { new_record? || changes[:crypted_password] }
  validates :password_confirmation, presence: true, if: -> { new_record? || changes[:crypted_password] }

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
end
