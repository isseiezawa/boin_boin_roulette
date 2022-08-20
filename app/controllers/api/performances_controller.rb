class Api::PerformancesController < ApplicationController
  before_action :authenticate!

  def index
    @performances = Performance.all.includes(:user)
    render json: @performances, methods: %i[video_url sound_url]
  end

  def show
    @performance = Performance.offset(rand(Performance.where(boin_status: params[:boin_status]).count)).first

    render json: @performance, methods: %i[video_url sound_url]
  end

  def create
    @performance = current_user.performances.build()
    @performance.title = performance_params[:title]
    @performance.boin_status = performance_params[:boin_status].to_i
    @performance.video = performance_params[:video]
    @performance.sound = performance_params[:sound]

    if @performance.save
      render json: @performance, methods: %i[video_url sound_url]
    else
      render json: @performance.errors, status: :bad_request
    end
  end

  def destroy
    @performance = Performance.find(params[:id])
    @performance.destroy!
  end

  private

  def performance_params
    params.require(:performance).permit(:title, :boin_status, :video, :sound)
  end
end
