export class Card {

    constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._id = data._id;
        this._userId = data.userId;
        this._ownerId = data.ownerId;

        this._template = document.querySelector(cardTemplateSelector).content.querySelector('.elements__item');
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleLikeClick = handleLikeClick;
    }

    _removeLike = () => {
        this._likeButton.classList.remove('elements__btn-like_active');
    }

    _addLike() {
        this._likeButton.classList.add('elements__btn-like_active');
    }

    deleteCard = () => {
        this._cardElement.remove();
        this._cardElement = null;
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));
        this._cardImage.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        }); 
    }

    _fillCard = () => {
        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardElement.querySelector('.elements__name').textContent = this._name;
    }

    isLiked() {
        const userHasLikedCard = this._likes.find(user => user._id === this._userId);
        return userHasLikedCard;
    }

    setLikes(newLikes) {
        this._likes = newLikes;
        const likeCountElement = this._cardElement.querySelector('.elements__like-count');
        likeCountElement.textContent = this._likes.length;
        if(this.isLiked()) {
            this._addLike()
        } else {
            this._removeLike() 
        }

    }

    getCardElement = () => {
        this._cardElement = this._template.cloneNode(true);

        this._likeButton = this._cardElement.querySelector('.elements__btn-like');
        this._deleteButton = this._cardElement.querySelector('.elements__trash-btn');
        this._cardImage = this._cardElement.querySelector('.elements__img');

        if(this._ownerId !== this._userId) {
            this._deleteButton.style.display = 'none'
        }

        

        this.setLikes(this._likes);

        this._fillCard();

        this._setEventListeners();

        return this._cardElement;
    }

};
