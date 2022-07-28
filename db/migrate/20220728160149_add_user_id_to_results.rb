class AddUserIdToResults < ActiveRecord::Migration[6.0]
  def change
    add_reference :results, :user, foreign_key: true
  end
end
