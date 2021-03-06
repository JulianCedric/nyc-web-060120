class User < ApplicationRecord
  has_many :favorites
  has_many :drinks, through: :favorites

  validates :name, presence: true
end
