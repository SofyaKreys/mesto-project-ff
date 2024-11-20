// // теперь картинки можно импортировать,
// // вебпак добавит в переменные правильные пути
// export const initialCards = [
//     {
//       name: "Архыз",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
//     },
//     {
//       name: "Челябинская область",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
//     },
//     {
//       name: "Иваново",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
//     },
//     {
//       name: "Камчатка",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
//     },
//     {
//       name: "Холмогорский район",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
//     },
//     {
//       name: "Байкал",
//       link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
//     }
// ];
import {putLikeCard, deleteLikeCard, deleteCardFetch} from './api';

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, {deleteCard, likeCard, openImage}, userId) {
  const cardTemplateCopy = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateCopy.querySelector(".card__image");
  const cardTitle = cardTemplateCopy.querySelector(".card__title");
  const cardItem = cardTemplateCopy.querySelector(".card");
  const cardCount = cardTemplateCopy.querySelector('#like-count');
  
  cardCount.innerHTML = item.likes.length;

  cardItem.dataset.idcard = item._id;


  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  


  const deleteButton = cardTemplateCopy.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = cardTemplateCopy.querySelector('.card__like-button');
  likeButton.addEventListener('click', (evt) => {
    likeCard(evt, cardCount, cardItem, likeButton);
  });

  
  cardImage.addEventListener('click', openImage);


  if (item.owner._id != userId) {
    cardTemplateCopy.querySelector('#card__delete').remove();
  }

  return cardTemplateCopy;
}


export function likeCard(evt, count, card, like) {
  // console.log(evt, count, id, like);
  
  // const cardCount = card.querySelector('#like-count');

  if (like.classList.contains('card__like-button_is-active')) {
    deleteLikeCard(card.dataset.idcard)
  .then((result) => {
    count.innerHTML = result.likes.length;
    like.classList.remove('card__like-button_is-active');
}).catch((err) => {
  console.log(err);
});
} else {

  putLikeCard(card.dataset.idcard)
  .then((result) => {
    count.innerHTML = result.likes.length;
    like.classList.add('card__like-button_is-active');
}).catch((err) => {
  console.log(err);
});

}}

export function deleteCard(e) {

  const card = e.target.closest('.card');

  // console.log(card.dataset)
  deleteCardFetch(card.dataset.idcard)
  .then(() => {
    
  card.remove();
}).catch((err) => {
  console.log(err);
});
  
} 