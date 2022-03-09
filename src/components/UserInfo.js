export class UserInfo {
    constructor({profileNameSelector, profileDescriptionSelector}) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent, 
            about: this._profileDescription.textContent
        }
    }

    setUserInfo(nameInput, descriptionInput) {
        this._profileName.textContent = nameInput;
        this._profileDescription.textContent = descriptionInput;
    }
}