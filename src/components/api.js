const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c',
      'Content-Type': 'application/json'
    }
  }

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const submitAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        avatar: avatar
        })

      }).then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
}

export const submitCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
    
        body: JSON.stringify({
          name: name,
          link: link
        })

      }).then(checkResponse) 
      .catch((err) => {
        console.log(err);
      });
}

export const submitEdit = (name, job) => {
   return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
          name: name,
          about: job
        })
      }).then(checkResponse) 
      .catch((err) => {
        console.log(err);
      });
}

export const getCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(checkResponse) 
      .catch((err) => {
        console.log(err);
      });

}

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(checkResponse) 
      .catch((err) => {
    console.log(err);
  });
}

export const deleteLikeCard = (card) => {
    return fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${card.dataset.idcard}`, {
        method: 'DELETE',
        headers: {
          authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c'
        }
      }).then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
}

export const putLikeCard = (card) => {
   return fetch(`https://nomoreparties.co/v1/wff-cohort-26/cards/likes/${card.dataset.idcard}`, {
        method: 'PUT',
        headers: {
          authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c'
        }
      }).then(checkResponse)
      .catch((err) => {
        console.log(err);
      });
}

