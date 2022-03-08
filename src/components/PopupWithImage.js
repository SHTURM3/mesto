import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._image = this._popupSelector.querySelector('.popup-img__pic');
        this._name = this._popupSelector.querySelector('.popup-img__desc');
    }

    open(name, link) {
        super.open()
        this._image.src = link;
        this._image.alt = name;
        this._name.textContent = name;
    }
}