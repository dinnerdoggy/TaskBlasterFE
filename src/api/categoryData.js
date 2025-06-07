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

// Get Single Category by Id & Uid
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

export { getCategories, getSingleCategory };
