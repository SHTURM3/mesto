import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor (popupSelector, {submitFormCallBack}) {
        super(popupSelector);
        this._submitFormCallBack = submitFormCallBack;
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        
        return this._inputValues;
    }

    changeSubmitFormCallBack(newSubmitFormCallBack) {
        this._submitFormCallBack = newSubmitFormCallBack
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormCallBack(this._getInputValues());
            this.close();
        })
    }

    close() {
        super.close()
        this._form.reset();
    }
} 