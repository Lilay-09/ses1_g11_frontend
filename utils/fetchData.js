export const fetchData = async (method, url, body, token) => {
  const res = await fetch(`${process.env.API_URL}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};
