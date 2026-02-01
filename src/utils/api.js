const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};

const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);

const getInitialItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

const addItem = (cardData, token) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(cardData),
  }).then(handleServerResponse);
};

function removeItem(id, token) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

function editProfile(userData, token) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  }).then(handleServerResponse);
}

function addCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

function removeCardLike(id, token) {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
}

export {
  addItem,
  removeItem,
  getInitialItems,
  handleServerResponse,
  editProfile,
  addCardLike,
  removeCardLike,
};
