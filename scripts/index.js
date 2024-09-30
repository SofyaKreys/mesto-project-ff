// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

function deleteCard(e) {
    let card = e.target.closest('.card');
    card.remove();
}

function Card() {
    const cardTemplate = document.querySelector('#card-template').content;
    initialCards.forEach((item) => {
        const cardTemplateCopy = cardTemplate.cloneNode(true);
        cardTemplateCopy.querySelector('.card__image').setAttribute("src", item.link);
        cardTemplateCopy.querySelector('.card__title').textContent = item.name;

        const deleteButton = cardTemplateCopy.querySelector('.card__delete-button');
        deleteButton.addEventListener('click', deleteCard);

        const list = document.querySelector('.places__list'); 
        list.append(cardTemplateCopy);
    })
} 

Card();