// import { clientCredentials } from '../utils/client';

const endpoint = 'https://localhost:7127';

// GET Resources by Category
const getResources = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/Resources`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE Resource
const createResource = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/Resources`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE Resource
const updateResource = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/Resources/${payload.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// DELETE Resource
const deleteResource = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/Resources/${id}?uid=${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getResources, createResource, updateResource, deleteResource };
