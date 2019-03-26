class CreateBooks < ActiveRecord::Migration[5.2]
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.string :description
      t.string :image
      t.string :page_count
      t.string :published

      t.timestamps
    end
  end
end
