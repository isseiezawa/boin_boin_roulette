class AddMaxBoinToResults < ActiveRecord::Migration[6.0]
  def change
    add_column :results, :max_boin, :integer
  end
end
