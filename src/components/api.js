const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
      authorization: '839b686b-1261-4d4d-8af6-118db8d9e09c',
      'Content-Type': 'application/json'
    }
  }

export const submitAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
        avatar: avatar
        })

      }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
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

      }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
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
      }).then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const getCard = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });

}

export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }

})
}