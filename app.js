// Declaration of variable

const MenuBurger = document.querySelector(".menu-burger");
const Settings = document.querySelector(".settings");
const Container = document.querySelector(".container");
// const TabNavigation = document.querySelector(".tab-navigation");

// function(here i will use arrow function)

//menu burger
MenuBurger.addEventListener("click", () => {
  MenuBurger.classList.toggle("close");
  Settings.classList.toggle("open");
  Container.classList.toggle("ctn");
});
// // Tab navigator (Method 1)
// TabNavigation.addEventListener("click", changeTabs, false);
// function changeTabs(event) {
//   const TabNavigation_active = document.querySelectorAll(".active");
//   TabNavigation_active.forEach((e) => {
//     e.className = e.className.replace("active", "");
//   });
//   event.target.classList.add("active");
// }

// Tab navigator (Method 2)
const TabNavigation = document.querySelectorAll(" ul.tab-navigation li");

TabNavigation.forEach((link) => {
  link.addEventListener("click", (event) => {
    const TabNavigation_active = document.querySelectorAll(".active");
    TabNavigation_active.forEach((e) => {
      e.className = e.className.replace("active", "");
    });
    event.target.classList.add("active");
  });
});
