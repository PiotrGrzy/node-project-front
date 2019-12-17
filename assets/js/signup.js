const form = document.querySelector(".sign-up__form");

const sendNewUser = async (name, email, password) => {
  console.log(name, email, password);

  const data = JSON.stringify({
    name: name,
    email: email,
    password: password
  });

  try {
    const response = await axios({
      method: "post",
      url: "http://node-api-estates.herokuapp.com/api/v1/users/signup",
      headers: {
        "content-type": "application/json"
      },
      data: data
    });
    const user = response.data.data.user;
    const token = response.data.token;
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    alert("Dodano nowego użytkownika");
    location.replace("../../index.html");

    console.log(response);
  } catch (err) {
    console.log(err);
    alert("Coś poszło nie tak, spróbuj ponownie");
  }
};

const onFormSubmit = async e => {
  e.preventDefault();
  const name = document.querySelector("#username").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  sendNewUser(name, email, password);
};

form.addEventListener("submit", onFormSubmit);
