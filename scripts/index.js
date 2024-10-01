// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const list = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function deleteCard(e) {
    const card = e.target.closest('.card');
    card.remove();
} 

function renderCards() {
    initialCards.forEach((item) => {
        list.append(createCard(item, {deleteCard}));
    })
}

function createCard(item, {deleteCard}) {
    const cardTemplateCopy = cardTemplate.cloneNode(true);
    const cardImage = cardTemplateCopy.querySelector(".card__image");
    const cardTitle = cardTemplateCopy.querySelector(".card__title");

    cardImage.src = item.link;
    cardImage.alt = item.name;
    cardTitle.textContent = item.name;
    
    const deleteButton = cardTemplateCopy.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return cardTemplateCopy;
}


renderCards();