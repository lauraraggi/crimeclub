import $ from "jquery";

class SidebarNav {
  constructor() {
    this.html = $("html");
    this.events();
  }

  events() {
    $("body").on("click", this.toggleSidebar.bind(this));
  }

  toggleSidebar(e) {
    if (!this.html.hasClass("sidebar-open")) {
      $(e.target)
        .closest(".main-nav__menu-toggle")
        .parents("html")
        .addClass("sidebar-open");
    } else {
      if ($(e.target).hasClass("close-menu") || $(e.target).is("body")) {
        this.html.removeClass("sidebar-open");
      }
    }
  }
}

export default SidebarNav;
