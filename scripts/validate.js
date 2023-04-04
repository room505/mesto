//*ПАРАМЕТРЫ СКРИПТА
const validationConfig = {
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

//*ВКЛЮЧИТЬ ВАЛИДАЦИЮ
const enableValidation = ({ formSelector, ...rest }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

//*УСТАНОВИТЬ СЛУШАТЕЛЬ
const setEventListeners = (
  formElement,
  { inputSelector, submitButtonSelector, ...rest }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);

  disabledEnterButton(formElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (evt) {
      checkInputValidity(formElement, inputElement, rest);

      toggleButtonState(inputList, buttonElement);

      disabledEnterButton(formElement);
    });
  });
};

//*ПОКАЗАТЬ ОШИБКУ
const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//*СКРЫТЬ ТЕКСТ ОШИБКИ
const hideInputError = (
  formElement,
  inputElement,
  { inputErrorClass, errorClass }
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

//*ПРОВЕРИТЬ ВАЛИДАЦИЮ
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
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
const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    console.log("button inactive");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    console.log("button active");
  }
};

//*НЕКТИВНЫЙ ENTER
const disabledEnterButton = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
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

enableValidation(validationConfig);
