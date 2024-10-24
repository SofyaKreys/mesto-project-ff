

import {initialCards, likeCard, deleteCard, createCard} from '../src/scripts/cards.js';

import {openModal, closeModal, closeByKey, closeOverlay} from '../src/components/modal.js';

import '../src/pages/index.css';

// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const list = document.querySelector('.places__list');
// const cardTemplate = document.querySelector('#card-template').content;

function renderCards() {
    initialCards.forEach((item) => {
        list.append(createCard(item, {deleteCard, likeCard, openImage}));
    })
}

renderCards();

// закрытие и открытие "Новое место" NewCard
// const popup = document.querySelector('.popup_is-opened');
const popupNewCard = document.getElementById('popupNewCard');
const addButton = document.querySelector('.profile__add-button');
const closeButtonNewCard = popupNewCard.querySelector('.popup__close');

function openPopupNewCard() {
    openModal(popupNewCard)
}

function closePopupNewCard() {
   closeModal(popupNewCard)
}

addButton.addEventListener('click', openPopupNewCard);
closeButtonNewCard.addEventListener('click', closePopupNewCard);
document.addEventListener('keydown', closeByKey);
document.addEventListener('click', closeOverlay);

// добавление новой карточки

const formCards = document.forms["new-place"];
const name = formCards.elements["place-name"];
const link = formCards.elements.link;

function handleFormSubmitCard(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
   
    list.prepend(createCard({name:name.value, link:link.value}, {deleteCard, likeCard, openImage}))
    formCards.reset();
    closePopupNewCard();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formCards.addEventListener('submit', handleFormSubmitCard); 

// закрытие и открытие "Редактировать" Edit

const popupEdit = document.getElementById('popupEdit');
const editButton = document.querySelector('.profile__edit-button');
const closeButtonEdit = popupEdit.querySelector('.popup__close');

function openPopupEdit() {
    openModal(popupEdit)
    // подставление значений
    nameInput.value = document.querySelector('.profile__title').textContent;
    jobInput.value = document.querySelector('.profile__description').textContent;
    // 
    
}

function closePopupEdit() {
    closeModal(popupEdit)
}


editButton.addEventListener('click', openPopupEdit);
closeButtonEdit.addEventListener('click', closePopupEdit);

// подставляем значения в поля "Редактировать" Edit 

const formElement = document.forms["edit-profile"];
const nameInput = formElement.elements.name;
const jobInput = formElement.elements.description;

function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit); 

// закрытие и открытие "Картинки" Image
const popupImage = document.getElementById('popupImage');
const cards = document.querySelectorAll('.card__image');
const closeButtonImage = popupImage.querySelector('.popup__close');

function openImage(evt) {
    
    openModal(popupImage)
    popupImage.querySelector('.popup__image').src = evt.target.src;
    const card = evt.target.closest('.card');
    popupImage.querySelector('.popup__caption').textContent = card.querySelector('.card__title').textContent;
}

function closePopupImage() {
    closeModal(popupImage);
}

// openImage.addEventListener('click', openImage);
closeButtonImage.addEventListener('click', closePopupImage);

