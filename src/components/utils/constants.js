export { popupImg, popupProfile, profileNameSelector, profileDescSelector, profilePopupForm, profileFormName, profileFormDescription, popupProfileOpenBtn, popupCard, cardPopupForm, popupCardOpenBtn, cardTemplateSelector, initialCards};

// Переменные для popup изображения карточки места

const popupImg = '.popup-img';

// Переменные для формы редактирование данных пользователя

const popupProfile = '.popup_profile';
const profileNameSelector = '.profile__name';
const profileDescSelector = '.profile__description';
const profilePopupForm = document.querySelector('.popup__form_profile');
const profileFormName = profilePopupForm.querySelector('.popup__input_profile-name');
const profileFormDescription = profilePopupForm.querySelector('.popup__input_profile-about');
const popupProfileOpenBtn = document.querySelector('.profile__edit-button');

// Переменные для добавления(редактирования) новых карточек на старницу

const popupCard = '.popup_card';
const cardPopupForm = document.querySelector('.popup__form_card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');

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
