import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET Single Comment
const getSingleComment = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/comments/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch comment with id ${id}`);
        }
        return response.json();
      })
      .then(resolve)
      .catch(reject);
  });

// GET Comments by DutyId
const getCommentsByDutyId = (dutyId, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/comments/duty/${dutyId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// CREATE Comment
const createComment = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then(resolve)
      .catch(reject);
  });

// UPDATE Comment
const updateComment = (payload, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/comments/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to update comment. Status: ${response.status}`);
        }

        return response.status === 200 ? null : response.json();
      })
      .then(resolve)
      .catch(reject);
  });

// DELETE Comment
const deleteComment = (id, uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/api/comments/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        uid,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete comment. Status: ${response.status}`);
        }

        if (response.status === 204) {
          resolve(); // no body
        } else {
          response.json().then(resolve).catch(reject);
        }
      })
      .catch(reject);
  });

export { getSingleComment, getCommentsByDutyId, createComment, updateComment, deleteComment };
