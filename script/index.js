let popup = document.querySelector('.popup')
let popupOpenBtn = document.querySelector('.profile__edit-button');
let popupCloseBtn = document.querySelector('.popup__close-btn');

let formElement = document.querySelector('.popup__input');
let nameInput = document.querySelector('.popup__input-text_name');
let jobInput = document.querySelector('.popup__input-text_about');

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__description');

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

formElement.addEventListener('submit', formSubmitHandler);

popupOpenBtn.addEventListener ('click', windowOpened);

popupCloseBtn.addEventListener ('click', windowClosed);
