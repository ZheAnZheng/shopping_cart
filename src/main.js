import "./index.scss";

const moon = document.querySelector(".moon");
const nextButtons=document.querySelectorAll('.next-button');
const prevButtons=document.querySelectorAll('.pre-button')
const stepItems=[...document.querySelectorAll('.step-item')];
const checkoutSections=[...document.querySelectorAll('.checkout')]


let isDarkMode = false;
//狀態模式
const STEP_ONE=0;
const STEP_TWO = 1;
const STEP_THREE = 2;
let current=STEP_ONE;

function moveForward(){
    let stepClassList=stepItems[current].classList;

    if(current===STEP_ONE){
        stepClassList.remove("active");
        stepClassList.add("done");
        checkoutSections[current].classList.remove('active');
        current=STEP_TWO;
        stepClassList = stepItems[current].classList;
        checkoutSections[current].classList.add('active')
        stepClassList.add("active");

    }else if (current === STEP_TWO) {
      stepClassList.remove("active");
      stepClassList.add("done");
      checkoutSections[current].classList.remove("active");
      current = STEP_THREE;
      stepClassList = stepItems[current].classList;
      stepClassList.add("active");
      checkoutSections[current].classList.add("active");
    } else if (current === STEP_THREE) {
        return
    }
}
function goBack(){
    let stepClassList = stepItems[current].classList;

    if (current === STEP_ONE) {
        return;
    } else if (current === STEP_TWO) {
        stepClassList.remove("active");
        checkoutSections[current].classList.remove('active')
        current=STEP_ONE
        stepClassList = stepItems[current].classList;
        stepClassList.remove("done");
        stepClassList.add("active");
        checkoutSections[current].classList.add("active");
    } else if (current === STEP_THREE) {
        stepClassList.remove("active");
        checkoutSections[current].classList.remove("active");
        current = STEP_TWO;
        stepClassList = stepItems[current].classList;
        stepClassList.remove("done");
        stepClassList.add("active");
        checkoutSections[current].classList.add("active");
    }
}
function checkFinalNextButton() {
  
  if (current === STEP_THREE) {
    nextButtons.forEach((btn) => {
      btn.innerHTML = "確認訂單";
    });
  }else{
      nextButtons.forEach((btn) => {
        btn.innerHTML = `
        下一步
              <span>
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M16.6402 8.11673C16.8271 7.96109 17.1302 7.96109 17.3171 8.11673L22.3598 12.3158L22.416 12.3719C22.5467 12.53 22.5246 12.7488 22.3517 12.8861L17.3089 16.8899L17.2413 16.9347C17.0518 17.0386 16.7944 17.0181 16.6322 16.8765L16.5784 16.8202C16.4537 16.6624 16.4783 16.448 16.6483 16.313L20.8211 13H2.47619L2.39059 12.9919C2.16845 12.9496 2 12.7455 2 12.5C2 12.2239 2.2132 12 2.47619 12H20.6277L16.6402 8.68037L16.5848 8.62517C16.4556 8.46984 16.474 8.25508 16.6402 8.11673Z"
                fill="white"
              />
            </svg>
        `;
      });
  }
}
function checkPreButtonAble(){
    const isDisable =
      prevButtons[0].classList.contains("disable") &&
      prevButtons[1].classList.contains("disable");

    
    if((current===STEP_TWO || current===STEP_THREE) && isDisable){
        prevButtons.forEach(btn=>{
            btn.classList.remove('disable');
        })
    }else if(current===STEP_ONE){
        prevButtons.forEach((btn) => {
          btn.classList.add("disable");
        });
    }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  console.log(isDarkMode);
  if (isDarkMode) {
    document.documentElement.setAttribute("data-theme", "dark")
   
  } else {
    document.documentElement.setAttribute("data-theme", "light")
     
  }
  displayThemeIcon();
}
function displayThemeIcon() {
  if (isDarkMode) {
    moon.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 4.20669C12.1768 4.20669 12.3464 4.13645 12.4714 4.01143C12.5964 3.8864 12.6666 3.71683 12.6666 3.54002V1.27336C12.6666 1.09655 12.5964 0.926976 12.4714 0.801952C12.3464 0.676927 12.1768 0.606689 12 0.606689C11.8232 0.606689 11.6536 0.676927 11.5286 0.801952C11.4036 0.926976 11.3333 1.09655 11.3333 1.27336V3.54002C11.3333 3.71683 11.4036 3.8864 11.5286 4.01143C11.6536 4.13645 11.8232 4.20669 12 4.20669Z" fill="white" fill-opacity="0.8"/>
<path d="M12 19.7933C11.8232 19.7933 11.6536 19.8636 11.5286 19.9886C11.4036 20.1136 11.3333 20.2832 11.3333 20.46V22.7267C11.3333 22.9035 11.4036 23.073 11.5286 23.1981C11.6536 23.3231 11.8232 23.3933 12 23.3933C12.1768 23.3933 12.3464 23.3231 12.4714 23.1981C12.5964 23.073 12.6666 22.9035 12.6666 22.7267V20.46C12.6666 20.2832 12.5964 20.1136 12.4714 19.9886C12.3464 19.8636 12.1768 19.7933 12 19.7933Z" fill="white" fill-opacity="0.8"/>
<path d="M5.54668 6.49335C5.67065 6.60603 5.83249 6.66792 6.00001 6.66668C6.08775 6.66719 6.17473 6.65037 6.25595 6.6172C6.33718 6.58402 6.41105 6.53514 6.47335 6.47335C6.53583 6.41137 6.58543 6.33764 6.61928 6.2564C6.65312 6.17516 6.67055 6.08802 6.67055 6.00002C6.67055 5.91201 6.65312 5.82487 6.61928 5.74363C6.58543 5.66239 6.53583 5.58866 6.47335 5.52668L4.88668 3.94668C4.75915 3.83746 4.5951 3.78039 4.42731 3.78687C4.25953 3.79335 4.10037 3.86291 3.98164 3.98164C3.86291 4.10037 3.79335 4.25953 3.78687 4.42731C3.78039 4.5951 3.83746 4.75915 3.94668 4.88668L5.54668 6.49335Z" fill="white" fill-opacity="0.8"/>
<path d="M18.4533 17.5067C18.3912 17.4445 18.3174 17.3952 18.2362 17.3616C18.155 17.3279 18.0679 17.3106 17.98 17.3106C17.8921 17.3106 17.8051 17.3279 17.7238 17.3616C17.6426 17.3952 17.5688 17.4445 17.5067 17.5067C17.4445 17.5688 17.3952 17.6426 17.3616 17.7238C17.3279 17.8051 17.3106 17.8921 17.3106 17.98C17.3106 18.0679 17.3279 18.155 17.3616 18.2362C17.3952 18.3174 17.4445 18.3912 17.5067 18.4533L19.1133 20.0533C19.1751 20.1163 19.2487 20.1664 19.33 20.2008C19.4112 20.2351 19.4985 20.253 19.5867 20.2533C19.7625 20.2508 19.9302 20.1789 20.0533 20.0533C20.1775 19.9284 20.2472 19.7595 20.2472 19.5833C20.2472 19.4072 20.1775 19.2382 20.0533 19.1133L18.4533 17.5067Z" fill="white" fill-opacity="0.8"/>
<path d="M4.20669 12C4.20669 11.8232 4.13645 11.6536 4.01143 11.5286C3.8864 11.4036 3.71683 11.3333 3.54002 11.3333H1.27336C1.09655 11.3333 0.926976 11.4036 0.801952 11.5286C0.676927 11.6536 0.606689 11.8232 0.606689 12C0.606689 12.1768 0.676927 12.3464 0.801952 12.4714C0.926976 12.5964 1.09655 12.6666 1.27336 12.6666H3.54002C3.71683 12.6666 3.8864 12.5964 4.01143 12.4714C4.13645 12.3464 4.20669 12.1768 4.20669 12Z" fill="white" fill-opacity="0.8"/>
<path d="M22.7267 11.3333H20.46C20.2832 11.3333 20.1136 11.4036 19.9886 11.5286C19.8636 11.6536 19.7933 11.8232 19.7933 12C19.7933 12.1768 19.8636 12.3464 19.9886 12.4714C20.1136 12.5964 20.2832 12.6666 20.46 12.6666H22.7267C22.9035 12.6666 23.073 12.5964 23.1981 12.4714C23.3231 12.3464 23.3933 12.1768 23.3933 12C23.3933 11.8232 23.3231 11.6536 23.1981 11.5286C23.073 11.4036 22.9035 11.3333 22.7267 11.3333Z" fill="white" fill-opacity="0.8"/>
<path d="M5.54666 17.5067L3.94666 19.1133C3.85304 19.2062 3.78906 19.3247 3.7628 19.4539C3.73655 19.5831 3.74919 19.7172 3.79914 19.8392C3.84909 19.9613 3.93411 20.0657 4.04343 20.1394C4.15275 20.2131 4.28147 20.2528 4.41332 20.2533C4.50153 20.253 4.58878 20.2351 4.67003 20.2008C4.75128 20.1664 4.82491 20.1163 4.88666 20.0533L6.49332 18.4533C6.61886 18.3278 6.68938 18.1575 6.68938 17.98C6.68938 17.8025 6.61886 17.6322 6.49332 17.5067C6.36779 17.3811 6.19752 17.3106 6.01999 17.3106C5.84245 17.3106 5.67219 17.3811 5.54666 17.5067Z" fill="white" fill-opacity="0.8"/>
<path d="M18 6.66665C18.0877 6.66716 18.1747 6.65034 18.2559 6.61716C18.3372 6.58399 18.411 6.5351 18.4733 6.47332L20.0733 4.86665C20.1975 4.74174 20.2672 4.57277 20.2672 4.39665C20.2672 4.22053 20.1975 4.05156 20.0733 3.92665C19.9484 3.80248 19.7795 3.73279 19.6033 3.73279C19.4272 3.73279 19.2582 3.80248 19.1333 3.92665L17.5267 5.52665C17.4642 5.58862 17.4146 5.66236 17.3807 5.7436C17.3469 5.82484 17.3295 5.91197 17.3295 5.99998C17.3295 6.08799 17.3469 6.17513 17.3807 6.25637C17.4146 6.33761 17.4642 6.41134 17.5267 6.47332C17.589 6.5351 17.6628 6.58399 17.7441 6.61716C17.8253 6.65034 17.9123 6.66716 18 6.66665Z" fill="white" fill-opacity="0.8"/>
<path d="M12.0866 5.16669C10.7474 5.14951 9.4333 5.53092 8.31138 6.26246C7.18946 6.994 6.31039 8.04262 5.78593 9.27502C5.26147 10.5074 5.11531 11.8679 5.36602 13.1836C5.61673 14.4993 6.25299 15.7107 7.19391 16.6639C8.13484 17.617 9.33794 18.2689 10.6503 18.5366C11.9626 18.8042 13.3249 18.6757 14.564 18.1672C15.803 17.6587 16.8629 16.7932 17.6089 15.6808C18.3548 14.5684 18.7532 13.2594 18.7533 11.92C18.7622 10.1412 18.0654 8.43144 16.8157 7.16551C15.5661 5.89958 13.8654 5.18079 12.0866 5.16669ZM12.0866 17.3334C11.0109 17.3506 9.9543 17.0472 9.05151 16.4619C8.14872 15.8766 7.44056 15.0359 7.0172 14.0467C6.59385 13.0576 6.47446 11.9648 6.67424 10.9076C6.87402 9.85043 7.38394 8.8766 8.13904 8.11017C8.89415 7.34374 9.86028 6.81938 10.9144 6.60388C11.9685 6.38839 13.0629 6.49149 14.0582 6.90007C15.0536 7.30866 15.9048 8.00423 16.5034 8.8982C17.1021 9.79218 17.4212 10.8441 17.42 11.92C17.4271 13.3441 16.87 14.713 15.8706 15.7274C14.8711 16.7419 13.5106 17.3193 12.0866 17.3334Z" fill="white" fill-opacity="0.8"/>
</svg>

        `;
  } else {
    moon.innerHTML = `
        <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 1.5C5.75 1.5 1.25 5.25 1.25 11.25C1.25 17.25 5.75 21.75 11.75 21.75C17.75 21.75 21.5 17.25 21.5 13.5C13.25 18.75 4.25 9.75 9.5 1.5Z"
                stroke="#2A2A2A"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
        `;
  }
}
moon.addEventListener("click", toggleTheme);
nextButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        moveForward();
        checkPreButtonAble();
        checkFinalNextButton();
    })
})
prevButtons.forEach(btn=>{
    btn.addEventListener('click',()=>{
        goBack();
        checkPreButtonAble();
        checkFinalNextButton();
        
    }
    );
})