export class UserInfo {
    constructor({profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
        this._profileAvatarSelector = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent, 
            about: this._profileDescription.textContent,
        }
    }

    setUserInfo(nameInput, descriptionInput, avatarInput) {
        this._profileName.textContent = nameInput;
        this._profileDescription.textContent = descriptionInput;
        this._profileAvatarSelector.src = avatarInput;
    }

}