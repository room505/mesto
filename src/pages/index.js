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
import Api from "../components/Api.js";
import "./index.css";

//*UserInfo
const userInfo = new UserInfo({
  authorSelector: ".profile__author",
  aboutTheAuthorSelector: ".profile__about-the-author",
  avatarSelector: ".profile__avatar",
});

const formDeleteCard = document.querySelector(".popup__form_delete-card");

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-71",
  headers: {
    authorization: "8c99eae8-3828-437f-8671-7867c2b90d9d",
    "Content-Type": "application/json",
  },
});

function handleLikeClick(cardId, changeLikeCounter, colorLike, isAddLike) {
  if (isAddLike) {
    api
      .addLike(cardId)
      .then((response) => {
        changeLikeCounter(response.likes.length);
        colorLike();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  } else {
    api
      .removeLike(cardId)
      .then((response) => {
        changeLikeCounter(response.likes.length);
        colorLike();
      })
      .catch((error) => console.log(`Ошибка: ${error}`));
  }
}

let currentUserId;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then((response) => {
    userInfo.setUserInfo({
      link: response[0].avatar,
      author: response[0].name,
      aboutTheAuthor: response[0].about,
    });
    currentUserId = response[0]._id;
    cardList.renderItems(response[0]);
    console.log();
  })
  .catch((error) => console.log(`Ошибка: ${error}`));

function createCard(element) {
  const card = new Card(
    element,
    cardTemplateSelector,
    handleOpenPopup,
    currentUserId,
    handleLikeClick
  );

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
