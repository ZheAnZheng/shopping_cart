import { sunIcon, moonIcon, rightArrowIcon } from "./script/constants.js";
const moon = document.querySelector(".moon");
const nextButtons = document.querySelectorAll(".next-button");
const prevButtons = document.querySelectorAll(".pre-button");
const stepItems = [...document.querySelectorAll(".step-item")];
const checkoutSections = [...document.querySelectorAll(".checkout")];

let isDarkMode = false;
//狀態模式
const STEP_ONE = 0;
const STEP_TWO = 1;
const STEP_THREE = 2;
let current = STEP_ONE;

function moveForward() {
  let currentStepClass = stepItems[current].classList;
  if (current === STEP_ONE) {
    updateClassNameBeforeNextStep(currentStepClass, checkoutSections);
    updateCurrentStepTo(STEP_TWO);
    updateClassNameAfterNextStep(currentStepClass, checkoutSections);
  } else if (current === STEP_TWO) {
    updateClassNameBeforeNextStep(currentStepClass, checkoutSections);
    updateCurrentStepTo(STEP_THREE);
    updateClassNameAfterNextStep(currentStepClass, checkoutSections);
  } else if (current === STEP_THREE) {
    return;
  }
}

function goBack() {
  let currentStepClass = stepItems[current].classList;
  if (current === STEP_ONE) {
    return;
  } else if (current === STEP_TWO) {
    updateClassNameBeforePreStep(currentStepClass, checkoutSections);
    updateCurrentStepTo(STEP_ONE);
    updateClassNameAfterPreStep(currentStepClass, checkoutSections);
  } else if (current === STEP_THREE) {
    updateClassNameBeforePreStep(currentStepClass, checkoutSections);
    updateCurrentStepTo(STEP_TWO);
    updateClassNameAfterPreStep(currentStepClass, checkoutSections);
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
  console.log(isDarkMode);
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
  }
  displayThemeIcon();
}
function displayThemeIcon() {
  if (isDarkMode) {
    moon.innerHTML = sunIcon;
  } else {
    moon.innerHTML = moonIcon;
  }
}


//低階函示
function updateClassNameBeforeNextStep(stepClass, checkouts) {
  stepClass.remove("active");
  stepClass.add("done");
  checkouts[current].classList.remove("active");
}
function updateCurrentStepTo(stepState) {
  current = stepState;
}
function updateClassNameAfterNextStep(stepClass, checkouts) {
  stepClass = stepItems[current].classList;
  checkouts[current].classList.add("active");
  stepClass.add("active");
}
function updateClassNameBeforePreStep(stepClass, checkouts) {
  stepClass.remove("active");
  checkouts[current].classList.remove("active");
}
function updateClassNameAfterPreStep(stepClass, checkouts) {
  stepClass = stepItems[current].classList;
  stepClass.remove("done");
  stepClass.add("active");
  checkouts[current].classList.add("active");
}



moon.addEventListener("click", toggleTheme);
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
