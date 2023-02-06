const gearIcon = document.querySelector(`.gear`);
const settingsBox = document.querySelector(`.settings_box`);
const colorsLis = document.querySelectorAll(`.settings_options .colors li`);
const landing = document.querySelector(`.landing`);
let currBackground = 1;
const openNav = document.querySelector(`.landing .open`);
const closeNav = document.querySelector(`.landing .close`);
const nav = document.querySelector(`.landing .links`);

// set open and close NAV buttons

openNav.addEventListener(`click`, () => {
  nav.style.right = 0;
});
closeNav.addEventListener(`click`, (q) => {
  nav.style.right = "-100%";
});

//check for local storage values

let mainColor = localStorage.getItem(`main_color`);

if (mainColor) {
  // set the color as the main
  document.documentElement.style.setProperty("--color-main", `${mainColor}`);
  // loop to add active class on the selected color
  colorsLis.forEach((li) => {
    li.classList.remove(`active`);
    if (li.dataset.color === mainColor) {
      li.classList.add(`active`);
    }
  });
}

// settings box toggle

gearIcon.addEventListener(`click`, function () {
  // toggle open class on settings box
  settingsBox.classList.toggle(`open`);
  // toggle spin on click in gear icon
  this.classList.toggle(`fa-spin`);
});

// switch colors

colorsLis.forEach((li) => {
  li.addEventListener(`click`, function () {
    // adds active class on selected color
    colorsLis.forEach((li) => {
      li.classList.remove(`active`);
    });
    li.classList.add(`active`);
    // sets the :root (--color-main) to selected color
    document.documentElement.style.setProperty(
      "--color-main",
      `${this.dataset.color}`
    );
    // set the selected color to local storage
    localStorage.setItem(`main_color`, this.dataset.color);
  });
});

// auto change background
let randomizeBack;
let imagesCount = 5;
let randomBackground = true;
function randomizeBackground() {
  if (randomBackground === true) {
    randomizeBack = setInterval(() => {
      if (currBackground > imagesCount) {
        currBackground = 1;
      }
      landing.style.cssText = `background-image: url(../assets/${currBackground}.jpg)`;
      localStorage.setItem(`current_background`, currBackground);
      currBackground++;
    }, 7000);
  }
}
// set the background from local storage
let currentBackgroundLocal = localStorage.getItem(`current_background`);

if (currentBackgroundLocal !== null) {
  landing.style.cssText = `background-image: url(../assets/${currentBackgroundLocal}.jpg)`;
  currBackground = currentBackgroundLocal;
}

// background change toggle

const randomBackEl = document.querySelectorAll(`.random_background span`);
let checkOnLocalForBackgroundState = localStorage.getItem(`randomBackground`);

if (checkOnLocalForBackgroundState !== null) {
  if (checkOnLocalForBackgroundState === "true") {
    randomBackground = true;
  } else {
    randomBackground = false;
  }
  // set active class on background buttons
  randomBackEl.forEach((el) => {
    el.classList.remove(`active`);
  });
  if (randomBackground === true) {
    document.querySelector(`.random_background .yes`).classList.add(`active`);
  } else {
    document.querySelector(`.random_background .no`).classList.add(`active`);
  }
}

randomizeBackground();

randomBackEl.forEach((el) => {
  el.addEventListener(`click`, () => {
    randomBackEl.forEach((el) => {
      el.classList.remove(`active`);
    });

    el.classList.add(`active`);
    if (el.classList.contains(`yes`)) {
      randomBackground = true;
      localStorage.setItem(`randomBackground`, randomBackground);
      randomizeBackground();
    } else {
      randomBackground = false;
      localStorage.setItem(`randomBackground`, randomBackground);
      clearInterval(randomizeBack);
    }
  });
});

// select skills element

const skillsHolder = document.querySelector(`.skills_holder`);
const skillsSpan = document.querySelectorAll(`.skills_holder .skill_value`);

window.addEventListener(`scroll`, () => {
  if (
    window.scrollY >=
    skillsHolder.offsetTop + skillsHolder.offsetHeight - window.innerHeight
  ) {
    skillsSpan.forEach((span) => {
      span.style.width = span.dataset.width;
    });
  } else {
    skillsSpan.forEach((span) => {
      span.style.width = 0;
    });
  }
});
