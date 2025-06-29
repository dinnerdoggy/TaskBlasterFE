import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Users Categories
const getCategories = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET Single Category by Id & Uid
const getSingleCategory = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${id}?uid=${uid}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE Category
const createCategory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE Category
const updateCategory = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${payload.id}`, {
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

// DELETE Category
const deleteCategory = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${id}?uid=${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // eslint-disable-next-line consistent-return
      .then(async (response) => {
        if (!response.ok) throw new Error('Failed to delete category');

        // If 204 No Content, there's nothing to parse
        const text = await response.text();
        if (!text) return resolve(); // all good, nothing returned

        const data = JSON.parse(text);
        resolve(data);
      })
      .catch(reject);
  });

export { getCategories, getSingleCategory, createCategory, updateCategory, deleteCategory };
