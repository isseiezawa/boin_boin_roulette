class CreateResults < ActiveRecord::Migration[6.0]
  def change
    create_table :results do |t|
      t.string :word, null: false

      t.timestamps
    end
  end
end
