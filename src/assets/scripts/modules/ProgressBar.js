import * as Helpers from "./Helpers";

class ProgressBar {
  constructor() {
    this.progressBar = document.querySelector(".progress-bar");
    this.navHeight = this.getNavHeight();
    this.header = document.querySelector(".post__header");
    this.isScrolledPastHeader = false;
    this.events();
  }

  events() {
    if (this.progressBar) {
      document.addEventListener(
        "DOMContentLoaded",
        this.displayProgressBar.bind(this)
      );

      window.addEventListener("scroll", this.displayProgressBar.bind(this));
      window.addEventListener("scroll", () => {
        console.log("yay");
      });
    }
  }

  getNavHeight() {
    return document.querySelector(".main-nav").offsetHeight;
  }

  displayProgressBar() {
    if (this.header) {
      const { bottomOfElement, topOfElement } = Helpers.getElementCoords(
        this.header
      );
      const offsetHeader = this.navHeight + bottomOfElement;
      this.progressBar.style.top = this.navHeight + "px";

      if (
        window.pageYOffset > bottomOfElement + this.navHeight &&
        !this.isScrolled
      ) {
        this.isScrolledPastHeader = true;
        this.progressBar.style.width =
          Helpers.getScrollPercent(offsetHeader) + "%";
        this.progressBar.style.display = "block";
        console.log("scrolled past header outside barba");
        // console.log(this.header);
      } else if (
        window.pageYOffset < bottomOfElement + this.navHeight &&
        this.isScrolledPastHeader
      ) {
        this.isScrolledPastHeader = false;
        this.progressBar.style.display = "none";
        this.progressBar.style.width = 0;
        console.log("scrolled back up outside barba");
      }
    }
  }
}

export default ProgressBar;
