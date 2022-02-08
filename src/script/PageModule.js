export class Page {
  #stepItem;
  #section;
  constructor(stepItem, section) {
    this.#stepItem = stepItem;
    this.#section = section;
  }
  show = function () {
    this.#stepItem.classList.add("active");
    this.#stepItem.classList.remove("done");
    this.#section.classList.add("active");
  };
  hide = function () {
    this.#stepItem.classList.remove("active");
    this.#stepItem.classList.remove("done");
    this.#section.classList.remove("active");
  };
  done = function () {
    this.#stepItem.classList.add("active");
    this.#stepItem.classList.add("done");
    this.#section.classList.remove("active");
  };
}
