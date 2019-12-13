const form = document.querySelector(".sign-up__form");

const sendNewUser = async (name, email, password) => {

    console.log(name, email, password);

    const data = JSON.stringify({
        "name": name,
        "email": email,
        "password": password
    });

    console.log(data);

    var xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(JSON.parse(this.response));

            const token = JSON.parse(this.response).token;
            localStorage.setItem("token", token);

            const user = JSON.parse(this.response).data.user;
            localStorage.setItem("user", JSON.stringify(user));

            console.log(token);
            console.log(user);

            alert("Jesteś zalogowany");
            location.replace("../../index.html");
        }
    });

    xhr.open("POST", "http://node-api-estates.herokuapp.com/api/v1/users/signup");
    xhr.setRequestHeader("content-type", "application/json");

    xhr.send(data);
}

const onFormSubmit = async e => {
    e.preventDefault();
    const name = document.querySelector("#username").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    sendNewUser(name, email, password);
};

form.addEventListener("submit", onFormSubmit);