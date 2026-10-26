let gameField, inputField, flashlight;
// Variable for use in the Room classFunctions
let gameFieldText = "";

class Room {
  constructor(classFunction, options) {
    console.log(typeof classFunction);
    this.classFunction = classFunction;
    this.options = options;
  }
}

function startFunction(option = "", isArrival = false, flashlight = false) {
  // If you're leaving the starting area
  if (!isArrival) {
    if ((option = "cave")) {
      if (flashlight) {
        gameFieldText = `Flashlight in hand, you walk into the entrance area of the cave.
          <br>The faint shimmer comes from a little tea candle, someone must've lit it ahead of time.
          <br>Next to it lies a booklet. You can only make out bits of its title from where you're standing,
          <br>"T.e f..l.ng .ra.n."
          <br><br>Options: [out, book, candle]`;
      } else {
        gameFieldText = `You walk into the entrance area of the cave.
          <br>The faint shimmer comes from a little tea candle, someone must've lit it ahead of time.
          <br>Next to it lies a booklet. You can't make out its title, the tea light is too dim.
          <br><br>Options: [out, book, candle, flashlight]`;
      }
      return gameFieldText;
    }
  }
}

console.log(typeof startFunction);

const startObject = new Room(startFunction, ["cave", "flashlight"]);

addEventListener("DOMContentLoaded", (event) => {
  gameField = document.getElementById("game-field");
  inputField = document.getElementById("input-field");
});

let currentLocation = startObject;

function gameLoop() {
  let inputValue = inputField.value.toLowerCase();
  // If you entered something not in the Options of your current room
  if (!currentLocation.options.includes(inputValue)) {
    gameField.innerHTML += `<br><br>Supplied option "${inputValue}" invalid.`;
    inputField.value = "";
  } else {
    gameFieldText = currentLocation.classFunction(inputValue);

    gameField.innerHTML = gameFieldText;
  }
}
