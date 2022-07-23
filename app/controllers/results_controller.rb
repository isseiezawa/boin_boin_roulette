class ResultsController < ApplicationController
  def index
    @results = Result.all
    render json: @results
  end

  def create
    @result = result.new(result_params)

    if @result.save
      render json: @result
    else
      render json: @result.errors, status: :bad_request
    end
  end

  private

  def result_params
    params.require(:result).permit(:word)
  end
end
