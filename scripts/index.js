const author = document.querySelector(".profile__author");
const aboutTheAutor = document.querySelector(".profile__about-the-author");
const editButton = document.querySelector(".profile__button-edit");

const popupEdit = document.querySelector(".popup_type_edit-profile");
const popupEditForm = popupEdit.querySelector(".popup__form");
const closeProfilePopup = popupEdit.querySelector(".popup__close");
const saveEdit = popupEdit.querySelector(".popup__save-edit");
const renameAuthor = popupEdit.querySelector(".popup__text-input_edit_author");
const editAboutTheAuthor = popupEdit.querySelector(
  ".popup__text-input_edit_about-the-author"
);

//РЕДАКТИРОВАНИЕ ПРОФИЛЯ
function closePopup(popup) {
  popup.classList.remove("popup_open");
}

//Открытие поп
function openPopup(popup) {
  popup.classList.add("popup_open");
}

//ОТКРЫТИЕ МОДАЛЬНОГО ОКНА + КОНТЕЙНЕРА
function handleProfilePopup() {
  renameAuthor.value = author.textContent;
  editAboutTheAuthor.value = aboutTheAutor.textContent;
  openPopup(popupEdit);
}

function saveEditProfile(evt) {
  evt.preventDefault();
  author.textContent = renameAuthor.value;
  aboutTheAutor.textContent = editAboutTheAuthor.value;
  closePopup(popupEdit);
}

editButton.addEventListener("click", handleProfilePopup);

closeProfilePopup.addEventListener("click", () => closePopup(popupEdit));

popupEditForm.addEventListener("submit", saveEditProfile);

const popupAddCard = document.querySelector(".popup_type_add-card");
const addButton = document.querySelector(".profile__add-button");
const popupAddCardForm = popupAddCard.querySelector('.popup__form')
const closeAddCardPopup = popupAddCard.querySelector(".popup__close");
const addTittleCard = popupAddCard.querySelector(
  ".popup__text-input_title-card"
);
const addUrlPhoto = popupAddCard.querySelector(".popup__text-input_photo-link");

function handleAddCardPopup() {
  addTittleCard.value = '';
  addUrlPhoto.value = '';
  openPopup(popupAddCard);
}

function saveAddPhoto(evt) {
  evt.preventDefault();
  // author.textContent = renameAuthor.value;
  // aboutTheAutor.textContent = editAboutTheAuthor.value;
  closePopup(popupAddCard);
}

addButton.addEventListener("click", handleAddCardPopup);

closeAddCardPopup.addEventListener("click", () => closePopup(popupAddCard));

popupAddCardForm.addEventListener("submit", saveAddPhoto);

//==============================================================================================

const templateElement = document.querySelector('.template-element').content;

function createCard (dataCard) {
  const newCard = templateElement.querySelector('.element').cloneNode(true);
  const photoCard = newCard.querySelector('.element__photo')
  const titleCard = newCard.querySelector('.element__title')
  photoCard.src = dataCard.link;
  photoCard.alt = dataCard.name;
  titleCard.textContent = dataCard.name;

  return newCard;
}

const containerElements = document.querySelector('.elements');

function renderArray () {
  initialCards.forEach(dataCard => {
  const newCard = createCard(dataCard);

  containerElements.prepend(newCard);
  })
}

renderArray();
