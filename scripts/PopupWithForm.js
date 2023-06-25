import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputsList = this._popupForm.querySelectorAll(".popup__text-input");
    this._submitButton = this._popupForm.querySelector(".popup__save-edit");
  }

  __getInputValues() {
    this._formValues = {};
    this._inputsList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this.__getInputValues());
    });
  }

  close() {
    super.close();
    this._popupForm.reset;
  }
}
