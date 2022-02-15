import { openPopup } from './utils.js';
import { popupImg, popupImgPicture, popupImgDescription } from './index.js';

export class Card {

    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.elements__item');
    }

    _handleLikeIcon = () => {
        this._likeButton.classList.toggle('elements__btn-like_active');
    }

    _handleDeleteCard = () => {
        this._cardElement.remove();
    }

    _handlePreviewPicture = () => {
        popupImgPicture.src = this._link;
        popupImgPicture.alt = this._name;
        popupImgDescription.textContent = this._name;
        openPopup(popupImg);
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', this._handleLikeIcon);
        this._deleteButton.addEventListener('click', this._handleDeleteCard);
        this._cardImage.addEventListener('click', this._handlePreviewPicture); 
    }

    _fillCard = () => {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.elements__name').textContent = this._name;
    }

    getCardElement = () => {
        this._cardElement = this._template.cloneNode(true);

        this._likeButton = this._cardElement.querySelector('.elements__btn-like');
        this._deleteButton = this._cardElement.querySelector('.elements__trash-btn');
        this._cardImage = this._cardElement.querySelector('.elements__img');

        this._fillCard();

        this._setEventListeners();

        return this._cardElement;
    }

};
