class Result < ApplicationRecord
  belongs_to :user

  validates :word, presence: true

  enum max_boin: {
    boin_2: 0,
    boin_3: 1,
    boin_4: 2,
    boin_5: 3,
    boin_6: 4
  }
end
