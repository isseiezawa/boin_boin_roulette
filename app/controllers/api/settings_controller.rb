class Api::SettingsController < ApplicationController
  before_action :set_setting, only: %i[show update]

  def show
    render json: @setting
  end

  def update
    if @setting.update(setting_params)
      render json: @setting
    else
      render json: @setting.errors, status: :bad_request
    end
  end

  private

  def set_setting
    @setting = Setting.find_by(user_id: current_user.id)
  end

  def setting_params
    params.require(:setting).permit(word: [])
  end
end
