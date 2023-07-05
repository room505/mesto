export default class UserInfo {
  constructor({ authorSelector, aboutTheAuthorSelector }) {
    this._author = document.querySelector(authorSelector);
    this._aboutTheAuthor = document.querySelector(aboutTheAuthorSelector);
  }

  getUserInfo() {
    return {
      author: this._author.textContent,
      aboutTheAuthor: this._aboutTheAuthor.textContent,
    };
  }

  setUserInfo({ author, aboutTheAuthor }) {
    this._author.textContent = author;
    this._aboutTheAuthor.textContent = aboutTheAuthor;
  }
}
