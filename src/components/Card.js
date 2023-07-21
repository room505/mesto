export default class Card {
  constructor(
    data,
    templateSelector,
    handleOpenPopup,
    userId,
    handleLikeClick,
    handleDeleteCard
  ) {
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
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeClick = handleLikeClick;
    this._likesCount = this._card.querySelector(".element__like-count");
    this._userId = userId;
    this._cardID = data._id;
    this._ownersId = data.owner._id;
    this._likes = data.likes;

    this._likesCount.textContent = this._like.length;
    if (this._likes.some((element) => element._id === this._UsersID)) {
      this._handleLikeButton();
    }

    if (this._ownersId !== this._UsersID) {
      this._delete.style.display = "none";
    }
  }

  //*Смена кол-ва лайков

  _changeLikeCount = (num) => (this._likesCount.textContent = num);

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
    this._like.addEventListener("click", (evt) => {
      // this._handleLikeButton();
      if (evt.target.classList.contains("element__like_active")) {
        this._handleLikeClick(
          this._cardID,
          this._changeLikeCount,
          this._colorLike,
          false
        );
      } else {
        this._handleLikeClick(
          this._cardID,
          this._changeLikeCount,
          this._colorLike,
          true
        );
      }
    });
    this._delete.addEventListener("click", () => {
      this._handleDeleteCard(this._handleDeleteButton, this._cardID);
    });
    this._image.addEventListener("click", () => {
      this._handleOpenPopup(this._name, this._link);
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
