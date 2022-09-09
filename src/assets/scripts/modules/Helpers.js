import $ from "jquery";
import imagesLoaded from "imagesloaded";

export const getElementCoords = element => {
  const navHeight = document.querySelector(".main-nav").offsetHeight;
  if (element) {
    const topOfElement = element.offsetTop - navHeight;
    const bottomOfElement = topOfElement + element.offsetHeight;
    return {
      topOfElement,
      bottomOfElement
    };
  }
};

export const positionPrevLink = () => {
  const prevLink = document.querySelector(".post__thumb__title--prev");
  const postThumbWidth = 120;
  if (prevLink) {
    const prevLinkWidth = postThumbWidth + prevLink.offsetHeight;
    prevLink.style.left = prevLinkWidth + "px";
  }
};

export const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const preloader = () => {
  const preloader = document.querySelector(".preloader ");
  imagesLoaded(document.getElementById("main"), () =>
    preloader.classList.add("preloader--hidden")
  );
};

export const getScrollPercent = offset => {
  // Measuring from beginning of article
  const h = document.documentElement;
  const b = document.body;
  const st = "scrollTop";
  const sh = "scrollHeight";
  return (
    ((h[st] - offset || b[st]) / ((h[sh] || b[sh]) - h.clientHeight - offset)) *
    100
  );
};

// export const objectFitIEFix = () => {
//   if (!Modernizr.objectfit) {
//     $(".img-wrapper").each(function() {
//       var $container = $(this),
//         imgUrl = $container.find("img").data("src");
//       if (imgUrl) {
//         $container
//           .css("backgroundImage", "url(" + imgUrl + ")")
//           .addClass("compat-object-fit");
//       }
//     });
//   }
// };
