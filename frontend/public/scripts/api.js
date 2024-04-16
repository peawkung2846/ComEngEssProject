import { BACKEND_URL } from "./config.js";

export async function getItems() {
  const items = await fetch(`${BACKEND_URL}/items`).then((r) => r.json());
  return items;
}

export async function createItem(item) {
  await fetch(`${BACKEND_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function update(item) {
  await fetch(`${BACKEND_URL}/items/update/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });
}

export async function deleteItem(id, item) {
  await fetch(`${BACKEND_URL}/items/${id}`, {
    method: "DELETE",
  });
}



export async function getUserIP() {
  try {
      const response = await fetch("https://api.ipify.org/?format=json").then((r) => r.json());
      return response;
  } catch (error) {
      console.error("Error getting user IP:", error);
      return null;
  }
}


export async function checkID(ipAddress) {
  try {
      const response = await fetch(`${BACKEND_URL}/items/check/`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: ipAddress })
      }).then((r) => r.json());
      return response;
  } catch (error) {
      console.error('Error checking ID:', error);
      return null;
  }
}