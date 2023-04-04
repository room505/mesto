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

  disabledButton(buttonElement, rest);

  disabledEnterButton(formElement, inputSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function (evt) {
      checkInputValidity(formElement, inputElement, rest);

      if (hasInvalidInput(inputList)) {
        disabledButton(buttonElement, rest);
      } else {
        enabledButton(buttonElement, rest);
      }

      disabledEnterButton(formElement, inputSelector);
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

// //*АКТИВАЦИЯ КНОПКИ СОХРАНИТЬ
// const toggleButtonState = (
//   inputList,
//   buttonElement,
//   { inactiveButtonClass }
// ) => {
//   if (hasInvalidInput(inputList)) {
//     buttonElement.classList.add(inactiveButtonClass);
//     console.log("button inactive");
//   } else {
//     buttonElement.classList.remove(inactiveButtonClass);
//     console.log("button active");
//   }
// };
const enabledButton = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute("disabled");
};

const disabledButton = (buttonElement, { inactiveButtonClass }) => {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

//*НЕКТИВНЫЙ ENTER
const disabledEnterButton = (formElement, { inputSelector }) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
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
