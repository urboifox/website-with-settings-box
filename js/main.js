const landing = document.querySelector(`.landing`);

let imagesCount = 5;
let currBackground = 1;
setInterval(() => {
  if (currBackground === imagesCount) {
    currBackground = 0;
  }
  landing.style.cssText = `background-image: url(../assets/0${
    currBackground + 1
  }.jpg)`;
  currBackground++;
}, 10000);
