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

  setUserInfo(data) {
    this._author.textContent = data.name;
    this._aboutTheAuthor.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}
