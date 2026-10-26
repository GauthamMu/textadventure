let gameField, inputField, flashlight;
// Variable for use in the Room classFunctions
let gameFieldText = "";
let itemsInHand = [];

let startRoom, caveEntranceRoom;

class Room {
  constructor(classFunction, options) {
    this.classFunction = classFunction;
    this.options = options;
  }
}

function startFunction(option = "", flashlight = false) {
  if (option == "cave") {
    gameFieldText = caveEntranceFunction("cave", flashlight);
  } else if (option == "flashlight") {
    flashlight = true;
    gameFieldText = `Shaking from frostbite, you flip the switch on the rustic torch you inherited from your great-great-grandfather, 
          <br>who passed away while working a railway tunnel about a century ago. Or was it two?
          <br>The light flickers.
          <br>You can now see that there are partings between the trees in the West, in the North, and in the East.
          <br><br>Options: [west, north, east, cave]`;
  } else if (option == "out") {
    currentLocation = startRoom;
    if (flashlight) {
      gameFieldText = `You are now back where you started, in a dark forest.
          <br>You see light coming out of a cave.
          <br>You also see that there are partings between the trees in the West, in the North, and in the East.
          <br><br>Options: [west, north, east, cave]`;
    } else {
      gameFieldText = `You are now back where you started, in a dark forest.
          <br>You see light coming out of a cave.
          <br>Because it's so cold, you put your hands in your pockets.
          <br>You find a flashlight.
          <br><br>Options: [cave, flashlight]`;
    }
  }
  return gameFieldText;
}

function caveEntranceFunction(option = "", flashlight = false) {
  if (option == "out") {
    startFunction("out", flashlight);
  } else if (option == "flashlight") {
    gameFieldText = `Despite you being in a rather cozy cave you shake from frostbit when you flip the switch on the rustic torch you inherited from your great-great-grandfather, 
          <br>who passed away while working a railway tunnel about a century ago. Or was it two?
          <br>The light flickers.
          <br>You can now make out bits of the title of the booklet:
          <br>"T.e f..l.ng .ra.n."
          <br><br>Options: [out, booklet, candle]`;
  } else if (!option == "cave") {
  } else if (option == "cave") {
    currentLocation = caveEntranceRoom;
    if (flashlight) {
      gameFieldText = `Flashlight in hand, you walk into the entrance area of the cave.
          <br>The faint shimmer comes from a little tea candle, someone must've lit it ahead of time.
          <br>Next to it lies a booklet. You can only make out bits of its title from where you're standing,
          <br>"T.e f..l.ng .ra.n."
          <br><br>Options: [out, booklet, candle]`;
    } else {
      gameFieldText = `You walk into the entrance area of the cave.
          <br>The faint shimmer comes from a little tea candle, someone must've lit it ahead of time.
          <br>Next to it lies a booklet. You can't make out its title, the tea light is too dim.
          <br><br>Options: [out, booklet, candle, flashlight]`;
    }
    return gameFieldText;
  }
}

startRoom = new Room(startFunction, ["cave", "flashlight"]);
caveEntranceRoom = new Room(caveEntranceFunction, [
  "out",
  "booklet",
  "candle",
  "flashlight",
]);

addEventListener("DOMContentLoaded", (event) => {
  gameField = document.getElementById("game-field");
  inputField = document.getElementById("input-field");
});

let currentLocation = startRoom;

function gameLoop() {
  let inputValue = inputField.value.toLowerCase();
  // If you entered something not in the Options of your current room
  if (inputValue == "") {
    return;
  } else if (!currentLocation.options.includes(inputValue)) {
    gameField.innerHTML += `<br><br>Supplied option "${inputValue}" invalid.`;
    inputField.value = "";
  } else {
    gameFieldText = currentLocation.classFunction(inputValue, flashlight);

    gameField.innerHTML = gameFieldText;
  }
}
