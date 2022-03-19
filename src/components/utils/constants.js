export { 
  popupImg, 
  popupProfile, 
  profileNameSelector, 
  profileDescSelector, 
  profilePopupForm, 
  profileFormName, 
  profileFormDescription, 
  popupProfileOpenBtn, 
  popupCard, 
  cardPopupForm, 
  popupCardOpenBtn, 
  cardTemplateSelector, 
  validationConfig, 
  popupQuestion, 
  popupAvatar, 
  avatarLinkSelector,
  avatarPopupForm,
  avatarFormLink,
  popupAvatarOpenBtn
};

// Переменные для popup изображения карточки места

const popupImg = '.popup-img';

// Переменные для popup с вопросом для пользователя

const popupQuestion = '.popup_question';

// Переменные для popup редактированя аватара

const popupAvatar = '.popup_profile-avatar';
const avatarLinkSelector = '.profile__avatar';
const avatarPopupForm = document.querySelector('.popup__form_profile-avatar');
const avatarFormLink = avatarPopupForm.querySelector('.popup__input_profile-avatar');
const popupAvatarOpenBtn = document.querySelector('.profile__avatar-btn'); 

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

// Переменная, отвечающая за валидацию форм

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};