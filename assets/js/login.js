const form = document.querySelector(".sign-in__form");

const sendLoginReq = async (email, password) => {
  // console.log(email);
  // console.log(password);
  // const data = JSON.stringify({
  //   email: email,
  //   password: password
  // });
  // try {
  //   const response = await fetch(
  //     "http://node-api-estates.herokuapp.com/api/v1/users/login",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       mode: "no-cors",
  //       credentials: "omit",
  //       body: data
  //     }
  //   );
  //   const result = await response.json();

  //   console.log(result);
  // } catch (err) {
  //   console.log(err);
  // }

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
    alert("Jesteś zalogowany");
    location.replace("../../index.html");

    console.log(response);
  } catch (err) {
    console.log(err);
    alert("Coś poszło nie tak, spróbuj ponownie");
  }

  // var xhr = new XMLHttpRequest();

  // xhr.addEventListener("readystatechange", function() {
  //   if (this.readyState === 4) {
  //     console.log(JSON.parse(this.response));
  //     const user = JSON.parse(this.response).data.user;
  //     const token = JSON.parse(this.response).token;
  //     localStorage.setItem("user", JSON.stringify(user));
  //     localStorage.setItem("token", token);
  //     alert("Jesteś zalogowany");
  //     location.replace("../../index.html");
  //   } else {
  //     alert("Coś poszło nie tak, spróbuj ponownie");
  //   }
  // });

  // xhr.open("POST", "http://node-api-estates.herokuapp.com/api/v1/users/login");
  // xhr.setRequestHeader("content-type", "application/json");
  // xhr.withCredentials = false;

  // xhr.send(data);
};

const onFormSubmit = e => {
  e.preventDefault();
  const email = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  sendLoginReq(email, password);
};

form.addEventListener("submit", onFormSubmit);
