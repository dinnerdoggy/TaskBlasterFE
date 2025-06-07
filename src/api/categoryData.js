import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Users Categories
const getCategories = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/categories.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
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
    fetch(`${endpoint}/api/categories/${payload.id}.json`, {
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
