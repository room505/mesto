import {
  formEdit,
  formAddCard,
  author,
  aboutTheAuthor,
  initialCards,
  validationConfig,
  cardListSelector,
  cardTemplateSelector,
  popupSelectorWhitImg,
  addCardButton,
  editProfileButton,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

function createCard(element) {
  const card = new Card(element, cardTemplateSelector, handleOpenPopup);

  const renderCards = card.generateCard();

  return renderCards;
}

const cardList = new Section(
  {
    data: initialCards,
    renderer: (element) => {
      cardList.setItem(createCard(element));
    },
  },
  cardListSelector
);

//*ФУНКЦИЯ ДЛЯ КНОПКИ SUBMIT, ИСПОЛЬЗУЕТСЯ В ФОРМЕ "formAddCard", ДОБАВЛЕНИЕ НОВОЙ КАРТОЧКИ
function handleAddFormSubmit(data) {
  cardList.setItem(createCard(data));
  popupAddImage.close();
}

//*ФУНКЦИЯ ДЛЯ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА ПРИ СОЗДАНИИ КАРТОЧКИ, ИСПОЛЬЗУЕТСЯ В КЛАССЕ "CARD"
function handleOpenPopup(name, link) {
  fullScreenCard.open(name, link);
}

//*UserInfo
const userInfo = new UserInfo({
  authorSelector: ".profile__author",
  aboutTheAuthorSelector: ".profile__about-the-author",
});

//*ФУНКЦИЯ ДЛЯ КНОПКИ SUBMIT, ИСПОЛЬЗУЕТСЯ В ФОРМЕ "formEdit", РЕДАКТИРОВАНИЕ ПРОФИЛЯ ПОЛЬЗОВАТЕЛЯ
function handleEditFormSubmit(data) {
  userInfo.setUserInfo({
    author: data["name"],
    aboutTheAuthor: data["editAboutTheAuthor"],
  });
  popupEditProfile.close();
}

//*ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ, ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEditProfileValidator = new FormValidator(validationConfig, formEdit);
popupEditProfileValidator.enableValidation();

//*ПОДКЛЮЧЕНИЕ ВАЛИДАЦИИ, ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupAddProfileValidator = new FormValidator(
  validationConfig,
  formAddCard
);
popupAddProfileValidator.enableValidation();

//*МОДАЛЬНЫЕ ОКНА
//*МОДАЛЬНОЕ ОКНО, ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const popupEditProfile = new PopupWithForm(
  ".popup_type_edit-profile",
  handleEditFormSubmit
);
popupEditProfile.setEventListeners();

//*МОДАЛЬНОЕ ОКНО, ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupAddImage = new PopupWithForm(
  ".popup_type_add-card",
  handleAddFormSubmit
);
popupAddImage.setEventListeners();

//*СЛУШАТЕЛЬ НА КНОПКУ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА, ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
addCardButton.addEventListener("click", () => {
  popupAddImage.open();
});

//*СЛУШАТЕЛЬ НА КНОПКУ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА, ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editProfileButton.addEventListener("click", () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  author.value = data.author;
  aboutTheAuthor.value = data.aboutTheAuthor;
});

//*МОДАЛЬНОЕ ОКНО ДЛЯ СОЗДАНЫХ КАРТОЧЕК
const fullScreenCard = new PopupWithImage(popupSelectorWhitImg);
fullScreenCard.setEventListeners();

//*ОТРИСОВКА ЗАДАННЫХ КАРТОЧЕК "initialCards"

cardList.renderItems();
