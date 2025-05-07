// // Mobile Menu Elements
// // const hamburger = document.querySelector(".hamburger");
// const floatingHamburger = document.querySelector(".floating-hamburger");
// const mobileNav = document.querySelector(".mobile-nav");
// const navbar = document.querySelector(".navbar");
// let lastScroll = window.pageYOffset;

// // Toggle mobile menu
// const toggleMenu = () => {
//   mobileNav.classList.toggle("active");
// };

// hamburger.addEventListener("click", toggleMenu);
// floatingHamburger.addEventListener("click", toggleMenu);

// // Scroll detection for hamburger
// window.addEventListener("scroll", () => {
//   const currentScroll = window.pageYOffset;

//   if (currentScroll > 100 && currentScroll > lastScroll) {
//     floatingHamburger.classList.add("visible");
//     navbar.classList.add("hidden");
//   } else if (currentScroll <= 100) {
//     floatingHamburger.classList.remove("visible");
//     navbar.classList.remove("hidden");
//   }

//   lastScroll = currentScroll;
// });

// // Close mobile menu when clicking outside
// document.addEventListener("click", (e) => {
//   if (
//     !e.target.closest(".nav-right") &&
//     !e.target.closest(".mobile-nav") &&
//     !e.target.closest(".floating-hamburger")
//   ) {
//     mobileNav.classList.remove("active");
//   }
// });
