const form = document.querySelector("#newEstateForm");

const sendNewEstateReq = async (
  title,
  city,
  price,
  area,
  photo,
  description,
  contact,
  rooms,
  type
) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  console.log(
    title,
    city,
    price,
    type,
    area,
    rooms,
    photo,
    description,
    user,
    contact
  );
  var data = new FormData();
  data.append("name", title);
  data.append("area", area);
  data.append("price", price);
  data.append("type", type);
  data.append("city", city);
  data.append("photo", photo);
  data.append("rooms", rooms);
  data.append("description", description);
  data.append("contact", contact);
  data.append("userName", user.name);
  data.append("userID", user._id);

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      console.log(JSON.parse(this.responseText));
      alert("Dodałeś nowe ogłoszenie!");
      location.replace("../../index.html");
    } else {
      alert("Coś poszło nie tak, sprawdź formularz i spróbuj ponownie");
    }
  });

  xhr.open("POST", "http://node-api-estates.herokuapp.com/api/v1/estates");
  xhr.setRequestHeader("authorization", `Bearer ${token}`);

  xhr.send(data);
};

const onFormSubmit = e => {
  e.preventDefault();
  const checkForFile = () => {
    if (document.querySelector("#photo")) {
      return document.querySelector("#photo").files[0];
    } else {
      return null;
    }
  };

  const title = document.querySelector("#title").value;
  const city = document.querySelector("#place").value;
  const price = document.querySelector("#price").value * 1;
  const area = document.querySelector("#area").value * 1;
  const photo = checkForFile();
  const description = document.querySelector("#description").value;
  const contact = document.querySelector("#contact").value;
  const rooms = document.querySelector("#rooms").value;
  const type = document.querySelector("input:checked").value;
  sendNewEstateReq(
    title,
    city,
    price,
    area,
    photo,
    description,
    contact,
    rooms,
    type
  );
};

form.addEventListener("submit", onFormSubmit);
