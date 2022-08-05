class AddColumnSettings < ActiveRecord::Migration[6.0]
  def change
    add_column :settings, :voice, :integer, default: 49, null: false
    add_column :settings, :volume, :float, default: 0.5, null: false
    add_column :settings, :speed, :float, default: 0.2, null: false
    add_column :settings, :pitch, :float, default: 0, null: false
  end
end
