class Api::PerformancesController < ApplicationController
  before_action :authenticate!

  def index
    @performances = Performance.all.includes(:user)
    render json: @performances
  end

  def show
    @performance = Performance.find_by(boin_status: params[:status_id])

    render json: @performance
  end

  def create
    @performance = current_user.performances.build(performance_params)

    if @performance.save
      render json: @performance
    else
      render json: @performance.errors, status: :bad_request
    end
  end

  private

  def performance_params
    params.require(:performance).permit(:title, :boin_status, :performance)
  end
end
