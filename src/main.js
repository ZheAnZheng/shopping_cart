import { sunIcon, moonIcon, rightArrowIcon } from "./script/constants.js";
const themeItem = document.querySelector(".themeToggle");
const nextButtons = document.querySelectorAll(".next-button");
const prevButtons = document.querySelectorAll(".pre-button");
const stepItems = [...document.querySelectorAll(".step-item")];
const checkoutSections = [...document.querySelectorAll(".checkout")];

let isDarkMode = localStorage.getItem("theme") === "dark" ? true : false;

const STEP_ONE = 0;
const STEP_TWO = 1;
const STEP_THREE = 2;

class Page {
  constructor(stepItem, section) {
    this.stepItem = stepItem;
    this.section = section;
  }
  show = function () {
    this.stepItem.classList.add("active");
    this.stepItem.classList.remove("done");
    this.section.classList.add("active");
  };
  hide = function () {
    this.stepItem.classList.remove("active");
    this.stepItem.classList.remove("done");
    this.section.classList.remove("active");
  };
  done = function () {
    this.stepItem.classList.add("active");
    this.stepItem.classList.add("done");
    this.section.classList.remove("active");
  };
}

const Step1 = new Page(stepItems[STEP_ONE], checkoutSections[STEP_ONE]);
const Step2 = new Page(stepItems[STEP_TWO], checkoutSections[STEP_TWO]);
const Step3 = new Page(stepItems[STEP_THREE], checkoutSections[STEP_THREE]);
const Steps = [Step1, Step2, Step3];
let current = 0;

function moveForward() {
  if (current == Steps.length - 1) return;

  const currentStep = Steps[current];
  const nextStep = Steps[current + 1];
  currentStep.done();
  nextStep.show();

  current++;
}
function goBack() {
  if (current == 0) return;

  const currentStep = Steps[current];
  const previousStep = Steps[current - 1];
  currentStep.hide();
  previousStep.show();

  current--;
}
function checkFinalNextButton() {
  if (current === STEP_THREE) {
    nextButtons.forEach((btn) => {
      btn.innerHTML = "確認訂單";
    });
  } else {
    nextButtons.forEach((btn) => {
      btn.innerHTML = `下一步` + rightArrowIcon;
    });
  }
}
function checkPreButtonAble() {
  const isDisable =
    prevButtons[0].classList.contains("disable") &&
    prevButtons[1].classList.contains("disable");

  if ((current === STEP_TWO || current === STEP_THREE) && isDisable) {
    prevButtons.forEach((btn) => {
      btn.classList.remove("disable");
    });
  } else if (current === STEP_ONE) {
    prevButtons.forEach((btn) => {
      btn.classList.add("disable");
    });
  }
}
function toggleTheme() {
  isDarkMode = !isDarkMode;

  if (isDarkMode) {
    displayTheme("dark");
    localStorage.setItem("theme", "dark");
  } else {
    displayTheme("light");
    localStorage.setItem("theme", "light");
  }
  displayThemeIcon();
}

function displayThemeIcon() {
  if (isDarkMode) {
    themeItem.innerHTML = sunIcon;
  } else {
    themeItem.innerHTML = moonIcon;
  }
}
function displayTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

themeItem.addEventListener("click", toggleTheme);
nextButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    moveForward();
    checkPreButtonAble();
    checkFinalNextButton();
  });
});
prevButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    goBack();
    checkPreButtonAble();
    checkFinalNextButton();
  });
});
document.addEventListener("DOMContentLoaded", () => {
  if (isDarkMode) {
    displayTheme("dark");
  } else {
    displayTheme("light");
  }
  displayThemeIcon();
});
