import $ from "jquery";
import Barba from "barba.js";
import { gsap } from "gsap";
import * as Helpers from "./Helpers";
import waypoints from "waypoints/lib/noframework.waypoints";
import { forEach } from "lodash";

var lastElementClicked;
var PrevLink = document.querySelector(".post__thumb--prev > a");
var NextLink = document.querySelector(".post__thumb--next > a");
var barbaWrapper = document.getElementById("barba-wrapper");

var nav = document.querySelector(".main-nav");
var navHeight = nav.offsetHeight;

let mql = window.matchMedia("(min-width: 788px)");

if (barbaWrapper && mql.matches) {
  Barba.Pjax.init();
  Barba.Prefetch.init();
}

document.addEventListener("DOMContentLoaded", displayProgressBar);

window.addEventListener("scroll", displayProgressBar);

Barba.Dispatcher.on("linkClicked", function(el) {
  lastElementClicked = el;
});

function displayProgressBar() {
  var header = document.querySelector(".post__header");
  var progressBar = document.querySelector(".progress-bar");
  if (header) {
    const { bottomOfElement, topOfElement } = Helpers.getElementCoords(header);
    const offsetHeader = navHeight + bottomOfElement;
    progressBar.style.top = navHeight + "px";

    if (window.pageYOffset > bottomOfElement + navHeight) {
      progressBar.style.width = Helpers.getScrollPercent(offsetHeader) + "%";
      progressBar.style.display = "block";
    } else if (window.pageYOffset < bottomOfElement + navHeight) {
      progressBar.style.display = "none";
      progressBar.style.width = 0;
    }
  }
}

export const newContainer = Barba.BaseView.extend({
  namespace: "newContainer",
  showPostLinks: function() {
    var $postImage = $(".post__image");
    var $postLinks = $(".post__thumb");
    if ($postImage) {
      var topOfImage = $postImage.offset().top - navHeight;
      var bottomOfImage = topOfImage + $postImage.outerHeight();
    }
    if (window.scrollY > bottomOfImage) {
      $postLinks.css({
        visibility: "visible",
        opacity: 1
      });
    } else {
      $postLinks.css({
        visibility: "hidden",
        opacity: 0
      });
    }
  },

  onEnterCompleted: function() {
    window.addEventListener("scroll", this.showPostLinks);

    Waypoint.refreshAll();
  }
});

var MovePage = Barba.BaseTransition.extend({
  start: function() {
    this.originalThumb = lastElementClicked;

    Promise.all([this.newContainerLoading, this.scrollTop()]).then(
      this.movePages.bind(this)
    );
  },

  scrollTop: function() {
    var that = this;
    var deferred = Barba.Utils.deferred();
    var obj = { y: window.pageYOffset };
    TweenLite.to(obj, 0.4, {
      y: 0,
      onUpdate: function() {
        if (obj.y === 0) {
          deferred.resolve();
        }
        // Prevent new container thumbnail from flashing while scrolling up
        that.newContainer.querySelector(
          ".post__thumb__image--prev"
        ).style.display = "none";
        that.newContainer.querySelector(
          ".post__thumb__image--next"
        ).style.display = "none";

        that.newContainer.querySelector(
          ".post__thumb__title--prev"
        ).style.display = "none";
        that.newContainer.querySelector(
          ".post__thumb__title--next"
        ).style.display = "none";

        window.scroll(0, obj.y);
      },
      onComplete: function() {
        // Show new container thumbnails when scrolling up animation is complete
        that.newContainer.querySelector(
          ".post__thumb__image--prev"
        ).style.display = "block";
        that.newContainer.querySelector(
          ".post__thumb__image--next"
        ).style.display = "block";

        that.newContainer.querySelector(
          ".post__thumb__title--prev"
        ).style.display = "block";
        that.newContainer.querySelector(
          ".post__thumb__title--next"
        ).style.display = "block";

        deferred.resolve();
      }
    });

    return deferred.promise;
  },

  movePages: function() {
    var _this = this;
    var goingForward = true;
    this.updateLinks();
    this.updateLinkPosition();
    this.createWaypoint();

    //this.fadeThumbLinks();

    if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
      goingForward = false;
    }

    TweenLite.set(this.newContainer, {
      visibility: "visible",
      xPercent: goingForward ? 100 : -100,
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      paddingTop: navHeight
    });

    TweenLite.set(this.newContainer.querySelector(".post__header"), {
      height: `calc(100vh - ${navHeight}px)`
    });

    TweenLite.set(
      this.newContainer.querySelector(".post__thumb__title--prev"),
      {
        left: `150 +
          ${Math.ceil(
            this.newContainer.querySelector(".post__thumb__title--prev")
              .clientHeight
          )}`,
        position: "absolute"
      }
    );

    TweenLite.to(this.oldContainer, 0.8, {
      xPercent: goingForward ? -100 : 100
    });
    TweenLite.to(this.newContainer, 0.8, {
      xPercent: 0,
      onComplete: function() {
        TweenLite.set(_this.newContainer, {
          clearProps: "all"
        });

        _this.done();
      }
    });
  },

  createWaypoint: function() {
    const that = this;
    new Waypoint({
      element: this.newContainer,
      handler: function(direction) {
        forEach(that.newContainer.querySelectorAll(".post__thumb"), function(
          link
        ) {
          if (direction === "down") {
            link.style.position = "absolute";
          } else {
            link.style.position = "fixed";
          }
        });
      },
      offset: "bottom-in-view"
    });
  },

  updateLinkPosition: function() {
    const prevLink = this.newContainer.querySelector(
      ".post__thumb__title--prev"
    );
    const postThumbWidth = 120;
    if (prevLink) {
      const prevLinkWidth = postThumbWidth + prevLink.offsetHeight;
      prevLink.style.left = prevLinkWidth + "px";
    }
  },

  updateLinks: function() {
    if (PrevLink) {
      PrevLink.href = this.newContainer.dataset.prev;
    }

    NextLink.href = this.newContainer.dataset.next;
    // console.log(
    //   $(this.oldContainer)
    //     .find(".post__thumb__image--next")
    //     .attr("style")
    // );
  },

  getNewPageFile: function() {
    return Barba.HistoryManager.currentStatus()
      .url.split("/")
      .pop();
  }
});

Barba.Pjax.getTransition = function() {
  return MovePage;
};

// ignore rules
// Barba.Pjax.originalPreventCheck = Barba.Pjax.preventCheck;
// Barba.Pjax.preventCheck = function(evt, element) {
// 	if (!Barba.Pjax.originalPreventCheck(evt, element)) {
// 		return false;
// 	}

// 	// ignore pdf links
// 	if (/.pdf/.test(element.href.toLowerCase())) {
// 		return false;
// 	}

// 	// additional (besides .no-barba) ignore links with these classes
// 	// ab-item is for wp admin toolbar links
// 	var ignoreClasses = ['ab-item', 'another-class-here'];
// 	for (var i = 0; i < ignoreClasses.length; i++) {
// 		if (element.classList.contains(ignoreClasses[i])) {
// 			return false;
// 		}
// 	}

// 	return true;
// };
