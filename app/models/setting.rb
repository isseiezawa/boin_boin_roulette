class Setting < ApplicationRecord
  belongs_to :user

  serialize :word, Array
  validates :voice, presence: true
  validates :volume, presence: true
  validates :speed, presence: true
  validates :pitch, presence: true
end
