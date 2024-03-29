class Api::ResultsController < ApplicationController
  def index
    @results = current_user.results.all
    render json: @results
  end

  def create
    @result = current_user.results.build(result_params)

    if @result.save
      render json: @result
    else
      render json: @result.errors, status: :bad_request
    end
  end

  private

  def result_params
    params.require(:result).permit(:word, :max_boin)
  end
end
