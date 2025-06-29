import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

export const checkUserExists = async (uid) => {
  const res = await fetch(`${endpoint}/api/users/checkuser/${uid}`);
  if (!res.ok && res.status !== 404) throw new Error('Check failed');
  return res.status !== 404;
};

export const registerUser = async (uid) => {
  const res = await fetch(`${endpoint}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  });
  if (!res.ok) throw new Error('Register failed');
  return res.json();
};
