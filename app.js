//On load
const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
  loading.className += " hidden"; //the space is necessary unless it wont work
  // loading.classList.add("hidden");
  // loading.style.display = "none";
});

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
//Can use the Enter 13 === Enter Button to save data
document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addSearch();
  }
});

//function to search and add data
const cardHolder = document.querySelector(".card-container");
const inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");

btnSearch.addEventListener("click", addSearch);

function addSearch() {
  if (inputSearch.value === 0) {
    alert("message?: Please insert correct value");
  } else {
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("addEffect");
    const cardName = document.createElement("div");
    cardName.classList.add("name");
    const cardFavIcon = document.createElement("button");
    cardFavIcon.classList.add("trash-icon");
    cardFavIcon.innerHTML = '<i class="ti-trash"></i>';

    const cardTitle = document.createElement("h3");
    cardTitle.innerHTML = inputSearch.value;

    cardName.appendChild(cardFavIcon);
    cardName.appendChild(cardTitle);
    card.appendChild(cardName);

    const cardDetails = document.createElement("div");
    cardDetails.classList.add("details");
    card.appendChild(cardDetails);

    cardHolder.appendChild(card);
    inputSearch.value = "";
  }
}

//function to remove data
cardHolder.addEventListener("click", deleteCheck);

function deleteCheck(e) {
  const item = e.target;
  if (item.className === "trash-icon") {
    console.log("delete");
    const toRemove = item.parentElement.parentElement;
    toRemove.classList.add("deleteEffect");
    toRemove.addEventListener("transtioned", () => {
      toRemove.remove();
    });
    console.log(toRemove);
  }
}
//Fetch API

//Store to local Storage
//get request
// fetch("")
//   //handle success
//   .then((response) => response.json())
//   //convert to json
//   .then((json) => {
//     console.log(json);
//   }) //print data to console
//   .catch((err) => {
//     alert.log("Could not fetch the API");
//   }); //catch errors

//function to change bg-colors
const box_time = document.querySelector(".box-time");

const bgColor = document.querySelectorAll(".bg-color span");
bgColor.forEach((span) => {
  span.addEventListener("click", (event) => {
    const active_btn = document.querySelectorAll(".active");
    active_btn.forEach((e) => {
      e.className = e.className.replace("active", "");
    });
    event.target.classList.add("active");
    const link_change = document.querySelector("#bg-link-change");

    const link = event.target.classList;
    //Store colors for the background
    localStorage.setItem("themes", link[1]);

    if (link.contains("active")) {
      if (link[1] === "blue-color") {
        link_change.href = "./styles.css";
      }
      if (link[1] === "red-color") {
        link_change.href = "./themes/red.css";
      }
      if (link[1] === "yellow-color") {
        link_change.href = "./themes/yellow.css";
      }
      if (link[1] === "green-color") {
        link_change.href = "./themes/green.css";
      }
    } else {
      alert("Message: Are sure your code is correct??LOL");
    }
  });
});
//theme on window refresh
const colorFromLocalStorage = localStorage.getItem("themes");
console.log(colorFromLocalStorage);
