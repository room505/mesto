export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__text-input",
  submitButtonSelector: ".popup__save-edit",
  inactiveButtonClass: "popup__save-edit_inactive",
  inputErrorClass: "popup__text-input_type_error",
  errorClass: "popup__text-input-error_active",
};

//*ФОРМЫ
//*ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
export const formEdit = document.querySelector(
  ".popup__form_type_edit-profile"
);
//*ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
export const formAddCard = document.querySelector(".popup__form_type_add-card");
export const author = formEdit.querySelector(".popup__text-input_edit_author");
export const aboutTheAuthor = formEdit.querySelector(
  ".popup__text-input_edit_about-the-author"
);

//*НОВЫЙ АВАТАР
export const editAvatar = document.querySelector(
  ".popup__form_type_edit-avatar"
);

export const cardListSelector = ".elements";
export const cardTemplateSelector = ".template-element";
export const popupSelectorWhitImg = ".popup_full-screen";

export const addCardButton = document.querySelector(".profile__add-button");
export const editProfileButton = document.querySelector(
  ".profile__button-edit"
);
