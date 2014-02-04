class Game < ActiveRecord::Base
  has_many :matches
  has_many :players, :through => :matches

  def self.send_results(player_one, player_two, lap_time, winner)
    game = Game.create
    puts winner
    player1 = Player.find_by_initials(player_one)
    player2 = Player.find_by_initials(player_two)

    player1 = Player.create(initials: player_one) if !player1
    player2 = Player.create(initials: player_two) if !player2

    player1.matches.create(game_id: game.id,
                           winner: winner,
                           winning_time: lap_time
                          )
    player2.matches.create(game_id: game.id,
                           winner: winner,
                           winning_time: lap_time
                          )
    game.id.to_s
  end
end
