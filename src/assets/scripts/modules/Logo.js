const charming = require("charming");
import Letter from "./Letter";
import imagesLoaded from "imagesloaded";
import { forEach } from "lodash";

class Logo {
  constructor(words) {
    this.words = words;
    this.layout();
  }

  layout() {
    forEach(this.words, word => {
      charming(word, { classPrefix: "letter" });
      forEach(
        word.querySelectorAll("span"),
        (letter, pos) => new Letter(letter, pos)
      );
    });
    imagesLoaded(document.querySelectorAll("div.hiddenImages > img"), () =>
      document.body.classList.remove("loading")
    );
  }
}

export default Logo;
