export function openModal(modal) {
    
    modal.classList.add("popup_is-opened");
    
}

export function closeModal(modal) {
    modal.classList.remove("popup_is-opened");
}



export function closeByKey(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key === 'Escape' && popup) {
        closeModal(popup)
      }
}

export function closeOverlay(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.target === popup) {
        closeModal(popup)
    }
}


