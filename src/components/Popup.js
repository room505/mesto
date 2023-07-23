export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(".popup__close");
    this._closePopupEscapeButton = this._handleEscClose.bind(this);
  }

  close() {
    this._popup.classList.remove("popup_open");
    document.removeEventListener("keydown", this._closePopupEscapeButton);
  }

  open() {
    this._popup.classList.add("popup_open");
    document.addEventListener("keydown", this._closePopupEscapeButton);
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
  }


}
