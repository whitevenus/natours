/* eslint-disable */
import axios from "axios";
import { showAlert } from "./alerts";

export const login = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios({
      method: "POST",
      url: "http://127.0.0.1:3000/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "success") {
      // showAlert("success", "登陆成功！");
      alert("登陆成功！");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    // showAlert("error", err.response.data.message);
    alert(err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "http://127.0.0.1:3000/api/v1/users/logout",
    });
    if (res.data.status === "success") location.reload(true);
  } catch (err) {
    alert("注销失败! 请再次尝试～");
  }
};
