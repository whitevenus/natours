import axios from "axios";

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    if (res.data.status === "success") {
      // showAlert("success", "登陆成功！");
      alert("注册成功！");
      window.setTimeout(() => {
        location.assign("/");
      }, 500);
    }
  } catch (err) {
    // showAlert("error", err.response.data.message);
    alert(err.response.data.message);
  }
};
