export default class Section {
  constructor({ renderer }, items) {
    this._renderer = renderer;
    this._container = document.querySelector(items);
  }

  rendenItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
