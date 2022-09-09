class CustomClasses {
  constructor() {
    this.isScrolled = false;
    this.nav = document.querySelector(".main-nav");
    this.events();
  }

  events() {
    window.addEventListener("scroll", this.manageScrollClass.bind(this));
  }

  manageScrollClass() {
    if (window.scrollY > 0 && !this.isScrolled) {
      this.isScrolled = true;
      document.body.classList.add("scrolled");
    }
    if (window.scrollY === 0 && this.isScrolled) {
      document.body.classList.remove("scrolled");
      this.nav.style.offsetHeight = this.nav.offsetHeight;
      this.isScrolled = false;
    }
  }
}

export default CustomClasses;
