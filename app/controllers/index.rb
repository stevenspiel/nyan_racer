get '/' do
  erb :index
end

post '/results' do
  Game.send_results(params[:playerOne], params[:playerTwo], params[:lapTime], params[:winner])
end

get '/results/:game_id' do
  @match = Match.where('game_id = ?', params[:game_id]).to_a
  erb :results
end
