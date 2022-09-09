import $ from "jquery";

class Search {
  constructor() {
    this.nav = document.querySelector(".main-nav");
    this.searchDiv = document.querySelector(".search");
    this.searchInput = this.searchDiv.querySelector(".search__input");
    this.events();
  }

  events() {
    const that = this;
    this.nav.addEventListener("click", this.openSearch.bind(this));
    this.searchDiv.addEventListener("click", this.closeSearch.bind(this));
    document.addEventListener("keyup", function(ev) {
      if (ev.keyCode == 27 && document.body.classList.contains("search-open")) {
        document.body.classList.remove("search-open");
        that.clearInput();
      }
    });
  }

  openSearch(e) {
    if ($(e.target).is("#btn-search--open, #btn-search--open *")) {
      document.body.classList.add("search-open");
      this.searchInput.focus();
    }
  }

  closeSearch(e) {
    if ($(e.target).is("#btn-search-close, #btn-search-close *")) {
      document.body.classList.remove("search-open");
      this.clearInput();
    }
  }

  clearInput() {
    this.searchInput.blur();
    this.searchInput.value = "";
  }
}

export default Search;
