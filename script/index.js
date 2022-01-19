// Переменные для формы редактирование данных пользователя

const popup = document.querySelector('.popup')
const popupOpenBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-btn');

const formElement = document.querySelector('.popup__input');
const nameInput = document.querySelector('.popup__input-text_name');
const jobInput = document.querySelector('.popup__input-text_about');

const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

// Переменные для добавления(редактирования) новых карточек на старницу
const popupCard = document.querySelector('.popup-card');
const popupCardOpenBtn = document.querySelector('.profile__add-button');
const popupCardCloseBtn = document.querySelector('.popup-card__close-btn');

const formCard = document.querySelector('.popup-card__input');
const namePlaceInput = document.querySelector('.popup-card__input-text_name');
const linkPlaceInput = document.querySelector('.popup-card__input-text_link');

// Переменные для popup с картинкой

const popupImg = document.querySelector('.popup-img');
const closePopupImgBtn = document.querySelector('.popup-img__btn-close');

// Шесть карточек "из коробки"

const elementsList = document.querySelector('.elements__list');
const elementsTemplate = document.querySelector('.elements-template').content;
const elementsItem = elementsTemplate.querySelector('.elements__item');

let initialCards = [
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

  const initialCardsRender = function(element) {
                    const item = newCards(element);
                    elementsList.prepend(item);
                  }

  initialCards.forEach(initialCardsRender);

  function formCardSubmitHandler(event) {
    event.preventDefault();
  
    initialCardsRender ({
      name: namePlaceInput.value,
      link: linkPlaceInput.value
    });
    
    formCard.reset();
    popupCardClosed();
  }

function newCards(element) {
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
      popupImg.classList.add('popup-img_opened');

      popupImg.querySelector('.popup-img__pic').src = element.link;
      popupImg.querySelector('.popup-img__pic').alt = element.name;
      popupImg.querySelector('.popup-img__desc').textContent = element.name;
    })

    return templateCopy;
};

// Функции для открытия(закрытия), изменения попапа редактирования данных пользователя

function windowOpened() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    popup.classList.add('popup_opened');
}

function windowClosed() {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    
    windowClosed();
}

// Функции для открытия(закрытия), изменения карточек мест

function popupCardOpened() {
  popupCard.classList.add('popup-card_opened');
}

function popupCardClosed() {
  popupCard.classList.remove('popup-card_opened');
}

// Обработчики событий попапа редактирования информации о пользователе

formElement.addEventListener('submit', formSubmitHandler);

popupOpenBtn.addEventListener ('click', windowOpened);

popupCloseBtn.addEventListener ('click', windowClosed);

// Обработчики событий редактирования карточек мест

popupCardOpenBtn.addEventListener ('click', popupCardOpened);

formCard.addEventListener ('submit', formCardSubmitHandler);

popupCardCloseBtn.addEventListener ('click', popupCardClosed);

closePopupImgBtn.addEventListener ('click', function() {
  popupImg.classList.remove('popup-img_opened');
});

