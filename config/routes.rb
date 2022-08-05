Rails.application.routes.draw do
  root 'home#index'

  namespace :api do
    resources :results, only: %i[index create]
    resource :settings, only: %i[show update]
    resources :sessions, only: %i[create]
    resources :users do
      collection do
        get 'me'
      end
    end
  end

  get '*path', to: 'home#index'
end
