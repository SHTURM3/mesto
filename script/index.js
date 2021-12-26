let popup = document.querySelector('.popup')
let popupOpenBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__close-btn');

function windowOpened() {
    popup.classList.add('popup_opened');
}

function windowClosed() {
    popup.classList.remove('popup_opened');
}

popupOpenBtn.addEventListener ('click', windowOpened);

popupCloseBtn.addEventListener ('click', windowClosed);

let formElement = document.querySelector('.popup__input');
let nameInput = document.querySelector('.popup__input-text_name');
let jobInput = document.querySelector('.popup__input-text_about');
let job = document.querySelector('.profile__description');
let name = document.querySelector('.profile__name');

function formSubmitHandler (evt) {
    evt.preventDefault();
    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    
    popup.addEventListener('submit', windowClosed);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

