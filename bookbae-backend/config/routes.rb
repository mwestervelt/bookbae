Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do

      resources :user_books
      resources :users
        post '/login', to: 'auth#create'
        get '/beef', to: 'users#beef'
      resources :books
        post '/books/search', to: 'books#search'
        resources :reviews

    end
  end

end
