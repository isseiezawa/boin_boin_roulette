class Setting < ApplicationRecord
  belongs_to :user

  serialize :word, Array
end
