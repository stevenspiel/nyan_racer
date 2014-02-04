class Game < ActiveRecord::Base
  has_many :matches
  has_many :players, :through => :matches

  def self.send_results(player_one, player_two, lap_time, winner)
    game = Game.create
    players = [player_one, player_two]
    players.each do |player|
      this_player = Player.find_by_initials(player)
      this_player = Player.create(initials: player) if !this_player
      winner == player ? winner = true : winner = false
      this_player.matches.create(game_id: game.id, winner: winner, winning_time: lap_time)
    end
    game.id.to_s #need this as return value
  end
end
