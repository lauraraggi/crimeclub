import { getRandomInt } from "./Helpers";

class GlitchFx {
  constructor(el, imgs) {
    this.DOM = {};
    this.DOM.el = el;
    this.imgs = imgs;
    this.totalImgs = this.imgs.length;
    this.options = {
      // Max and Min values for the time when to start the effect.
      glitchStart: { min: 500, max: 4000 },
      // Max and Min values of time that an element keeps each state.
      glitchState: { min: 50, max: 200 },
      // Number of times the glitch action is performed per iteration.
      glitchTotalIterations: 2,
      // The imgs slideshow interval.
      slideshowInterval: 200
    };
  }
  glitch() {
    this.isInactive = false;
    clearTimeout(this.glitchTimeout);
    this.glitchTimeout = setTimeout(() => {
      this.iteration = 0;
      this.glitchState().then(() => {
        if (!this.isInactive) {
          this.glitch();
        }
      });
    }, getRandomInt(this.options.glitchStart.min, this.options.glitchStart.max));
  }
  glitchState() {
    return new Promise((resolve, reject) => {
      if (this.iteration < this.options.glitchTotalIterations) {
        this.glitchStateTimeout = setTimeout(() => {
          this.DOM.el.style.transform = `translate3d(${getRandomInt(
            -20,
            20
          )}px,${getRandomInt(-20, 20)}px,0px) rotate3d(0,0,1,${getRandomInt(
            -3,
            3
          )}deg)`;
          if (getRandomInt(0, 3) < 2) {
            this.DOM.el.style.backgroundImage = `url(${
              this.imgs[getRandomInt(0, this.totalImgs - 1)]
            })`;
            this.DOM.el.style.color = "transparent";
          } else {
            this.DOM.el.style.backgroundImage = "none";
            this.DOM.el.style.color = "";
          }

          this.iteration++;
          if (!this.isInactive) {
            this.glitchState().then(() => resolve());
          }
        }, getRandomInt(this.options.glitchState.min, this.options.glitchState.max));
      } else {
        this.reset();
        resolve();
      }
    });
  }
  stop() {
    this.isInactive = true;
    clearTimeout(this.glitchTimeout);
    clearTimeout(this.glitchStateTimeout);
    this.reset();
    return this;
  }
  reset() {
    this.DOM.el.style.transform = "translate3d(0,0,0) rotate3d(1,1,1,0)";
    this.DOM.el.style.backgroundImage = "none";
    this.DOM.el.style.color = "";
  }
  changeImage(pos) {
    return new Promise((resolve, reject) => {
      this.DOM.el.style.color = "transparent";
      this.DOM.el.style.backgroundImage = `url(${this.imgs[pos]})`;
      resolve();
    });
  }
  slideshow(pos) {
    pos = pos || 0;
    const interval = this.isSlideshowActive
      ? this.options.slideshowInterval
      : 0;
    const newpos = pos < this.totalImgs - 1 ? pos + 1 : 0; // Tweak here how many images should be on the slideshow
    this.slideshowTimeout = setTimeout(
      () => this.changeImage(pos).then(() => this.slideshow(newpos)),
      interval
    );
    this.isSlideshowActive = true;
  }
  stopSlideshow() {
    clearTimeout(this.slideshowTimeout);
    this.isSlideshowActive = false;
    this.reset();
  }
}

export default GlitchFx;
