class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :bio, :avatar, :read, :currently_reading, :want_to_read, :books
    has_many :user_books
    has_many :books, through: :user_books

    attribute :read do
      object.user_books.select do |user_book|
        user_book.shelf_type == "read"
      end
    end

    attribute :currently_reading do
      object.user_books.select do |user_book|
        user_book.shelf_type == "currentlyReading"
      end
    end

    attribute :want_to_read do
      object.user_books.select do |user_book|
        user_book.shelf_type == "wantToRead"
      end
    end
  end
