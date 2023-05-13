export default class Card {
  constructor(data, templateSelector, handleOpenPopup) {
    //*Для обращения к массиву
    this._name = data.name;
    this._link = data.link;
    this._handleOpenPopup = handleOpenPopup;
    //*Темплейт
    this._templateSelector = templateSelector;

    //*Сама карта
    this._card = this._getTemplate();
    this._image = this._card.querySelector(".element__photo");
    this._title = this._card.querySelector(".element__title");
    this._delete = this._card.querySelector(".element__delete-button");
    this._like = this._card.querySelector(".element__like");
  }

  //*ПОЛУЧАЮ ТЕМПЛЕЙТ КАРТЫ
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //*Удаление карточки
  _handleDeleteButton = () => {
    this._card.remove();
  };

  //*Кнопка лайка
  _handleLikeButton = () => {
    this._like.classList.toggle("element__like_active");
  };

  _setEventListeners() {
    this._like.addEventListener("click", this._handleLikeButton);
    this._delete.addEventListener("click", this._handleDeleteButton);
    this._image.addEventListener("click", () => {
      this._handleOpenPopup(this._link, this._name);
    });
  }

  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    return this._card;
  }
}
