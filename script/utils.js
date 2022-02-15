export function openPopup(popup) {
    popup.classList.add('popup_opened'); 
    document.addEventListener('keydown', closeAllPopupsEscape);
  };
  
export function closePopup(popup) {
    popup.classList.remove('popup_opened'); 
    document.removeEventListener('keydown', closeAllPopupsEscape);
  };

export function closeAllPopupsEscape(evt) {
    if (evt.key === 'Escape') {
      closePopup(document.querySelector('.popup_opened'));
    }
  };