import { sunIcon, moonIcon, rightArrowIcon } from "./script/constants.js";
const themeItem = document.querySelector(".themeToggle");
const nextButtons = document.querySelectorAll(".next-button");
const prevButtons = document.querySelectorAll(".pre-button");
const stepItems = [...document.querySelectorAll(".step-item")];
const checkoutSections = [...document.querySelectorAll(".checkout")];

let isDarkMode = localStorage.getItem("theme") === "dark" ? true : false;

//狀態模式
const STEP_ONE = 0;
const STEP_TWO = 1;
const STEP_THREE = 2;
let current = STEP_ONE;

function moveForward() {
  if (current === STEP_ONE) {
    current=STEP_TWO
    updateClassNameBefore(STEP_ONE,true)
    updateClassNameAfter(STEP_TWO)
    
  } else if (current === STEP_TWO) {
    current = STEP_THREE;
    updateClassNameBefore(STEP_TWO,true);
    updateClassNameAfter(STEP_THREE);
  } else if (current === STEP_THREE) {
    return;
  }
}
function goBack() {
  
  if (current === STEP_ONE) {
    return;
  } else if (current === STEP_TWO) {
    current=STEP_ONE
    updateClassNameBefore(STEP_TWO);
    updateClassNameAfter(STEP_ONE,true);
  } else if (current === STEP_THREE) {
    current = STEP_TWO;
    updateClassNameBefore(STEP_THREE);
    updateClassNameAfter(STEP_TWO, true);
  }
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

//低階函示

function updateClassNameBefore(current,needAddDone){
  let stepClass=stepItems[current].classList
  stepClass.remove('active')
  checkoutSections[current].classList.remove('active');
  needAddDone && stepClass.add('done')
}
function updateClassNameAfter(current,needRemoveDone){
  let stepClass=stepItems[current].classList
  stepClass.add('active')
  checkoutSections[current].classList.add('active');
  needRemoveDone && stepClass.remove('done')

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
