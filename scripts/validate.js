//*ПАРАМЕТРЫ СКРИПТА
const parametersValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-edit",
  inactiveButtonClass: "popup__save-edit_inactive",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_active",
};

//*formList - список форм
//*formElement - форма из списка
//*inputList - список полей формы
//*inputElement - поле формы
//*errorElement - текст ошибки поля формы

//*ПОКАЗАТЬ ОШИБКУ
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parametersValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parametersValidation.errorClass);
};

//*СКРЫТЬ ТЕКСТ ОШИБКИ
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parametersValidation.inputErrorClass);
  errorElement.classList.remove(parametersValidation.errorClass);
  errorElement.textContent = "";
};

//*Если все поля валидны — активировать кнопку, если хотя бы одно нет — заблокировать
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    //* Если поле не валидно, колбэк вернёт true
    //* Обход массива прекратится и вся функция
    //* hasInvalidInput вернёт true
    return !inputElement.validity.valid;
  });
};

//*АКТИВАЦИЯ КНОПКИ СОХРАНИТЬ
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(parametersValidation.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(parametersValidation.inactiveButtonClass);
  }
};

//*НЕКТИВНЫЙ ENTER
const disabledEnterButton = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(parametersValidation.inputSelector)
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("keydown", (evt) => {
      if (!inputElement.validity.valid) {
        if (evt.keyCode === 13) {
          evt.preventDefault();
          console.log("command om");
        }
      }
    });
  });
};

//*ПРОВЕРИТЬ ВАЛИДАЦИЮ
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//*УСТАНОВИТЬ СЛУШАТЕЛЬ
const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(parametersValidation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    parametersValidation.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);

  disabledEnterButton(formElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (evt) {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);

      disabledEnterButton(formElement);
    });
  });
};

//*ВКЛЮЧИТЬ ВАЛИДАЦИЮ
const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(parametersValidation.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
  });
};

enableValidation();
