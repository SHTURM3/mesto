export class Card {

    constructor(data, cardTemplateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.elements__item');
        this._handleCardClick = handleCardClick;
    }

    _handleLikeIcon = () => {
        this._likeButton.classList.toggle('elements__btn-like_active');
    }

    _handleDeleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', this._handleLikeIcon);
        this._deleteButton.addEventListener('click', this._handleDeleteCard);
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        }); 
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
