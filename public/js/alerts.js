/* eslint-disable */

export const hideAlert = () => {
  const el = document.querySelector(".alert");
  console.log(el);
  if (el) el.parentElement.removeChild(el);
};

// type is "success" or "error"
export const showAlert = (type, msg) => {
  hideAlert();
  const markup = `<div class='alert alert--${type}>${msg}</div>`;
  document.querySelector(".header").insertAdjacentHTML("beforebegin", markup);
  // console.log(document.querySelector("body"));
  window.setTimeout(hideAlert, 5000);
};
