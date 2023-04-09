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

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (evt) {
      checkInputValidity(formElement, inputElement, rest);

      if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, rest);
      } else {
        enabledButton(buttonElement, rest);
      }
    });
  });
};

//*ПРОВЕРИТЬ ВАЛИДАЦИЮ
const checkInputValidity = (formElement, inputElement, { ...rest }) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      rest
    );
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
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

const enabledButton = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

const disabledButton = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};
