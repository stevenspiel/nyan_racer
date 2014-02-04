// $(document).ready(function() {
//   var player1 = new Player("jim");
//   var player2 = new Player("anne");

//   var game = new Game(player1, player2);

//   $(document).on('keyup', function(event) {
//     game.onKeyUp(event.which);
//   });
// });

$(document).ready(function() {
  $('#countdown').css("font-size", ($(document).height() / 2) + "px" );
  $('.racer_table td').css("height", $('.racer_table td').width());
  $('#start').click(function(){
    Game.playerOne = $('#player1').val();
    Game.playerTwo = $('#player2').val();
    Game.initializePlay(); //GET IT ONNNNNN!
  });
});

$(window).resize(function() {
  $('#countdown').css("font-size", ($(document).height() / 2) + "px" );
  $('.racer_table td').css("height", $('.racer_table td').width());
});

// var players = function(name){


// this.name = name;
// this.advance = function(){}

// }
// var bob = new player('bob')


Game = {
  initialize: function(){
    this.countdown = 3;
    this.hideRace();
    this.startingTime = 0;
  },
  hideRace: function () {
    $('.racer_table').hide();
  },
  initializePlay: function() {
    $('.racer_table').show();
    $('#name-input').hide();
    this.renderCountdown(this.countdown);
  },
  renderCountdown: function(count) {
    var check = function() {
      if(count === 0){
        $('#countdown').html("");
        Game.startingTime = $.now();
        Game.enableRace();
      } else {
        $('#countdown').html(count);
        setTimeout(check, 1000);
        console.log(count);
        count--;
      }
    }
    check();
  },
  enableRace: function(){
    console.log("got here")
    $(document).on('keyup', function(event) {
      if(event.keyCode === 65) { //a
        Game.advancePlayer("1");
      }
      if(event.keyCode === 74) { //j
        Game.advancePlayer("2");
      }
    });
  },
  advancePlayer: function(player) {
    active = $("#player" + player + "_strip>td.active");
    active.removeClass("active");
    active.addClass("trail");
    active.next().addClass("active");
    if ($("#player" + player + "_strip>td:last").hasClass("active")) {
      this.endingTime = $.now()
      console.log(player);
      if(player === "1"){
        Game.winner = Game.playerOne;
      } else if(player === "2") {
        Game.winner = Game.playerTwo;
      }
      Game.lapTime = (this.endingTime - this.startingTime) / 1000
      console.log(Game.winner)
      $.ajax({
        type: "POST",
        url: "/results",
        data: {playerOne: Game.playerOne,
               playerTwo: Game.playerTwo,
               lapTime: Game.lapTime,
               winner: Game.winner
              },
        success: function(e){
          alert(Game.winner + " wins!\n\nWith a finsh time of " + Game.lapTime + " seconds\n");
          window.location.href = "/results/" + e;
        },
        error: function(e){
          window.location.reload();
        }
      });
    }
  }
}
