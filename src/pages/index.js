import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import './index.css';

// Кнопка отправки форм

export const popupSubmitButton = document.querySelectorAll('.popup__button');

// Переменные для popup изображения карточки места

const popupImg = document.querySelector('.popup-img');

// Переменные для формы редактирование данных пользователя

const popupProfile = document.querySelector('.popup_profile');
const profileNameSelector = '.profile__name';
const profileDescSelector = '.profile__description';
const profilePopupForm = document.querySelector('.popup__form_profile');
const profileFormName = profilePopupForm.querySelector('.popup__input_profile-name');
const profileFormDescription = profilePopupForm.querySelector('.popup__input_profile-about');
const popupProfileOpenBtn = document.querySelector('.profile__edit-button');

// Переменные для добавления(редактирования) новых карточек на старницу

const popupCard = document.querySelector('.popup_card');
const cardPopupForm = document.querySelector('.popup__form_card');
export const popupCardOpenBtn = document.querySelector('.profile__add-button');

// Переменая template карточки

const cardTemplateSelector = '.elements-template';

// Массив с изображениями

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

  // Popup создания карточки

  const popupCardClass = new Popup(popupCard);

  // Popup редактирования профиля

  const popupProfileClass = new Popup(popupProfile);
  const userInfo = new UserInfo({
    profileNameSelector: profileNameSelector,
    profileDescriptionSelector: profileDescSelector
  });

  // Popup открытия изображения карточки 

  const popupImageClass = new PopupWithImage(popupImg);
  
  // Функция создания новой карточки

  function createNewCard (item) {
    const card = new Card(item, cardTemplateSelector, handleCardClick);
    const cardElement = card.getCardElement();
    return cardElement;
  }

  // Функция открытия попапа с картинкой карточки

  function handleCardClick(name, link) {
    popupImageClass.open(name, link);
    popupImageClass.setEventListeners();
  }
  // Переменная, отвечающая за отрисовку элементов на странице
  
  const cardList = new Section({
    items: initialCards,
    renderer: (cardItem) => {
          const newCard = createNewCard(cardItem);
          cardList.addItem(newCard);
         },
    }, '.elements__list');

  // Переменная, отвечающая за отпрвку данных в форме редактирования карточки

  const popupCardForm = new PopupWithForm(popupCard, {
    submitFormCallBack: (formValue) => {
      const newCard = createNewCard(formValue);
      cardList.addItem(newCard);
    }
  });

  // Переменная, отвечающая за отправку данных в форме редактирования профиля

  const popupProfileForm = new PopupWithForm(popupProfile, {
    submitFormCallBack: (inputValues) => {
      console.log(inputValues);
      userInfo.setUserInfo(inputValues.name, inputValues.about);
      popupProfileForm.close();
    }
  });

  // Переменная, отвечающая за валидацию форм

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

  const editFormValidator = new FormValidator(validationConfig, profilePopupForm);
  const editCardFormValidator = new FormValidator(validationConfig, cardPopupForm);

  editFormValidator.enableValidation();
  editCardFormValidator.enableValidation();

// Слушатели попапа редактирования информации о пользователе

  popupProfileOpenBtn.addEventListener('click', () => {
    const userInfoValues = userInfo.getUserInfo();
    profileFormName.value = userInfoValues.name;
    profileFormDescription.value = userInfoValues.about;
    popupProfileClass.open();
  });

// Слушатели редактирования карточек мест

  popupCardOpenBtn.addEventListener('click', () => {
    popupCardClass.open();
  });

// Слушатель генерации карточек мест

  cardList.renderItems();

// Слушатель формы добавления карточек мест

  popupCardForm.setEventListeners();

// Слушатель формы редактирования информации профиля

  popupProfileForm.setEventListeners();



