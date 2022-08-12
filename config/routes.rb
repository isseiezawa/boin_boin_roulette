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
    resources :performances, only: %i[index create show], param: :boin_status
  end

  get '*path', to: 'home#index', constraints: lambda { |req|
    # 'rails/active_storage'が含まれているパスはリダイレクト対象外にする
    req.path.exclude? 'rails/active_storage'
  }
end
