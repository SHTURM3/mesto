import { Popup } from './Popup.js';
import { popupSubmitButton } from '../pages/index.js';

export class PopupWithForm extends Popup {
    constructor (popupSelector, {submitFormCallBack}) {
        super(popupSelector);
        this._submitFormCallBack = submitFormCallBack;
        this._form = this._popupSelector.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
    }

    _getInputValues() {
        this._inputValues = {};
        this._inputs.forEach(input => {
            this._inputValues[input.name] = input.value;
        });
        
        return this._inputValues;
    }

    setEventListeners() {
        super.setEventListeners();
        
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this._submitFormCallBack(this._getInputValues());
            this.close();
            popupSubmitButton.forEach((button) => {
                button.classList.add('popup__button_disabled');
                button.setAttribute('disabled', ''); 
            });
        })
    }

    close() {
        super.close()
        this._form.reset();
    }
} 