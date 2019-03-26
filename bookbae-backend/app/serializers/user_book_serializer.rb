class UserBookSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :book_id, :shelf_type
  
  belongs_to :user
  belongs_to :book
end
