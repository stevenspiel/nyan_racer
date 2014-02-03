class Player < ActiveRecord::Base
  validates :initials, uniqueness: true
  has_many :matches
  has_many :games, :through => :matches
end
