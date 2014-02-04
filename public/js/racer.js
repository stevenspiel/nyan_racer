var race = function(){
  $(document).on('keyup', function(event) {
    if(event.keyCode === 65) { //a
      advancePlayer("1");
    }
    if(event.keyCode === 74) { //j
      advancePlayer("2");
    }
  });
}

var advancePlayer = function(player) {
  active = $("#player" + player + "_strip>td.active");
  active.removeClass("active");
  active.addClass("trail");
  active.next().addClass("active");
  if ($("#player" + player + "_strip>td:last").hasClass("active")) {
    var endingTime = $.now()
    console.log(player);
    if(player === "1"){
      winner = playerOne;
    } else if(player === "2") {
      winner = playerTwo;
    }
    lapTime = (endingTime - startingTime) / 1000
    console.log(winner)
    $.ajax({
      type: "POST",
      url: "/results",
      data: {playerOne: playerOne, playerTwo: playerTwo, lapTime: lapTime, winner: winner},
      success: function(e){
        alert(winner + " wins!\n\nWith a finsh time of " + lapTime + " seconds\n");
        window.location.href = "/results/" + e;
      },
      error: function(e){
        window.location.reload();
      }
    });
  }
}

function initializaPlay() {
  var timeOut = setTimeout(initializaPlay, 1000);
  $('#countdown').html(time);
  if(time === 0){
    $('#countdown').html("");
    clearTimeout(timeOut);
    startingTime = $.now();
    console.log(startingTime);
    race();
  }
  time--;
}

$(document).ready(function() {
  $('#countdown').css("font-size", ($(document).height() / 2) + "px" );
  $('.racer_table td').css("height", $('.racer_table td').width());
  $('#start').click(function(){
    playerOne = $('#player1').val();
    playerTwo = $('#player2').val();
    time = 3;
    initializaPlay();
  });
});

$(window).resize(function() {
  $('#countdown').css("font-size", ($(document).height() / 2) + "px" );
  $('.racer_table td').css("height", $('.racer_table td').width())
});