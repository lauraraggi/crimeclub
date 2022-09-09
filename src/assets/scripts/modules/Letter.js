import GlitchFx from "./GlitchFx";
import { forEach } from "lodash";

class Letter {
  constructor(letter, pos) {
    this.DOM = {};
    this.DOM.letter = letter;
    this.pos = pos;
    this.imgDeath = letter.parentNode.dataset["imageDeath"] || "";
    this.imgRevolver = letter.parentNode.dataset["imageRevolver"] || "";
    this.imgs = letter.parentNode.dataset[`imagesChar-${this.pos + 1}`].split(
      ","
    );
    this.imgs.push(this.imgDeath);
    this.imgs.push(this.imgRevolver);
    let htmlstr = "";
    forEach(this.imgs, img => {
      htmlstr += `<img src="${img}"/>`;
    });

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "hiddenImages";
    imgWrapper.innerHTML = htmlstr;
    document.body.appendChild(imgWrapper);
    this.gfx = new GlitchFx(this.DOM.letter, this.imgs);
    // this.gfx.glitch();
    this.initEvents();
  }
  initEvents() {
    this.mouseenterFn = () => {
      this.gfx.stop().slideshow();
    };
    this.mouseleaveFn = () => {
      this.gfx.stopSlideshow();
      // this.gfx.glitch();
    };

    this.DOM.letter.addEventListener("mouseenter", this.mouseenterFn);
    this.DOM.letter.addEventListener("mouseleave", this.mouseleaveFn);
    this.DOM.letter.addEventListener("touchstart", this.mouseenterFn);
    this.DOM.letter.addEventListener("touchend", this.mouseleaveFn);
  }
}

export default Letter;
