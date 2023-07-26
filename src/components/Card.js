export default class Card {
  constructor({
    data,
    templateSelector,
    userId,
    handleOpenPopup,
    handleDeleteCardClick,
    handleLikeClick,
    handleDeleteLikeClick,
  }) {
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

    //*ДЛЯ ПР9
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._likesCount = this._card.querySelector(".element__like-count");
    this._userId = userId;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._likes = data.likes;
  }

  //*ПОЛУЧАЮ ТЕМПЛЕЙТ КАРТЫ
  _getTemplate() {
    this._card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return this._card;
  }

  //*Кнопка лайка
  _handleLikeButton = () => {
    this._like.classList.toggle("element__like_active");
  };

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleOpenPopup(this._name, this._link);
    });
    this._like.addEventListener("click", (evt) => {
      this._handleLikeButton();
      if (evt.target.classList.contains("element__like_active")) {
        this._handleLikeClick(this._cardId);
      } else {
        this._handleDeleteLikeClick(this._cardId);
      }
    });
    this._delete.addEventListener("click", () => {
      this._handleDeleteCardClick(this._cardId);
    });
  }
  //* Удаление карточки
  deleteCard() {
    this._card.remove();
    this._card = null;
  }

  //* для удаления своих карточек
  _hasDeleteBtn() {
    if (this._userId !== this._cardOwnerId) {
      this._delete.remove();
    }
  }

  _isCardLiked() {
    if (
      this._likes.some((user) => {
        return this._userId === user._id;
      })
    ) {
      this._like.classList.add("element__like_active");
    }
  }

  handleLikeCard(data) {
    this._likes = data.likes;
    this._likesCount.textContent = this._likes.length;
    this._delete.classList.toggle("element__like_active");
  }

  generateCard() {
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name;
    this._likesCount.textContent = this._likes.length;

    this._hasDeleteBtn();
    this._isCardLiked();
    this._setEventListeners();
    return this._card;
  }
}
