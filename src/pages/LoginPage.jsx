import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../services/mutations";
import { setCookie } from "../utils/cookie";

import styles from "./LoginPage.module.css";

function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (event) => {
    setForm((form) => ({ ...form, [event.target.name]: event.target.value }));
  };

  const loginHandler = (event) => {
    event.preventDefault();

    const { username, password } = form;

    if (!username || !password)
      return alert("User Name and Password is Necessary");

    mutate(form, {
      onSuccess: (data) => {
        setCookie("token", data.data?.token);
        navigate("/");
      },
      onError: (error) =>  alert(error.response.data.message),
    });
  };

  return (
    <div className={styles.box}>
      <img src="../assets/Union.png"  />
      <p>فرم ورود</p>
      <form onSubmit={loginHandler} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={form.username}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={form.password}
          onChange={changeHandler}
        />
        <button type="submit">ورود</button>
      </form>
    </div>
  );
}

export default LoginPage;
