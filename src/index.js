

import { likeCard, deleteCard, createCard} from './components/cards.js';

import {openModal, closeModal, closeByKey, closeOverlay} from '../src/components/modal.js';

import {hasInvalidInput, toggleButtonState, setEventListeners, enableValidation, checkInputValidity, clearValidation, hideError} from '../src/components/validation.js'

import '../src/pages/index.css';

import {submitAvatar, submitCard, submitEdit, getCard, getUser} from '../src/components/api.js';


const list = document.querySelector('.places__list');
const profileDescription= document.querySelector('.profile__description');
const profileTitle= document.querySelector('.profile__title')
const popupNewCard = document.getElementById('popupNewCard');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewCard = popupNewCard.querySelector('.popup__close');
const formCards = document.forms["new-place"];
const name = formCards.elements["place-name"];
const link = formCards.elements.link;
const popupEdit = document.getElementById('popupEdit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close');
const formPopupEdit = document.forms["edit-profile"];
const nameInput = formPopupEdit.elements.name;
const jobInput = formPopupEdit.elements.description;
const popupImage = document.getElementById('popupImage');
const cards = document.querySelectorAll('.card__image');
const closeButtonImage = popupImage.querySelector('.popup__close');
const popupCaption = popupImage.querySelector('.popup__caption');
const popupImageValue= popupImage.querySelector('.popup__image');
const popupEditProfile = document.getElementById('editForm');
const popupNewPlace = document.getElementById('popupNewPlace');
const buttonCard = document.getElementById('buttonCard');
const buttonEdit = document.getElementById('buttonEdit');
const buttonAvatar = document.getElementById('buttonAvatar');
const addAvatarButton = document.querySelector('.profile__image');
const popupNewAvatar = document.getElementById('popupNewAvatar');
const closeButtonAvatar = popupNewAvatar.querySelector('.popup__close');
const formAvatar = document.forms["avatar"];
const linkAvatar = formAvatar.elements.link;


 const getDataCard = () => {
    return new Promise((resolve, reject) => {
  return getCard()

      .then((result) => {
        // console.log(result)
        resolve(result);
      
    })
    .catch(reject)
      });
}

// закрытие и открытие "Новое место" NewCard
// const popup = document.querySelector('.popup_is-opened');

function openPopupNewCard() {
    openModal(popupNewCard)
    clearValidation(popupNewCard, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
      });
}

// function closePopupNewCard() {
//    closeModal(popupNewCard)
// }

addButton.addEventListener('click', openPopupNewCard);


closeButtonNewCard.addEventListener('click', () => closeModal(popupNewCard)); 
// document.addEventListener('keydown', closeByKey);
popupNewCard.addEventListener('click', closeOverlay);

// добавление новой карточки


// ПОПАП АВАТАР


addAvatarButton.addEventListener('click', openPopupAvatar);

function openPopupAvatar() {
openModal(popupNewAvatar);
clearValidation(popupNewAvatar, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  });
}

closeButtonAvatar.addEventListener('click', () => closeModal(popupNewAvatar)); 
popupNewAvatar.addEventListener('click', closeOverlay);



function handleFormSubmitAvatar(evt) {
    evt.preventDefault();
    
    buttonAvatar.textContent = 'Сохранение...';

    submitAvatar(linkAvatar.value)
        .then((result) => {
            addAvatarButton.src = result;
            buttonAvatar.textContent = 'Сохранить';
      }); 

    formAvatar.reset();
    closeModal(popupNewAvatar);

}

formAvatar.addEventListener('submit', handleFormSubmitAvatar); 

//НОВАЯ КАРТА КНОПКА

function handleFormSubmitCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
   
    // 
    buttonCard.textContent = 'Сохранение...';

    submitCard(name.value, link.value)
        .then((result) => {
        // console.log('здесь консоль лог',result)
        list.prepend(createCard(result, {deleteCard, likeCard, openImage}))
        buttonCard.textContent = 'Сохранить';
      }); 

    formCards.reset();
    closeModal(popupNewCard);


}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formCards.addEventListener('submit', handleFormSubmitCard); 



// закрытие и открытие "Редактировать" Edit


function openPopupEdit() {
    openModal(popupEdit)
    clearValidation(popupEdit, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'form__input_type_error',
        errorClass: 'form__input-error_active'
      });
    // подставление значений
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    //  
}

function closePopupEdit() {
    closeModal(popupEdit)
}


editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', () => closeModal(popupEdit));
popupEdit.addEventListener('click', closeOverlay);

// подставляем значения в поля "Редактировать" Edit 


function handleFormSubmitEdit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
   
    // Вставьте новые значения с помощью textContent
    buttonEdit.textContent = 'Сохранение...';

    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    submitEdit(nameInput.value, jobInput.value)
    .then((result) => {
        
        buttonEdit.textContent = 'Сохранить';
  });

      closePopupEdit();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formPopupEdit.addEventListener('submit', handleFormSubmitEdit); 

// закрытие и открытие "Картинки" Image

popupImage.querySelector('.popup__image')
    

function openImage(evt) {
    openModal(popupImage)
    popupImageValue.src = evt.target.src;
    popupImageValue.alt = evt.target.alt;
    const card = evt.target.closest('.card');
    popupCaption.textContent = card.querySelector('.card__title').textContent;
}

// function closePopupImage() {
//     closeModal(popupImage);
// }

// openImage.addEventListener('click', openImage);
closeButtonImage.addEventListener('click', () => closeModal(popupImage));
popupImage.addEventListener('click', closeOverlay);





// УРОК ВАЛИДАЦИИ


// const popupInputCardDescription = document.querySelector('.popup__input_type_description');

  // Вызовем функцию
  enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
  }); 


  popupEditProfile.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });
  
  popupNewPlace.addEventListener('submit', function (evt) {
    evt.preventDefault();
  });


// УРОК API


const avatarUser = document.querySelector('.profile__image');

const getDataUser = () => {
    return new Promise((resolve, reject) => {
        getUser()
            .then((result) => {
                console.log(result);
                profileTitle.textContent = result.name;
                profileDescription.textContent = result.about;
                avatarUser.style.backgroundImage = `url(${result.avatar})`;
                resolve(result)
            })
            .catch(reject)
    })
}


Promise.all([
    getDataUser(),
    getDataCard()
]).then((result) => {
    window.cards = result[1];
    window.me = result[0];
    console.log(result[1]);
    result[1].forEach((item) => {
        list.append(createCard(item, {deleteCard, likeCard, openImage}));
    })
})




// 7.СЧЕТЧИК ЛАЙКОВ

// const likeButton = document.querySelectorAll('.card__like-button');
// const likeCount = document.querySelectorAll('.like');

// 8.УДАЛЕНИЕ КАРТОЧКИ

