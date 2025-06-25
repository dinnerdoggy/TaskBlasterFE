const endpoint = 'https://localhost:7127';

export const checkUserExists = async (uid) => {
  const res = await fetch(`${endpoint}/api/users/checkuser/${uid}`);
  if (!res.ok && res.status !== 404) throw new Error('Error checking user');
  return res.status !== 404;
};

export const registerUser = async (uid) => {
  const res = await fetch(`${endpoint}/api/users/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid }),
  });
  if (!res.ok) throw new Error('Error registering user');
  return res.json();
};
