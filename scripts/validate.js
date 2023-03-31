//*ПАРАМЕТРЫ СКРИПТА
const parametersValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-edit",
  inactiveButtonClass: "popup__save-edit_inactive",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_active",
};

//*ПОКАЗАТЬ ОШИБКУ
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(parametersValidation.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(parametersValidation.errorClass);
};

//*СКРЫТЬ ОШИБКУ
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
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
//*СКРЫТЬ ТЕКСТ ОШИБКИ
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(parametersValidation.inputErrorClass);
  errorElement.classList.remove(parametersValidation.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(parametersValidation.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    parametersValidation.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);

      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(parametersValidation.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
      setEventListeners(formElement);
    });
  });
};

// enableValidation();
enableValidation();
