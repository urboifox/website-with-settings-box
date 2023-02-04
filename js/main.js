const gearIcon = document.querySelector(`.gear`);
const settingsBox = document.querySelector(`.settings_box`);
const colorsLis = document.querySelectorAll(`.settings_options .colors li`);
const landing = document.querySelector(`.landing`);
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
  li.addEventListener(`click`, function (e) {
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

let imagesCount = 5;
let currBackground = 1;
setInterval(() => {
  if (currBackground === imagesCount) {
    currBackground = 0;
  }
  landing.style.cssText = `background-image: url(../assets/${
    currBackground + 1
  }.jpg)`;
  currBackground++;
}, 7000);
