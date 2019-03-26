class CreateUserBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :user_books do |t|
      t.references :user, foreign_key: true
      t.references :book, foreign_key: true
      t.string :shelf_type

      t.timestamps
    end
  end
end
