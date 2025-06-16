// import { clientCredentials } from '../utils/client';

const endpoint = 'https://localhost:7127';

// GET Single Duty
const getSingleDuty = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch duty with id ${id}`);
        }
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });

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
const createDuty = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties`, {
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

// UPDATE Duty
const updateDuty = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties/${payload.id}`, {
      method: 'PATCH',
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

// DELETE Duty
const deleteDuty = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/duties/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete duty. Status: ${response.status}`);
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

export { getSingleDuty, getDutiesByCat, createDuty, updateDuty, deleteDuty };
