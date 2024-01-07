import axios from "axios";

// updateDate
export const updateSettings = async (data, type) => {
  try {
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";
    const res = await axios({
      url,
      method: "PATCH",
      data,
    });

    if (res.data.status === "success") {
      alert(`${type.toUpperCase()} 更新成功～`);
    }
  } catch (err) {
    alert(err.response.data.message);
  }
};
