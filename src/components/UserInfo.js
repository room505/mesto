export default class UserInfo {
  constructor({ authorSelector, aboutTheAuthorSelector, avatarSelector }) {
    this._author = document.querySelector(authorSelector);
    this._aboutTheAuthor = document.querySelector(aboutTheAuthorSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      author: this._author.textContent,
      aboutTheAuthor: this._aboutTheAuthor.textContent,
    };
  }

  setUserInfo({ author, aboutTheAuthor, link }) {
    this._author.textContent = author;
    this._aboutTheAuthor.textContent = aboutTheAuthor;
    this.setAvatar(link);
  }

  setAvatar(link) {
    this._avatar.src = link;
  }
}
