
class RainColumn extends HTMLElement {
  constructor() {
    super();
    this.className = 'letters';
    this.createLetterDivs();
  }

  createLetterDivs(): void {
    for (let i = 0; i < 11; i++) {
      let letter = document.createElement('div');
      letter.className = "letter";
      letter.id = `${this.id}-${i}`;

      this.appendChild(letter);
    }

    // after creating, let it rain
    this.letItRain();

  }

  letItRain(): void { // start the rain
    let r = new Random(); // this Random() comes from random.js library
    const randomNumber = (min: number, max: number): number => {
      return r.integer(min, max)
    }

    const swearWords: Array<string> = ["shit", "fuck", "crybaby", "bitch", "dick", "fag", "motherfucker", "douche", "cunt", "slut", "wanker", "twat", "ass"];

    // initializing random arrays
    let currentArray: Array<string | number> = [];
    let futureArray: Array<string | number> = [];
    for (let i = 0; i < 25; i++) {
      futureArray.push(randomNumber(0, 1));
      if (i < 11) currentArray.push(randomNumber(0, 1)); // current array only need to have lenght of 11
    }

    this.drawRain(currentArray);

    let offset = randomNumber(10, 18); // offset used for finding out how far the next word will appear
    const wordArray = swearWords[randomNumber(0, swearWords.length - 1)].split('');

    // insert word
    for (let i = offset; i - offset < wordArray.length; i++) {
      futureArray[i] = wordArray[i - offset];

    }

    let getNewWord = false;
    setInterval((): void => {
      // we have index where word started, now we can follow that offset to determine if we need a new word
      // first need to check if offset is larger than future array lenght, if yes, then the whole word is in current array
      if (offset > futureArray.length) {
        const currentOffset = offset - futureArray.length;

        // second, if current array offset is larger than length, that means the whole word disapeared, so we need another one
        if (currentOffset > currentArray.length - 1) {
          getNewWord = true;
        }
      }

      if (getNewWord) {
        // new offset
        offset = randomNumber(10, 25);

        // select random word from swearWords array
        const wordArray = swearWords[randomNumber(0, swearWords.length - 1)].split('');

        // insert word
        for (let i = offset; i - offset < wordArray.length; i++) {
          futureArray[i] = wordArray[i - offset];
        }

        getNewWord = false;
      }

      const lastElementOfFuture = futureArray.pop();
      let lastElementOfCurrent = currentArray.pop();

      // if last element of current array is not a number, when get random number between 0 and 1
      lastElementOfCurrent = (typeof lastElementOfCurrent === "number") ? lastElementOfCurrent : randomNumber(0, 1);

      currentArray.unshift(lastElementOfFuture);
      futureArray.unshift(lastElementOfCurrent);

      offset++;

      this.drawRain(currentArray);
    }, 350)
  }

  drawRain(arr: Array<string | number>): void {
    for (let i = 0; i < 11; i++) {
      let letter = this.childNodes[i];
      letter.textContent = `${arr[i]}`;
    }
  }

}

customElements.define('rain-column', RainColumn)

const generateLetterGrid = () => {
  let rainContainer = document.getElementById('curse-rain');
  for (let i = 0; i < 4; i++) {
    const rainColumn = document.createElement('rain-column');
    rainContainer.appendChild(rainColumn);
  }
}

window.onload = () => {
  generateLetterGrid();
};