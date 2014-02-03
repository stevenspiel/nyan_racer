get '/' do
  erb :index
end

post '/results' do
  # playerOne: playerOne, playerTwo: playerTwo, lapTime: lapTime, winner: player
  #create game
  game = Game.create
  # find user by initials
  playerOne = Player.find_by_initials(params[:playerOne]);
  playerTwo = Player.find_by_initials(params[:playerTwo]);
  puts playerOne
  winner = Player.find_by_initials(params[:winner])
  playerOne.matches.create( game_id: game.id,
                            winner: winner,
                            winning_time: params[:lapTime]
                            );
  playerTwo.matches.create( game_id: game.id,
                            winner: params[:winner],
                            winning_time: params[:lapTime]
                            );
end

get '/results' do

end

post '/create_players' do
  player1 = Player.create(initials: params[:player_one])
  player2 = Player.create(initials: params[:player_two])
end
