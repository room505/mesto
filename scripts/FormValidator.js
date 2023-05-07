export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;

    //*ПЕРЕПИСАТЬ
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.formSubmit
    );
  }

  //*ПРОВЕРИТЬ ВАЛИДАЦИЮ
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
        // rest
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //*ПОКАЗАТЬ ОШИБКУ
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
  }

  //*СКРЫТЬ ТЕКСТ ОШИБКИ
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = "";
  }

  _enabledButton(buttonElement) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }

  _disabledButton(buttonElement) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  }

  //*УСТАНОВИТЬ СЛУШАТЕЛЬ
  _setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
      this._disabledButton(buttonElement);

      inputElement.addEventListener("input", function (evt) {
        this._checkInputValidity(formElement, inputElement);

        if (this._hasInvalidInput(inputList)) {
          this._disabledButton(buttonElement);
        } else {
          this._enabledButton(buttonElement);
        }
      });
      formElement.addEventListener("reset", () => {
        this._disabledButton(buttonElement);
      });
    });
  }

  enableValidation() {
    // const formList = Array.from(document.querySelectorAll(formSelector));
    // formList.forEach((formElement) => {
    //   formElement.addEventListener("submit", function (evt) {
    //     evt.preventDefault();
    //   });
    this._setEventListeners(formElement);
    // });
  }
}
