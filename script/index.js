// Переменные для формы редактирование данных пользователя

const popups = document.querySelectorAll('.popup');
const profilePopup = document.querySelector('.popup_profile')
const popupOpenBtn = document.querySelector('.profile__edit-button');

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

// Переменные для popup с картинкой

const popupImg = document.querySelector('.popup-img');
const popupImgPicture = popupImg.querySelector('.popup-img__pic');
const popupImgDescription = popupImg.querySelector('.popup-img__desc');

// Шесть карточек "из коробки"

const elementsList = document.querySelector('.elements__list');
const elementsTemplate = document.querySelector('.elements-template').content;
const elementsItem = elementsTemplate.querySelector('.elements__item');

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

  const addCardToContainer = function(element) {
    const item = createNewCard(element);
    elementsList.prepend(item);
  }

  initialCards.forEach(addCardToContainer);

  function submitFormCardHandler(event) {
    event.preventDefault();
    addCardToContainer ({
      name: namePlaceInput.value,
      link: linkPlaceInput.value
    });
    popupCardSubmitBtn.setAttribute('disabled', true);
    popupCardSubmitBtn.classList.add('popup__button_disabled');
    formCard.reset();
    closePopup(popupCard);
  }

function createNewCard(element) {
    const templateCopy = elementsItem.cloneNode(true);
    const elementsName = templateCopy.querySelector('.elements__name');
    const elementsImg = templateCopy.querySelector('.elements__img');
    const likeBtn = templateCopy.querySelector('.elements__btn-like');
    const delBtn = templateCopy.querySelector('.elements__trash-btn');

    elementsName.textContent = element.name;
    elementsImg.alt = element.name;
    elementsImg.src = element.link;

    delBtn.addEventListener('click', function() {
      templateCopy.remove();
    });

    likeBtn.addEventListener ('click', function() {
      likeBtn.classList.toggle('elements__btn-like_active');
    });

    elementsImg.addEventListener('click', function() {
      openPopup(popupImg);

      popupImgPicture.src = element.link;
      popupImgPicture.alt = element.name;
      popupImgDescription.textContent = element.name;
    })

    return templateCopy;
};

// Функции для открытия(закрытия) попапов

function openPopup(popup) {
  popup.classList.add('popup_opened'); 
  document.addEventListener('keydown', closeAllPopupsEscape);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened'); 
  document.removeEventListener('keydown', closeAllPopupsEscape);
};

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


function closeAllPopupsEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функции редактирования попапа формы профиля

function openWindow() {
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



// Обработчики событий попапа редактирования информации о пользователе

profilePopupForm.addEventListener('submit', submitProfileForm);

popupOpenBtn.addEventListener('click', openWindow);

// Обработчики событий редактирования карточек мест

formCard.addEventListener('submit', submitFormCardHandler);

popupCardOpenBtn.addEventListener('click', () => {
  openPopup(popupCard);
});


