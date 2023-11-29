import cookie from "js-cookie";
import { useRouter } from "next/router";
import { parse } from "cookie";
export const fetchData = async (method, url, body, ctx) => {
  const cookies = parse(ctx?.req.headers.cookie || "");
  const a_token = cookies.__auth__login__;
  const token = a_token
    ? a_token
    : cookie.get("__auth__login__")
    ? cookie.get("__auth__login__")
    : null;
  const res = await fetch(`${process.env.API_URL}/api/${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  // if (data.status_code !== 200) {
  //   return;
  // }
  return data;
};
