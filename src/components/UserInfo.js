export class UserInfo {
    constructor({profileNameSelector, profileDescriptionSelector}) {
        this._profileNameSelector = document.querySelector(profileNameSelector);
        this._profileDescriptionSelector = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._profileNameSelector.textContent, 
            about: this._profileDescriptionSelector.textContent
        }
    }

    setUserInfo(nameInput, descriptionInput) {
        this._profileNameSelector.textContent = nameInput;
        this._profileDescriptionSelector.textContent = descriptionInput;
    }
}