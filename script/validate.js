  // Функция сброса стандартной отправки формы
  
  function submitForm(evt) {
      evt.preventDefault();
  };

  // Функция показа ошибки

  function showError(input, errorContainer, { inputErrorClass, errorClass }) {
    input.classList.add(inputErrorClass);
    errorContainer.classList.add(errorClass);
    errorContainer.textContent = input.validationMessage;
  };

  // Функция скрытия ошибки

  function hideError(input, errorContainer, { inputErrorClass, errorClass }) {
    input.classList.remove(inputErrorClass);
    errorContainer.classList.remove(errorClass);
    errorContainer.textContent = '';
  };

  // Функция активации и деактивации кнопки отпраки формы

  function toggletButton (form, { submitButtonSelector, inactiveButtonClass }) {
        const button = form.querySelector(submitButtonSelector);
        const isFormValid = form.checkValidity();
        if (isFormValid) {
            button.classList.remove(inactiveButtonClass);
            button.removeAttribute('disabled');
        } else {
            button.classList.add(inactiveButtonClass);
            button.setAttribute('disabled', '');
        }
    };

  // Функция проверки валидности

  function validateInput(form, input, classes) {
    const errorContainer = form.querySelector(`#${input.id}-error`);
    if(input.validity.valid) {
        hideError(input, errorContainer, classes);
    } else {
        showError(input, errorContainer, classes);
    }
    toggletButton(form, classes);
  };

  function enableValidation({ formSelector, inputSelector, ...rest }) {
      const forms = document.querySelectorAll(formSelector);
      forms.forEach(form => {
        form.addEventListener('submit', submitForm);
        const inputs = form.querySelectorAll(inputSelector);
        inputs.forEach(input => {
          input.addEventListener('input', () => {
            validateInput(form, input, rest);
          });
        });
        toggletButton(form, rest);
      });
  };

  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  
