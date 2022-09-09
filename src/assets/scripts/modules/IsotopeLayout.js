import $ from "jquery";
import jQueryBridget from "jquery-bridget";
import ImagesLoaded from "imagesloaded";
import Isotope from "isotope-layout";

class IsotopeLayout {
  constructor() {
    this.articleList = $(".article-list");
    this.configIsotope();
  }

  configIsotope() {
    const that = this;
    jQueryBridget("isotope", Isotope, $);
    jQueryBridget("imagesLoaded", ImagesLoaded, $);

    this.articleList.isotope({
      // options
      itemSelector: ".article__item",
      percentPosition: true,
      masonry: {
        gutter: 40,
        columnWidth: ".grid-sizer"
      }
    });
    this.articleList.imagesLoaded(function() {
      that.articleList.isotope("layout");
    });
  }
}

export default IsotopeLayout;
