class Api::PerformancesController < ApplicationController
  before_action :authenticate!

  def index
    @performances = Performance.all.includes(:user)
    render json: @performances, methods: [:video_url]
  end

  def show
    @performance = Performance.find_by(boin_status: params[:status_id])

    render json: @performance, methods: [:video_url]
  end

  def create
    @performance = current_user.performances.build()
    @performance.title = performance_params[:title]
    @performance.boin_status = performance_params[:boin_status].to_i
    @performance.video = performance_params[:video]

    if @performance.save
      render json: @performance, methods: [:video_url]
    else
      render json: @performance.errors, status: :bad_request
    end
  end

  private

  def performance_params
    params.require(:performance).permit(:title, :boin_status, :video)
  end
end
