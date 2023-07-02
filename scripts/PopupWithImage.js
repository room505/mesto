import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__full-screen-photo");
    this._popupTitleForImage = this._popup.querySelector(
      ".popup__title-for-photo"
    );
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupTitleForImage.textContent = name;
    super.open();
  }
}
