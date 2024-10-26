export function openModal(modal) {
    
    modal.classList.add("popup_is-opened");
    document.addEventListener('keydown', closeByKey);
}

export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener('keydown', closeByKey);
}



export function closeByKey(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape' && popup) {
        closeModal(popup)
      }
}

export function closeOverlay(evt) {
    if (evt.target === evt.currentTarget) { 
        closeModal(evt.target) 
    }  
}


