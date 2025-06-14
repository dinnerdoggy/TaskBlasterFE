// import { clientCredentials } from '../utils/client';

const endpoint = 'https://localhost:7127';

// GET Duties by Category
const getDutiesByCat = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties/category/${id}`, {
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

// CREATE Duty
const createDuty = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties`, {
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

// UPDATE Duty
const updateDuty = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties/${payload.id}`, {
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

// DELETE Duty
const deleteDuty = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties/${id}?uid=${uid}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getDutiesByCat, createDuty, updateDuty, deleteDuty };
