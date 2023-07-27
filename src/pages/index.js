import {
  formEdit,
  formAddCard,
  author,
  aboutTheAuthor,
  validationConfig,
  cardListSelector,
  cardTemplateSelector,
  popupSelectorWhitImg,
  addCardButton,
  editProfileButton,
  editAvatar,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import "./index.css";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-71",
  headers: {
    "Content-Type": "application/json",
    authorization: "8c99eae8-3828-437f-8671-7867c2b90d9d",
  },
});

let userId;

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then(([initialCards, userData]) => {
    userInfo.setUserInfo(userData);
    userId = userData._id;
    section.renderItems(initialCards);
  })
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });

//*ИФНО ПОЛЬЗОВАТЕЛЯ
const userInfo = new UserInfo({
  authorSelector: ".profile__author",
  aboutTheAuthorSelector: ".profile__about-the-author",
  avatarSelector: ".profile__avatar",
});

//*СОЗДАНИЕ КАРТОЧЕК
function createCard(element) {
  const card = new Card({
    data: element,
    templateSelector: cardTemplateSelector,
    userId: userId,
    handleOpenPopup: (name, link) => {
      fullScreenCard.open(name, link);
    },
    handleDeleteCardClick: (cardId) => {
      popupDeleteCard.open();
      popupDeleteCard.submitCallback(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            popupDeleteCard.close();
            card.deleteCard();
          })
          .catch((err) => {
            console.log(`Ошибка: ${err}`);
          });
      });
    },
    handleLikeClick: (cardId) => {
      api
        .addLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
    handleDeleteLikeClick: (cardId) => {
      api
        .removeLike(cardId)
        .then((data) => {
          card.handleLikeCard(data);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    },
  });

  const renderCards = card.generateCard();

  return renderCards;
}

//*МОДАЛЬНОЕ ОКНО ДЛЯ СОЗДАНЫХ КАРТОЧЕК
const fullScreenCard = new PopupWithImage(popupSelectorWhitImg);
fullScreenCard.setEventListeners();
//*МОДАЛЬНОЕ ОКНО, ФОРМА УДАЛЕНИЯ КАРТОЧКИ

const popupDeleteCard = new PopupWithConfirmation(".popup_delete-card");
popupDeleteCard.setEventListeners();

//*МОДАЛЬНОЕ ОКНО, ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
const popupAddImage = new PopupWithForm({
  popupSelector: ".popup_type_add-card",
  handleFormSubmit: (data) => {
    popupAddImage.loading(true);
    api
      .addNewCard(data)
      .then((data) => {
        section.setItem(createCard(data));
        popupAddImage.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupAddImage.loading(false);
      });
  },
});
popupAddImage.setEventListeners();

//*СЛУШАТЕЛЬ НА КНОПКУ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА, ФОРМА ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ
addCardButton.addEventListener("click", () => {
  popupAddImage.open();
});

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
const popupEditProfile = new PopupWithForm({
  popupSelector: ".popup_type_edit-profile",
  handleFormSubmit: (data) => {
    popupEditProfile.loading(true);
    api
      .editUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
        popupEditProfile.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditProfile.loading(false);
      });
  },
});
popupEditProfile.setEventListeners();

//*СЛУШАТЕЛЬ НА КНОПКУ ОТКРЫТИЯ МОДАЛЬНОГО ОКНА, ФОРМА РЕДАКТИРОВАНИЯ ПРОФИЛЯ
editProfileButton.addEventListener("click", () => {
  popupEditProfile.open();
  const data = userInfo.getUserInfo();
  author.value = data.author;
  aboutTheAuthor.value = data.aboutTheAuthor;
});

//*АВАТАР

const avatar = document.querySelector(".profile__avatar");
const popupEditAvatarValidator = new FormValidator(
  validationConfig,
  editAvatar
);
popupEditAvatarValidator.enableValidation();

avatar.addEventListener("click", () => {
  popupEditAvatar.open();
});

//* Создание попапа редактирования аватара пользователя
const popupEditAvatar = new PopupWithForm({
  popupSelector: ".popup_type_edit-avatar",
  handleFormSubmit: (data) => {
    popupEditAvatar.loading(true);
    api
      .editAvatar(data)
      .then((data) => {
        userInfo.setUserInfo(data);

        popupEditAvatar.close();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        popupEditAvatar.loading(false);
      });
  },
});
popupEditAvatar.setEventListeners();

//*ОТРИСОВКА ЗАДАННЫХ КАРТОЧЕК
const section = new Section(
  {
    renderer: (element) => {
      section.setItem(createCard(element));
    },
  },
  cardListSelector
);
