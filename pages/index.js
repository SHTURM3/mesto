let popup = document.querySelector('.popup')
let popupOpen = document.querySelector('.profile__edit-button');
let popupClose = document.querySelector('.popup__close-btn');

popupOpen.addEventListener ('click', function () {
    popup.classList.add('popup_opened');
});

popupClose.addEventListener ('click', function () {
    popup.classList.remove('popup_opened');
});

// Находим форму в DOM
let formElement = document.querySelector('.popup__input');
// Находим поля формы в DOM
let nameInput = document.querySelector('#name');
let jobInput = document.querySelector('#about');

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
    
    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    let name = document.querySelector('.profile__name');
    let job = document.querySelector('.profile__description');
    
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);

