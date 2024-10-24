// // теперь картинки можно импортировать,
// // вебпак добавит в переменные правильные пути
export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(item, {deleteCard, likeCard, openImage}) {
  const cardTemplateCopy = cardTemplate.cloneNode(true);
  const cardImage = cardTemplateCopy.querySelector(".card__image");
  const cardTitle = cardTemplateCopy.querySelector(".card__title");

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardTitle.textContent = item.name;
  
  const deleteButton = cardTemplateCopy.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = cardTemplateCopy.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  const openButton = cardTemplateCopy.querySelector('.card__image');
  openButton.addEventListener('click', openImage);

  return cardTemplateCopy;
}


export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(e) {
  const card = e.target.closest('.card');
  card.remove();
} 