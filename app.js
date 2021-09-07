//On load
const loading = document.querySelector(".loading");
window.addEventListener("load", () => {
  loading.className += " hidden"; //the space is necessary unless it wont work
  // loading.classList.add("hidden");
  // loading.style.display = "none";
  getUserLocation();
  getUserTime();
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
//function to change bg-colors===========================================>
const box_time = document.querySelector(".box-time");
const bgColor = document.querySelectorAll(".bg-color span");
const link_change = document.querySelector("#bg-link-change");
const btnMode = document.querySelectorAll(".circle");
//fetch from local storage
let theme = localStorage.getItem("theme");
if (theme === null) {
  setMode("blue");
} else {
  setMode(theme);
}

btnMode.forEach((btn) => {
  btn.addEventListener("click", () => {
    const mode = btn.dataset.mode;
    const activeBtn = document.querySelectorAll(".active");
    activeBtn.forEach((e) => {
      e.className = e.className.replace("active", "");
    });
    btn.classList.add("active");

    setMode(mode);
  });
});
function setMode(mode) {
  if (mode === "blue") {
    link_change.href = "./styles.css";
  }
  if (mode === "red") {
    link_change.href = "./themes/red.css";
  }
  if (mode === "yellow") {
    link_change.href = "./themes/yellow.css";
  }
  if (mode === "green") {
    link_change.href = "./themes/green.css";
  }
  localStorage.setItem("theme", mode);
}

//Can use the Enter 13 === Enter Button to save data=================================>
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault;
    addSearch();
  }
});

//function to search and add data
const cardHolder = document.querySelector(".card-container");
let inputSearch = document.querySelector(".input-search");
const btnSearch = document.querySelector(".btn-search");
btnSearch.addEventListener("click", addSearch);

function addSearch(tempr, recentItem) {
  if (inputSearch.value === 0) {
    alert("message?: Please insert correct value");
  } else {
    let searchLocation = inputSearch.value;
    fetchResult(searchLocation);
    const card = document.createElement("div");
    card.classList.add("card");
    card.classList.add("addEffect");
    const cardName = document.createElement("div");
    cardName.classList.add("name");
    const cardFavIcon = document.createElement("button");
    cardFavIcon.classList.add("trash-icon");
    cardFavIcon.innerHTML =
      '<img class="trash-icon" src="./images/icon/icons8-trash-50.png" alt="" />';

    const cardTitle = document.createElement("h3");
    cardTitle.classList.add();
    cardTitle.innerHTML = inputSearch.value;

    cardName.appendChild(cardFavIcon);
    cardName.appendChild(cardTitle);
    card.appendChild(cardName);

    const cardDetails = document.createElement("div");
    cardDetails.classList.add("details");

    card.appendChild(cardDetails);

    cardHolder.appendChild(card);
    inputSearch.value = ""; //clear input after search
    console.log(card);
  }
}

//function to remove data
cardHolder.addEventListener("click", deleteCheck);

function deleteCheck(e) {
  const item = e.target;
  if (item.className === "trash-icon") {
    const toRemove = item.parentElement.parentElement.parentElement;
    toRemove.classList.add("deleteEffect");
    toRemove.addEventListener("transtioned", () => {
      toRemove.remove();
    });
  }
}
//Fetch API======================================================================>

//Store to local Storage

//Varible of items to filled from the API data
const cityTemp = document.querySelector(".temperature");
const cityName = document.querySelector(".city-name");
const cityIcon = document.querySelector("#city-icon");
const cityHumidity = document.querySelector("#humidity");
const cityDescription = document.querySelector("#description");

//variables for the API
const apiKey = "62366ce36a3b0ee777207eb6626edd19";
//You can use dotenv to hide this API key, but i choose not to ... wanted the project to completly public

//get request
let queriedFromSearch,
  recentsList = JSON.parse(localStorage.getItem("recent")) || [],
  recentModel;
function fetchResult(location) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
  )
    //handle success
    .then((response) => response.json()) //convert to json
    .then((data) => {
      let temperature, humidity, description;
      temperature = data.main.temp;
      let icon =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      nameSearch = data.name;

      humidity = data.main.humidity;
      description = data.weather[0].description;
      //Fill data gotten from the API to the Interface
      cityTemp.innerText = Math.floor(temperature);
      cityName.innerText = nameSearch;
      cityIcon.src = icon;
      cityHumidity.innerText = humidity;
      cityDescription.innerText = description;

      recentModel = {
        Location: nameSearch,
        favorite: false,
      };

      recentsList.push(recentModel);
      localStorage.setItem("recent", JSON.stringify(recentsList));
      cardAdd();
    }) //print data to console
    .catch((err) => alert("Could not fetch data for that city")); //catch errors
}
// Get the current user location
let latitude, longitude;
const currentCityName = document.querySelector("h1#name");
const currentCityTime = document.querySelector("span#time");
function getUserLocation() {
  navigator.geolocation.getCurrentPosition((position) => {
    longitude = position.coords.longitude;
    latitude = position.coords.latitude;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
      .then((reponse) => reponse.json())
      .then((data) => {
        let icon =
          "http://openweathermap.org/img/wn/" +
          data.weather[0].icon +
          "@2x.png";
        cityTemp.innerText = Math.floor(data.main.temp);
        cityName.innerText = data.name;
        cityIcon.src = icon;
        cityHumidity.innerText = data.main.humidity;
        cityDescription.innerText = data.weather[0].description;
        currentCityName.innerText = data.name;
      });
  });
}
//get user time
let date, dayName, time, day;
function getUserTime() {
  date = new Date();
  time = `${date.getHours()}:${date.getMinutes()}`;
  currentCityTime.innerHTML = time;
}
// Check if the user is connected to Internet if not display a page

//Use the other API to fetch data for 10 days, hourly etc

// get the Item search to display in the cards
function cardAdd() {
  console.log(recentsList);
  recentsList.forEach((recentItem) => {
    let nameLocation = recentItem.Location;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${nameLocation}&units=metric&appid=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        let tempr = Math.floor(data.main.temp);

        // addSearch(tempr, recentItem);
      })
      .catch((err) => alert(err));
  });
}
