import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { openPopup, closePopup } from './utils.js';

// Переменные для формы редактирование данных пользователя

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile')
const popupOpenProfileBtn = document.querySelector('.profile__edit-button');

const profilePopupForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_profile-name');
const jobInput = document.querySelector('.popup__input_profile-about');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

// Переменные для добавления(редактирования) новых карточек на старницу

const popupCard = document.querySelector('.popup_card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardSubmitBtn = document.querySelector('.popup__button_card');

const formCard = document.querySelector('.popup__form_card');
const namePlaceInput = document.querySelector('.popup__input_card-name');
const linkPlaceInput = document.querySelector('.popup__input_card-link'); 

// Переменая template карточки

const cardTemplateSelector = '.elements-template';

// Переменная для открытия изображения

export const popupImg = document.querySelector('.popup-img');
export const popupImgPicture = popupImg.querySelector('.popup-img__pic');
export const popupImgDescription = popupImg.querySelector('.popup-img__desc');

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

  const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector);
    const cardElement = card.getCardElement();

    document.querySelector('.elements__list').prepend(cardElement);
  };

  initialCards.forEach(renderCard);

  function submitFormCardHandler(event) {
    event.preventDefault();
    renderCard ({
      name: namePlaceInput.value,
      link: linkPlaceInput.value
    });
    editCardFormValidator.disableSubmitButton();
    formCard.reset();
    closePopup(popupCard);
  }


popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
          closePopup(popup);
      }
      if (evt.target.classList.contains('popup__close-btn')) {
        closePopup(popup);
      }
  })
});


// Функции редактирования попапа формы профиля

function openProfileForm() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    openPopup(profilePopup);
}

function submitProfileForm(evt) {
    evt.preventDefault();
    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    
    closePopup(profilePopup);
}

// Валидация

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editFormValidator = new FormValidator(validationConfig, profilePopupForm);
const editCardFormValidator = new FormValidator(validationConfig, formCard);

editFormValidator.enableValidation();
editCardFormValidator.enableValidation();

// Обработчики событий попапа редактирования информации о пользователе

profilePopupForm.addEventListener('submit', submitProfileForm);

popupOpenProfileBtn.addEventListener('click', openProfileForm);

// Обработчики событий редактирования карточек мест

formCard.addEventListener('submit', submitFormCardHandler);

popupCardOpenBtn.addEventListener('click', () => {
  openPopup(popupCard);
});



