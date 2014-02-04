get '/' do
  erb :index
end

post '/results' do
  # playerOne: playerOne, playerTwo: playerTwo, lapTime: lapTime, winner: player
  # create game
  game = Game.create
  # find user by initials
  playerOne = Player.find_by_initials(params[:playerOne]);
  playerTwo = Player.find_by_initials(params[:playerTwo]);

  # DEBUG
  puts "--------------------------------"
  p playerOne
  p playerTwo

  puts "----Winner----------------------"
  p params[:winner]
  who_won = Player.find_by_initials(params[:winner]).id
  p who_won

  # Save race results in each player's Match table
  playerOne.matches.create( game_id: game.id,
                            winner: who_won,
                            winning_time: params[:lapTime]
                            );
  playerTwo.matches.create( game_id: game.id,
                            winner: who_won,
                            winning_time: params[:lapTime]
                            );
end

get '/results' do
  # Implement listing of race results by user

end

post '/create_players' do
  player1 = Player.create(initials: params[:player_one])
  player2 = Player.create(initials: params[:player_two])
end
