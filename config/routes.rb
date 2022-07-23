Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :results, only: %i[index create]
  end

  get '*path', to: 'home#index'
end
