import $ from "jquery";
import debounce from "lodash";
import stickybits from "stickybits";

class Home {
  constructor() {
    this.navHeight;
    this.featuredArticle = document.querySelector(".featuredArticle");
    this.mql = window.matchMedia("(max-width: 900px)");
    this.calculateNavHeight();
    this.setFeaturedArticleHeight();
    this.setMainPaddingTop();
    this.stickybit;
    this.setStickyElement();
    this.toggleMarginTop();

    this.events();
  }

  events() {
    window.addEventListener("resize", debounce(this.calculateNavHeight, 150));
    window.addEventListener(
      "resize",
      debounce(this.setFeaturedArticleHeight, 200)
    );
    window.addEventListener("resize", debounce(this.setMainPaddingTop, 200));
    $(window).on("scroll", debounce(this.toggleMarginTop.bind(this), 100));

    this.mql.addListener(this.setStickyElement.bind(this));
  }
  calculateNavHeight() {
    this.navHeight = document.querySelector(".main-nav").offsetHeight;
  }

  setFeaturedArticleHeight() {
    const featuredArticle = document.querySelector(".featuredArticle");
    if (featuredArticle) {
      featuredArticle.style.top = this.navHeight + "px";
      featuredArticle.style.height = "calc(100vh - " + this.navHeight + "px )";
    }
  }

  setMainPaddingTop() {
    const mainHome = document.getElementById("main");
    if (mainHome) {
      mainHome.style.paddingTop = this.navHeight + "px";
    }
  }

  setStickyElement() {
    if (this.featuredArticle) {
      if (this.mql.matches) {
        const stickybitsInstancetoBeCleanedup = stickybits(
          this.featuredArticle
        );
        stickybitsInstancetoBeCleanedup.cleanup();
      } else {
        this.stickybit = stickybits(this.featuredArticle, {
          stickyBitStickyOffset: this.navHeight
        });
      }
    }
  }

  // This is only to make stickybits work as expected on IE11
  toggleMarginTop() {
    if (this.featuredArticle) {
      if (!$(this.featuredArticle).hasClass("js-is-sticky")) {
        this.featuredArticle.style.marginTop = `-${this.navHeight}px`;
      } else if (
        $(this.featuredArticle).hasClass("js-is-sticky") ||
        $(this.featuredArticle).hasClass("js-is-stuck") ||
        $(this.featuredArticle).hasClass("js-is-sticky--change")
      ) {
        this.featuredArticle.style.marginTop = 0;
      }
    }
  }
}

export default Home;
