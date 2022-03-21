import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { ConfirmationPopup } from '../components/confirmationPopup.js';
import { FormValidator } from '../components/FormValidator.js';
import { 
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
} from '../components/utils/constants.js';
import { api } from '../components/Api.js';
import './index.css';

let userId;

// Запрос данных пользователя и карточек на сервер

Promise.all([api.getProfile(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about, userData.avatar);
    userId = userData._id;
    cards.forEach( data => {
      const newCard = createNewCard(data);
      cardList.addItem(newCard);
    })
  })
  .catch(err => {
    console.log(err)
  })


// Popup редактирования профиля

  const userInfo = new UserInfo({
    profileNameSelector: profileNameSelector,
    profileDescriptionSelector: profileDescSelector,
    profileAvatarSelector: avatarLinkSelector
  });

// Popup открытия изображения карточки 

  const popupImageClass = new PopupWithImage(popupImg);
  
// Функция создания новой карточки

  function createNewCard (data) {
    const card = new Card(
      {
        name: data.name,
        link: data.link,
        likes: data.likes,
        _id: data._id,
        userId: userId,
        ownerId: data.owner._id 
      }, 
      cardTemplateSelector, 
      handleCardClick, 
      (id) => {
        popupQuestionForUser.open();
        popupQuestionForUser.submitFormCallBack(() => {
          api.deleteCard(id)
            .then(() => {
              card.deleteCard();
              popupQuestionForUser.close();
            })
            .catch(res => {
              console.log(res)
            })
        })
      },
      (id) => {
        if(card.isLiked()) {
          api.deleteLike(id)
            .then(res => {
              card.setLikes(res.likes)
            })
            .catch(console.log)
        } else {
          api.addLike(id)
            .then(res => {
              card.setLikes(res.likes)
            })
            .catch(console.log)
        }
      }
    );
    const cardElement = card.getCardElement();
    return cardElement;
  }

// Функция открытия попапа с картинкой карточки

  function handleCardClick(name, link) {
    popupImageClass.open(name, link);
  }

// Переменная, отвечающая за отрисовку элементов на странице
  
  const cardList = new Section({
    items: [],
    renderer: (cardItem) => {
          const newCard = createNewCard(cardItem);
          cardList.addItem(newCard);
        },
    }, '.elements__list');

// Переменная, отвечающая за отпрвку данных в форме редактирования карточки

  const popupCardForm = new PopupWithForm(popupCard, {
    submitFormCallBack: (data) => {
      editCardFormValidator.renderLoading(true);
      api.addCard(data.name, data.link)
        .then(res => {
          const newCard = createNewCard(res);
          cardList.addItem(newCard);
          popupCardForm.close();
        })
        .catch(console.log)
        .finally(() => {
          editCardFormValidator.renderLoading(false)
        })
    }
  });

// Переменная, отвечающая за отправку данных в форме редактирования профиля

  const popupProfileForm = new PopupWithForm(popupProfile, {
    submitFormCallBack: (inputValues) => {
      editFormValidator.renderLoading(true);
      const { name, about} = inputValues;
      api.editProfile(name, about)
        .then(res => {
          userInfo.setUserInfo(name, about, res.avatar);
          popupProfileForm.close();
        })
        .catch(console.log)
        .finally(() => {
          editFormValidator.renderLoading(false)
        })
    }
  });

// Переменная, отвечающая за взаимодействие с popup с вопросом для пользователя

  const popupQuestionForUser = new ConfirmationPopup(popupQuestion);

// Переменная, отвечающая за замену аватара пользователя

  const popupAvatarForm = new PopupWithForm(popupAvatar, {
    submitFormCallBack: (pct) => {
      editAvatarFormValidator.renderLoading(true);
      const { avatar } = pct;
      api.changeAvatar(avatar)
        .then(res => {
          userInfo.setUserInfo(res.name, res.about, res.avatar);
          popupAvatarForm.close();
        })
        .catch(console.log)
        .finally(() => {
          editAvatarFormValidator.renderLoading(false)
        })
    }
  })

// Переменные валидации форм

  const editFormValidator = new FormValidator(validationConfig, profilePopupForm);
  const editCardFormValidator = new FormValidator(validationConfig, cardPopupForm);
  const editAvatarFormValidator = new FormValidator(validationConfig, avatarPopupForm);
  

// Слушатель кнопки попапа редактирования информации о пользователе

  popupProfileOpenBtn.addEventListener('click', () => {
    editFormValidator.disableSubmitButton();
    const userInfoValues = userInfo.getUserInfo();
    profileFormName.value = userInfoValues.name;
    profileFormDescription.value = userInfoValues.about;
    popupProfileForm.open();
  });

// Слушатель кнопки редактирования карточек мест

  popupCardOpenBtn.addEventListener('click', () => {
    editCardFormValidator.disableSubmitButton();
    popupCardForm.open();
  });

// Слушатель кнопки редактирования аватара пользователя

  popupAvatarOpenBtn.addEventListener('click', () => {
    editAvatarFormValidator.disableSubmitButton();
    popupAvatarForm.open();
  })

// Слушатели валидации

  editFormValidator.enableValidation();
  editCardFormValidator.enableValidation();
  editAvatarFormValidator.enableValidation();

// Слушатель генерации карточек мест

  cardList.renderItems();

// Слушатель формы добавления карточек мест

  popupCardForm.setEventListeners();

// Слушатель формы редактирования информации профиля

  popupProfileForm.setEventListeners();

// Слушатель формы редактирования аватара профиля

  popupAvatarForm.setEventListeners();

// Слушатель popup изображения карточки места

  popupImageClass.setEventListeners();

// Слушатель popup вопроса к пользователю

  popupQuestionForUser.setEventListeners();



