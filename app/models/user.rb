class User < ApplicationRecord
  include JwtToken
  authenticates_with_sorcery!
end
