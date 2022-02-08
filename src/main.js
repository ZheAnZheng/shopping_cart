import { sunIcon, moonIcon, rightArrowIcon } from "./script/Constants.js";
import ProductsData from "./script/ProductsData.js";
import { Page } from "./script/PageModule.js";

import ProductManager from "./script/ProductManager.js";
import BasketManager from "./script/BasketManager.js";
import BasketFacade from "./script/BasketFacade.js";
import BasketView from "./script/BasketView.js";
import BasketController from "./script/BasketController.js";

const themeItem = document.querySelector(".themeToggle");
const nextButtons = document.querySelectorAll(".next-button");
const prevButtons = document.querySelectorAll(".pre-button");
const stepItems = [...document.querySelectorAll(".step-item")];
const checkoutSections = [...document.querySelectorAll(".checkout")];
const shoppingCartNode = document.querySelector(".shopping-basket");

const prodcutManager = new ProductManager(ProductsData);
const basketManager = new BasketManager({
  0: 1,
  1: 1,
});
const basketFacade = new BasketFacade(basketManager, prodcutManager);
const basketView = new BasketView();
const basketController = new BasketController(
  shoppingCartNode,
  basketFacade,
  basketView
);

let isDarkMode = localStorage.getItem("theme") === "dark" ? true : false;
const STEP_ONE = 0;
const STEP_TWO = 1;
const STEP_THREE = 2;
let current = 0;
const Step1 = new Page(stepItems[STEP_ONE], checkoutSections[STEP_ONE]);
const Step2 = new Page(stepItems[STEP_TWO], checkoutSections[STEP_TWO]);
const Step3 = new Page(stepItems[STEP_THREE], checkoutSections[STEP_THREE]);
const Steps = [Step1, Step2, Step3];

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
function loadPreviousThemeSetting() {
  if (isDarkMode) {
    displayTheme("dark");
  } else {
    displayTheme("light");
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
  loadPreviousThemeSetting();
  basketController.initial();
  shoppingCartNode.querySelectorAll(".basket-product").forEach((node) => {
    const id = node.dataset.id;
    node.querySelector(".addBtn").addEventListener("click", () => {
      basketController.addProductAndUpdate(id);
    });
    node.querySelector(".removeBtn").addEventListener("click", () => {
      basketController.removeProductAndUpdate(id);
    });
  });
});
