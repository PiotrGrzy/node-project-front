import showModal from "./modules/showModal";

const form = document.querySelector(".sign-in__form");

const sendLoginReq = async (email, password) => {
  const data = JSON.stringify({
    email: email,
    password: password
  });
  try {
    const response = await axios({
      method: "post",
      url: "http://node-api-estates.herokuapp.com/api/v1/users/login",
      headers: {
        "content-type": "application/json"
      },
      data: data
    });
    const user = response.data.data.user;
    const token = response.data.token;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("logOn", true);

    showModal("Zostałeś pomyślnie zalogowany");

    console.log(response);
  } catch (err) {
    console.log(err);
    showModal("Podałeś niewłaściwe hasło lub login", "negative");
  }
};

const onFormSubmit = e => {
  e.preventDefault();
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  sendLoginReq(email, password);
};

form.addEventListener("submit", onFormSubmit);
