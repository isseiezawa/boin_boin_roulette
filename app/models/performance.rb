class Performance < ApplicationRecord
  belongs_to :user

  has_one_attached :video

  validates :title, presence: true

  enum boin_status: {
    boinboin: 0,
    boinboinboin: 1,
    boinboinboinboin: 2,
    boinboinboinboinboin: 3,
    boinboinboinboinboinboin: 4
  }
end
