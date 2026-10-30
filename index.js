let gameField, inputField, flashlight, booklet;
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

function startFunction(option = "") {
  switch (option) {
    case "cave":
      gameFieldText = caveEntranceFunction("cave");
      break;
    case "flashlight":
      flashlight = true;
      gameFieldText = `Shaking from frostbite, you flip the switch on the rustic torch you inherited from your great-great-grandfather, 
          <br>who passed away while working on a railway tunnel about a century ago. Or was it two centuries?
          <br>The light flickers.
          <br>You can now see that there are partings between the trees in the West, in the North, and in the East.
          <br><br>Options: [west, north, east, cave]`;
      break;
    case "out":
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
      break;
  }
  return gameFieldText;
}

function caveEntranceFunction(option = "") {
  switch (option) {
    case "out":
      gameFieldText = startFunction("out");
      break;
    case "flashlight":
      flashlight = true;
      gameFieldText = `Despite you being in a rather cozy cave you shake from frostbit when you flip the switch on the rustic torch you inherited from your great-great-grandfather, 
          <br>who passed away while working on a railway tunnel about a century ago. Or was it two centuries?
          <br>The light flickers.
          <br>You can now make out bits of the title of the booklet:
          <br>"T.e f..l.ng .ra.n."
          <br><br>Options: [out, booklet, candle]`;
      break;
    case "booklet":
      booklet = true;
      if (flashlight) {
        gameFieldText = `You reach your hand out to the cold leather shell of the booklet.
          <br>It feels weighty in your hands.
          <br>In the light of your flashlight, you now make out the entirety of the booklets' title:
          <br>"The failing brain."
          <br><br>Options: [out, candle, open]`;
      } else {
        gameFieldText = `You reach your hand out to the cold leather shell of the booklet.
          <br>It feels weighty in your hands.
          <br>In the faint light of the candle on the ground, you now make out the entirety of the bookets' title:
          <br>"The failing brain."
          <br><br>Options: [out, candle, flashlight, open]`;
      }
      break;
    case "candle":
      gameFieldText = gameOverFunction("candle");
      break;
    case "cave":
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
      break;
  }
  return gameFieldText;
}

function gameOverFunction(option = "") {
  switch (option) {
    case "restart":
      location.reload();
      break;
    case "candle":
      currentLocation = gameOverRoom;
      gameFieldText = `You walk up to the tea candle, and pick it up.
        <br>But then, you freeze in place, just like if Medusa looked you straight in the eyes!
        <br>Horror washes over you as you are, slowly but surely, engulfed in flames.
        <br><br><b>GAME OVER</b>
        <br><br>Options: [restart]`;
      break;
  }
  return gameFieldText;
}

function startOptions() {
  if (flashlight) {
    return ["west", "north", "east", "cave"];
  } else {
    return ["cave", "flashlight"];
  }
}

function caveEntranceOptions() {
  if (flashlight) {
    if (booklet) {
      return ["out", "candle", "open"];
    } else {
      return ["out", "booklet", "candle"];
    }
  } else {
    if (booklet) {
      return ["out", "candle", "flashlight", "open"];
    } else {
      return ["out", "booklet", "candle", "flashlight"];
    }
  }
}

function gameOverOptions() {
  return ["restart"];
}

startRoom = new Room(startFunction, startOptions);

caveEntranceRoom = new Room(caveEntranceFunction, caveEntranceOptions);

gameOverRoom = new Room(gameOverFunction, gameOverOptions);

addEventListener("DOMContentLoaded", (event) => {
  gameField = document.getElementById("game-field");
  inputField = document.getElementById("input-field");
});

let currentLocation = startRoom;

function gameLoop() {
  let inputValue = inputField.value.toLowerCase();
  // If you entered nothing; likely a missclick
  if (inputValue == "") {
    return;
    // If you entered something not in the Options of your current room
  } else {
    inputField.value = "";
    if (!currentLocation.options().includes(inputValue)) {
      gameField.innerHTML += `<br><br>Supplied option "${inputValue}" invalid.`;
    } else {
      gameFieldText = currentLocation.classFunction(inputValue);

      gameField.innerHTML = gameFieldText;
    }
  }
}
