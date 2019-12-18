//import showModal from "./modules/showModal";

const form = document.querySelector(".sign-in__form");

const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");
const modalBtn = document.querySelector(".modal__btn");

const showModal = (text, type = null) => {
  modal.style.display = "flex";
  modalText.textContent = text;
  if (type === "negative") {
    modalText.style.color = "red";
  } else {
    modalText.style.color = "#fffff";
  }
};

const hideModal = () => {
  modal.style.display = "none";
  location.replace("../../index.html");
};

modalBtn.addEventListener("click", hideModal);

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
    //alert("Jesteś zalogowany");
    showModal("Jesteś zalogowany");

    console.log(response);
  } catch (err) {
    console.log(err);
    alert("Coś poszło nie tak, spróbuj ponownie");
  }
};

const onFormSubmit = e => {
  e.preventDefault();
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  sendLoginReq(email, password);
};

form.addEventListener("submit", onFormSubmit);
