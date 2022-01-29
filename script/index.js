// Переменные для формы редактирование данных пользователя

const profilePopup = document.querySelector('.popup_profile')
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-btn_profile');

const profilePopupForm = document.querySelector('.popup__form_profile');
const nameInput = document.querySelector('.popup__input_profile-name');
const jobInput = document.querySelector('.popup__input_profile-about');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

// Переменные для добавления(редактирования) новых карточек на старницу
const popupCard = document.querySelector('.popup_card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardCloseBtn = document.querySelector('.popup__close-btn_card');

const formCard = document.querySelector('.popup__form_card');
const namePlaceInput = document.querySelector('.popup__input_card-name');
const linkPlaceInput = document.querySelector('.popup__input_card-link');

// Переменные для popup с картинкой

const popupImg = document.querySelector('.popup-img');
const closePopupImgBtn = document.querySelector('.popup-img__btn-close');

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

  function formCardSubmitHandler(event) {
    event.preventDefault();
  
    addCardToContainer ({
      name: namePlaceInput.value,
      link: linkPlaceInput.value
    });
    
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

      const popupImgPicture = popupImg.querySelector('.popup-img__pic');

      popupImgPicture.src = element.link;
      popupImgPicture.alt = element.name;
      popupImg.querySelector('.popup-img__desc').textContent = element.name;
    })

    return templateCopy;
};

// Функции для открытия(закрытия) попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('click', closeAllPopupsOverlay); 
  document.addEventListener('keydown', closeAllPopupsEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('click', closeAllPopupsOverlay); 
  document.removeEventListener('keydown', closeAllPopupsEscape);
}

function closeAllPopupsOverlay (element) {
  if (element.target.classList.contains('popup')) {
    closePopup(document.querySelector('.popup_opened'));
  }
}

function closeAllPopupsEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

// Функции редактирования попапа формы профиля

function windowOpened() {
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

popupOpenBtn.addEventListener('click', windowOpened);

popupCloseBtn.addEventListener('click', () => {
  closePopup(profilePopup);
});

// Обработчики событий редактирования карточек мест

formCard.addEventListener('submit', formCardSubmitHandler);

popupCardOpenBtn.addEventListener('click', () => {
  openPopup(popupCard);
});

popupCardCloseBtn.addEventListener('click', () => {
  closePopup(popupCard);
});

closePopupImgBtn.addEventListener('click', () => {
  closePopup(popupImg);
});

