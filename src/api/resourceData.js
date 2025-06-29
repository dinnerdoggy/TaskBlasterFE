import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

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

// GET Single Resource
const getSingleResource = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/resources/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch resource with id ${id}`);
        }
        return response.json();
      })
      .then(resolve)
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
const updateResource = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/Resources/${payload.id}`, {
      method: 'PUT',
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

// DELETE Resource
const deleteResource = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/Resources/${id}?uid=${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete resource. Status: ${response.status}`);
        }

        // If 204 No Content, don't try to parse JSON
        if (response.status === 204) {
          resolve(); // no body to parse
        } else {
          response.json().then(resolve).catch(reject);
        }
      })
      .catch(reject);
  });

export { getResources, getSingleResource, createResource, updateResource, deleteResource };
