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


const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, {deleteCard, likeCard, openImage}, ) {
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
  likeButton.addEventListener('click', likeCard);

  
  cardImage.addEventListener('click', openImage);


  if (item.owner._id != window.me._id) {
    cardTemplateCopy.querySelector('#card__delete').remove();
  }

  return cardTemplateCopy;
}


export function likeCard(evt) {
  const card = evt.target.closest('.card');
  const cardCount = card.querySelector('#like-count');

  if (evt.target.classList.contains('card__like-button_is-active')) {

  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${card.dataset.idcard}`, {
    method: 'DELETE',
    headers: {
      authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c'
    }
  }).then(res => res.json())
  .then((result) => {
    cardCount.innerHTML = result.likes.length;
    evt.target.classList.remove('card__like-button_is-active');
})
} else {

  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${card.dataset.idcard}`, {
    method: 'PUT',
    headers: {
      authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c'
    }
  }).then(res => res.json())
  .then((result) => {
    cardCount.innerHTML = result.likes.length;
    evt.target.classList.add('card__like-button_is-active');
})

}}

export function deleteCard(e) {

  const card = e.target.closest('.card');

  console.log(card.dataset)
  fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/${card.dataset.idcard}`, {
    method: 'DELETE',
    headers: {
      authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c'
    }
  }).then(res => res.json())
  .then(() => {
    
  card.remove();
})
  
} 