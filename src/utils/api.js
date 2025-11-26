const baseUrl = "http://localhost:3001";
const headers = {
  "Content-Type": "application/json",
};
const handleServerResponse = (res) =>
  res.ok ? res.json() : Promise.reject(res.status);

const getInitialItems = () => {
  return fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);
};

const addItem = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(handleServerResponse);
};

function removeItem(id) {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: headers,
  }).then(handleServerResponse);
}

export { addItem, removeItem, getInitialItems, handleServerResponse };
