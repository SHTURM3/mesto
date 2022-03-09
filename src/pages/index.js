import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { FormValidator } from '../components/FormValidator.js';
import { popupImg, popupProfile, profileNameSelector, profileDescSelector, profilePopupForm, profileFormName, profileFormDescription, popupProfileOpenBtn, popupCard, cardPopupForm, popupCardOpenBtn, cardTemplateSelector, initialCards } from '../components/utils/constants.js';
import './index.css';

// Popup редактирования профиля

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

// Слушатели попапа редактирования информации о пользователе

  popupProfileOpenBtn.addEventListener('click', () => {
    editFormValidator.disableSubmitButton();
    const userInfoValues = userInfo.getUserInfo();
    profileFormName.value = userInfoValues.name;
    profileFormDescription.value = userInfoValues.about;
    popupProfileForm.open();
  });

// Слушатель редактирования карточек мест

  popupCardOpenBtn.addEventListener('click', () => {
    editCardFormValidator.disableSubmitButton();
    popupCardForm.open();
  });

// Слушатели валидации

  editFormValidator.enableValidation();
  editCardFormValidator.enableValidation();

// Слушатель генерации карточек мест

  cardList.renderItems();

// Слушатель формы добавления карточек мест

  popupCardForm.setEventListeners();

// Слушатель формы редактирования информации профиля

  popupProfileForm.setEventListeners();

// Слушатель popup изображения карточки места

  popupImageClass.setEventListeners();



