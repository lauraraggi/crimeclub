import $ from "jquery";
import { getElementCoords, positionPrevLink } from "./Helpers";
import waypoints from "waypoints/lib/noframework.waypoints";
import { forEach } from "lodash";

class SinglePost {
  constructor() {
    this.lazyImages = document.querySelectorAll(".lazyload");
    this.postImage = document.querySelector(".post__image");
    this.main = document.getElementById("main");
    this.navHeight = document.querySelector(".main-nav").offsetHeight;
    this.postLinks = document.querySelectorAll(".post__thumb");
    this.barbaWrapper = document.getElementById("barba-wrapper");
    this.header = document.querySelector(".post__header");
    this.setHeaderHeight();
    this.refreshWaypoints();
    this.events();
  }

  events() {
    if (this.postLinks.length > 0) {
      this.createWaypoint();
      const coords = getElementCoords(this.header);
      window.addEventListener("scroll", this.showPostLinks.bind(this, coords));
      document.addEventListener("DOMContentLoaded", positionPrevLink);
    }
  }

  refreshWaypoints() {
    forEach(this.lazyImages, img => {
      img.addEventListener("load", () => {
        Waypoint.refreshAll();
      });
    });
  }

  setHeaderHeight() {
    if (this.header) {
      this.header.style.height = `calc(100vh - ${this.navHeight}px)`;
    }
  }

  createWaypoint() {
    const that = this;
    new Waypoint({
      element: this.barbaWrapper,
      handler: function(direction) {
        forEach(that.postLinks, function(link) {
          if (direction === "down") {
            link.style.position = "absolute";
          } else {
            link.style.position = "fixed";
          }
        });
      },
      offset: "bottom-in-view"
    });
  }

  showPostLinks(coords) {
    const { bottomOfElement, topOfElement } = coords;
    forEach(this.postLinks, function(link) {
      if ($(window).scrollTop() > bottomOfElement) {
        //link.style.top = that.navHeight + "px";

        link.style.visibility = "visible";
        link.style.opacity = 1;
      } else {
        link.style.visibility = "hidden";
        link.style.opacity = 0;
      }
    });
  }
}

export default SinglePost;
