export class FormValidator {
    constructor (settings, form) {
        this._form = form;
        this._settings = settings;
        this._inputList = Array.from(this._form.querySelectorAll(this._settings.inputSelector));
        this._buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
    }


    _showError(inputElement, errorMessage) {
        const {inputErrorClass, errorClass} = this._settings;
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.add(inputErrorClass);
        errorElement.classList.add(errorClass);
        errorElement.textContent = errorMessage;
    }

    _hideError(inputElement) {
        const {inputErrorClass, errorClass} = this._settings;
        const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

        inputElement.classList.remove(inputErrorClass);
        errorElement.classList.remove(errorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if(inputElement.validity.valid) {
            this._hideError(inputElement);
        } else {
            this._showError(inputElement, inputElement.validationMessage);
        }
    }
    
    _isFormValid() {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _disableSubmitButton() {
        const {inactiveButtonClass} = this._settings;
        this._buttonElement.classList.add(inactiveButtonClass);
        this._buttonElement.disabled = true;
    }

    _enableSubmitButton() {
        const {inactiveButtonClass} = this._settings;
        this._buttonElement.classList.remove(inactiveButtonClass);
        this._buttonElement.disabled = false;
    }

    _toggletButtonState () {
        if (this._isFormValid()) {
            this._disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    };

    _setEventListeners() {
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement);
            this._toggletButtonState();
          });
        });
    }

    enableValidation() {
        const {inactiveButtonClass} = this._settings;
        this._buttonElement.classList.add(inactiveButtonClass);
        this._buttonElement.disabled = true;
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();   
    }
}



