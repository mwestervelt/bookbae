class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :rating, :title, :user_id, :book_id
end
