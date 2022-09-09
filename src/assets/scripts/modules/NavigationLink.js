class NavigationLink {
  constructor() {
    this.postLinks = document.querySelectorAll(".post__thumb");
    this.prevLink = document.querySelector(".post__thumb__title--prev");
    this.postThumbWidth = 150;
  }

  positionPrevLink() {
    if (this.prevLink) {
      const prevLinkWidth = this.postThumbWidth + this.prevLink.offsetHeight;
      this.prevLink.style.left = prevLinkWidth + "px";
    }
  }
}

export default NavigationLink;
