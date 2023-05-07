export default class Card {
  constructor(data, templateSelector) {
    //*Для обращения к массиву
    this._name = data.name;
    this._link = data.link;

    //*Модальное окно для карточек
    this._popup = document.querySelector(".popup_full-screen");
    this._popupPhoto = this._popup.querySelector(".popup__full-screen-photo");
    this._popupTitle = this._popup.querySelector(".popup__title-for-photo");
    this._popupCloseBtn = this._popup.querySelector(".popup__close");

    //*Методы для модального окна
    this._escapeClose = this._handleEscClose.bind(this);
    this._clickClose = this._handleClickToPopup.bind(this);

    //*Темплейт
    this._templateSelector = templateSelector;
  }

  //*ПОЛУЧАЮ ТЕМПЛЕЙТ КАРТЫ
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //*Метод установки слушателей закрытия модального окна
  _openPopup() {
    this._popup.classList.add("popup_open");
    this._popup.addEventListener("click", this._clickClose);
    this._popupCloseBtn.addEventListener("click", () => {
      this._popup.classList.remove("popup_open");
    });
    document.addEventListener("keydown", this._escapeClose);
  }

  //*Метод закрытия модального окна + удаление слушателей
  _closePopup() {
    this._popup.classList.remove("popup_open");
    this._popup.removeEventListener("click", this._clickClose);
    document.removeEventListener("keydown", this._escapeClose);
  }

  //*Закрытие по нажатию Esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._closePopup();
    }
  }

  //*Закрытие по нажатию на модальное окно
  _handleClickToPopup(evt) {
    if (evt.target.classList.contains("popup_open")) {
      this._closePopup();
    }
  }

  //*Открытие модального окна
  _handleOpenPopup() {
    this._popupPhoto.src = this._link;
    this._popupTitle.textContent = this._name;
    this._openPopup();
  }

  //*Удаление карточки
  _handleDeleteButton() {
    this._element.remove();
  }

  //*Кнопка лайка
  _handleLikeButton() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  _setEventListeners() {
    this._element
      .querySelector(".element__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => {
        this._handleLikeButton();
      });

    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => {
        this._handleOpenPopup();
      });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._element.querySelector(".element__photo").src = this._link;
    this._element.querySelector(".element__title").textContent = this._name;

    this._setEventListeners();
    return this._element;
  }
}
