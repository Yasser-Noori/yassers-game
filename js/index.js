// Connect to the server
var address = "https://server-djwxqxfveu.now.sh";
var socket = io(address);

socket.set('player', player, function() {
  // callback is called when variable is successfully stored
  console.log('player has been stored');
});

player();

socket.on("connect", function () {
  return socket.emit('newPlayer');
});
socket.on("state", render);

// Render the Game
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function render(players) {
  // Clear prior frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw players
  ctx.fillStyle = "red";
  for (id in players) {
    var player = players[id];
    ctx.fillRect(player.x, player.y, 50, 50);
  }
}

// Movement
var movement = {
  up: false,
  left: false,
  right: false,
  down: false
};

function broadcastMovement() {
  socket.emit("movement", movement);
  socket.alert("test");
}

  socket.emit("movement", movement);

// Controls

var keymap = {
  87: "up",
  65: "left",
  83: "down",
  68: "right"
};

function keydown(event) {
  var direction = keymap[event.keyCode];
  if (direction) movement[direction] = true;
}

function keyup(event) {
  var direction = keymap[event.keyCode];
  if (direction) movement[direction] = false;
}

window.addEventListener("keydown", keydown);
window.addEventListener("keyup", keyup);

setInterval(broadcastMovement, 1000 / 60);
