import { Popup } from '../components/Popup.js';

export class ConfirmationPopup extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
    }

    submitFormCallBack = (newSubmitFormCallBack) => {
        this.submitFormCallBack = newSubmitFormCallBack;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitFormCallBack();
        })
    }

}