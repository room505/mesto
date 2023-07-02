import {
  initialCards,
  validationConfig,
  cardListSelector,
  cardTemplateSelector,
  popupSelectorWhitImg,
} from "./constants.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";

//*ПУСТЫШКА ДЛЯ ПРОВЕРКИ КЛАССА
function handleOpenPopup(name, link) {
  fullScreenCard.open(name, link);
}

//*UserInfo

const userInfo = new UserInfo({
  authorSelector: ".profile__author",
  aboutTheAuthorSelector: ".profile__about-the-author",
});

function handleEditFormSubmit(data) {
  userInfo.setUserInfo({
    author: data["name"],
    aboutTheAuthor: data["editAboutTheAuthor"],
  });
  popupEditProfile.close();
}

function handleAddFormSubmit(data) {
  console.log(data);

  const newCard = new Card(data, cardTemplateSelector, handleOpenPopup);

  popupAddImage.close();
  return newCard.generateCard();
}

//*Формы
const formEdit = document.querySelector(".popup__form_type_edit-profile");
const formAddCard = document.querySelector(".popup__form_type_add-card");

const popupEditProfileValidator = new FormValidator(validationConfig, formEdit);
popupEditProfileValidator.enableValidation();
const popupAddProfileValidator = new FormValidator(
  validationConfig,
  formAddCard
);
popupAddProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleEditFormSubmit
);
popupEditProfile.setEventListeners();

const popupAddImage = new PopupWithForm(
  ".popup_type_add-card",
  handleAddFormSubmit
);
popupAddImage.setEventListeners();

document.querySelector(".profile__add-button").addEventListener("click", () => {
  popupAddImage.open();
});

const author = formEdit.querySelector(".popup__text-input_edit_author");
const aboutTheAuthor = formEdit.querySelector(
  ".popup__text-input_edit_about-the-author"
);

document
  .querySelector(".profile__button-edit")
  .addEventListener("click", () => {
    popupEditProfile.open();
    const data = userInfo.getUserInfo();
    author.value = data.author;
    aboutTheAuthor.value = data.aboutTheAuthor;
  });

const fullScreenCard = new PopupWithImage(popupSelectorWhitImg);
fullScreenCard.setEventListeners();

const renderCard = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardTemplateSelector, handleOpenPopup);
      const renderCards = card.generateCard();
      renderCard.setItem(renderCards);
    },
  },
  cardListSelector
);

renderCard.renderItems();

// const author = document.querySelector(".profile__author");
// const aboutTheAuthor = document.querySelector(".profile__about-the-author");
// const editButton = document.querySelector(".profile__button-edit");

// const cardTable = document.querySelector(".elements");

// //*ПЕРЕМЕННЫЕ РЕДАКТИРОВАНИЯ ПРОФИЛЯ
// const popupEdit = document.querySelector(".popup_type_edit-profile");
// const popupEditForm = popupEdit.querySelector(".popup__form");

// const validPopupEditForm = new FormValidator(validationConfig, popupEditForm);
// validPopupEditForm.enableValidation();

// const closeProfilePopup = popupEdit.querySelector(".popup__close");
// const renameAuthor = popupEdit.querySelector(".popup__text-input_edit_author");
// const editAboutTheAuthor = popupEdit.querySelector(
//   ".popup__text-input_edit_about-the-author"
// );

// //*ПЕРЕМЕННЫЕ ДОБАВЛЕНИЯ НОВОЙ КАРТЫ
// const addButton = document.querySelector(".profile__add-button");
// const popupAddCard = document.querySelector(".popup_type_add-card");
// const popupAddCardForm = popupAddCard.querySelector(".popup__form");

// const validPopupAddCardForm = new FormValidator(
//   validationConfig,
//   popupAddCardForm
// );
// validPopupAddCardForm.enableValidation();

// const closeAddCardPopup = popupAddCard.querySelector(".popup__close");
// const addTittleCard = popupAddCard.querySelector(
//   ".popup__text-input_title-card"
// );
// const addUrlPhoto = popupAddCard.querySelector(".popup__text-input_photo-link");

// //*Модальное окно для карточек
// const popupZoomCard = document.querySelector(".popup_full-screen");
// const photoZoomCard = popupZoomCard.querySelector(".popup__full-screen-photo");
// const titleZoomCard = popupZoomCard.querySelector(".popup__title-for-photo");
// const closeBtnZoomCard = popupZoomCard.querySelector(".popup__close");

// const closePopupByOverlay = (evt) => {
//   if (evt.target === evt.currentTarget) {
//     closePopup(evt.currentTarget);
//   }
// };

// //*ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
// function closePopup(popup) {
//   popup.classList.remove("popup_open");
//   popup.removeEventListener("mousedown", closePopupByOverlay);
//   document.removeEventListener("keydown", closePopupEscapeButton);
// }

// //*ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
// function openPopup(popup) {
//   popup.classList.add("popup_open");
//   popup.addEventListener("mousedown", closePopupByOverlay);
//   document.addEventListener("keydown", closePopupEscapeButton);
// }

// function closePopupEscapeButton(evt) {
//   if (evt.key === "Escape") {
//     const openedPopup = document.querySelector(".popup_open");
//     closePopup(openedPopup);
//   }
// }

// function handleOpenPopup(image, title) {
//   openPopup(popupZoomCard);
//   photoZoomCard.src = image;
//   photoZoomCard.alt = title;
//   titleZoomCard.textContent = title;
//   closeBtnZoomCard.addEventListener("click", () => {
//     closePopup(popupZoomCard);
//   });
// }

// //*ОТКРЫТИЕ МОДАЛЬНОГО ОКНА + КОНТЕЙНЕРА
// function handleProfilePopupOpen() {
//   renameAuthor.value = author.textContent;
//   editAboutTheAuthor.value = aboutTheAuthor.textContent;
//   openPopup(popupEdit);
//   closeProfilePopup.addEventListener("click", () => closePopup(popupEdit));
// }

// //*СОХРАНЕНИЕ ИЗМЕНЕНИЙ ПРОФИЛЯ
// function saveEditProfile(evt) {
//   evt.preventDefault();
//   author.textContent = renameAuthor.value;
//   aboutTheAuthor.textContent = editAboutTheAuthor.value;
//   closePopup(popupEdit);
//   popupEditForm.reset();
// }

// editButton.addEventListener("click", handleProfilePopupOpen);

// popupEditForm.addEventListener("submit", saveEditProfile);

// function handleAddCardPopupOpen() {
//   popupAddCardForm.reset();
//   openPopup(popupAddCard);
//   closeAddCardPopup.addEventListener("click", () => closePopup(popupAddCard));
// }

// addButton.addEventListener("click", handleAddCardPopupOpen);

// //**ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
// function renderInitialCards() {
//   initialCards.forEach((item) => {
//     const card = new Card(item, ".template-element", handleOpenPopup);

//     const renderCard = card.generateCard();

//     cardTable.append(renderCard);
//   });
// }

// function submitAddNewCard(evt) {
//   evt.preventDefault();

//   const newData = {
//     name: addTittleCard.value,
//     link: addUrlPhoto.value,
//   };

//   const newCard = new Card(newData, ".template-element", handleOpenPopup);

//   const renderNewCard = newCard.generateCard();

//   cardTable.prepend(renderNewCard);

//   closePopup(popupAddCard);
// }

// popupAddCardForm.addEventListener("submit", submitAddNewCard);

// renderInitialCards();
