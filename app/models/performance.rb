class Performance < ApplicationRecord
  belongs_to :user

  has_one_attached :video
  has_one_attached :sound

  validates :title, presence: true, length: {maximum: 255}

  enum boin_status: {
    boin_2: 0,
    boin_3: 1,
    boin_4: 2,
    boin_5: 3,
    boin_6: 4
  }

  def video_url
    video.attached? ? Rails.application.routes.url_helpers.rails_blob_path(video, only_path: true) : nil
  end

  def sound_url
    sound.attached? ? Rails.application.routes.url_helpers.rails_blob_path(sound, only_path: true) : nil
  end
end
