// import { clientCredentials } from '../utils/client';

const endpoint = 'https://localhost:7127';

// GET Users Categories
const getCategories = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories?uid=${uid}"`, {
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
const updateCategory = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${payload.id}`, {
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

// DELETE Category
const deleteCategory = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories/${id}?uid=${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getCategories, getSingleCategory, createCategory, updateCategory, deleteCategory };
