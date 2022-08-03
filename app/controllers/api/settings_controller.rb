class Api::SettingsController < ApplicationController
  def create
    @setting = current_user.setting.build(setting_params)

    if @setting.save
      render json: @setting
    else
      render json: @setting.errors, status: :bad_request
    end
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
    params.require(:setting).permit(:word)
  end
end
