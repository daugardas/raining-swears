var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var RainColumn = /** @class */ (function (_super) {
    __extends(RainColumn, _super);
    function RainColumn() {
        var _this = _super.call(this) || this;
        _this.className = 'letters';
        _this.createLetterDivs();
        return _this;
    }
    RainColumn.prototype.createLetterDivs = function () {
        for (var i = 0; i < 11; i++) {
            var letter = document.createElement('div');
            letter.className = "letter";
            letter.id = this.id + "-" + i;
            this.appendChild(letter);
        }
        // after creating, let it rain
        this.letItRain();
    };
    RainColumn.prototype.letItRain = function () {
        var _this = this;
        var r = new Random(); // this Random() comes from random.js library
        var randomNumber = function (min, max) {
            return r.integer(min, max);
        };
        var swearWords = ["shit", "fuck", "crybaby", "bitch", "dick", "fag", "motherfucker", "douche", "cunt", "slut", "wanker", "twat", "ass"];
        // initializing random arrays
        var currentArray = [];
        var futureArray = [];
        for (var i = 0; i < 25; i++) {
            futureArray.push(randomNumber(0, 1));
            if (i < 11)
                currentArray.push(randomNumber(0, 1)); // current array only need to have lenght of 11
        }
        this.drawRain(currentArray);
        var offset = randomNumber(10, 18); // offset used for finding out how far the next word will appear
        var wordArray = swearWords[randomNumber(0, swearWords.length - 1)].split('');
        // insert word
        for (var i = offset; i - offset < wordArray.length; i++) {
            futureArray[i] = wordArray[i - offset];
        }
        var getNewWord = false;
        setInterval(function () {
            // we have index where word started, now we can follow that offset to determine if we need a new word
            // first need to check if offset is larger than future array lenght, if yes, then the whole word is in current array
            if (offset > futureArray.length) {
                var currentOffset = offset - futureArray.length;
                // second, if current array offset is larger than length, that means the whole word disapeared, so we need another one
                if (currentOffset > currentArray.length - 1) {
                    getNewWord = true;
                }
            }
            if (getNewWord) {
                // new offset
                offset = randomNumber(10, 25);
                // select random word from swearWords array
                var wordArray_1 = swearWords[randomNumber(0, swearWords.length - 1)].split('');
                // insert word
                for (var i = offset; i - offset < wordArray_1.length; i++) {
                    futureArray[i] = wordArray_1[i - offset];
                }
                getNewWord = false;
            }
            var lastElementOfFuture = futureArray.pop();
            var lastElementOfCurrent = currentArray.pop();
            // if last element of current array is not a number, when get random number between 0 and 1
            lastElementOfCurrent = (typeof lastElementOfCurrent === "number") ? lastElementOfCurrent : randomNumber(0, 1);
            currentArray.unshift(lastElementOfFuture);
            futureArray.unshift(lastElementOfCurrent);
            offset++;
            _this.drawRain(currentArray);
        }, 350);
    };
    RainColumn.prototype.drawRain = function (arr) {
        for (var i = 0; i < 11; i++) {
            var letter = this.childNodes[i];
            letter.textContent = "" + arr[i];
        }
    };
    return RainColumn;
}(HTMLElement));
customElements.define('rain-column', RainColumn);
var generateLetterGrid = function () {
    var rainContainer = document.getElementById('curse-rain');
    for (var i = 0; i < 4; i++) {
        var rainColumn = document.createElement('rain-column');
        rainContainer.appendChild(rainColumn);
    }
};
window.onload = function () {
    generateLetterGrid();
};
