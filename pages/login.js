import React, { useContext, useState } from "react";
import { fetchData } from "../utils/fetchData";
import { useRouter } from "next/router";
import styles from "../styles/Login.module.css";
import cookie from "js-cookie";
import { isUserAuthenticated } from "../utils/isUserAuthenicated";
import Input from "../components/Input";
import { DataContext } from "../store/globalstate";
import Button from "../components/Button";
const Login = () => {
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const initialState = { login_name: "", password: "" };
  const [userFrom, setUserForm] = useState(initialState);
  const { login_name, password } = userFrom;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userFrom, [name]: value });
  };

  const handleLogin = async () => {
    const login_body = {
      login_name: userFrom.login_name,
      password: userFrom.password,
    };
    // const res = await fetchData("POST", "auth/login", login_body, null);
    // const data = await res;
    // if (data.status_code != 200) {
    //   dispatch({
    //     type: "NOTIFY",
    //     payload: { error: res.error_message },
    //   });
    // }

    dispatch({
      type: "NOTIFY",
      payload: { success: "Logged in" },
    });
    // dispatch({
    //   type: "AUTH",
    //   payload: { token: data.access_token, user: data.user },
    // });
    // localStorage.setItem("__auth__user__", true);
    // cookie.set("__auth__login__", data.access_token);
  };
  if (isUserAuthenticated()) {
    router.push("/");
  }

  return (
    <div className={styles.login_body_}>
      <div className={styles.login_card}>
        <div className={styles.logo_container}>
          <div className={styles.branding_logo}></div>
        </div>
        <div className={styles.form__login}>
          <Input
            placeholder={`Login Name`}
            onChange={handleInputChange}
            name="login_name"
            id="login_name"
          />
          <Input
            placeholder={`Password`}
            onChange={handleInputChange}
            name="password"
            id="password"
          />
        </div>
        <Button name="Login" onClick={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
