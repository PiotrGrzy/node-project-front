const form = document.querySelector("#newEstateForm");

const sendNewEstateReq = async (
  title,
  city,
  price,
  area,
  photo,
  description,
  contact,
  rooms
) => {
  const type = "mieszkanie";
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

  //   var data = JSON.stringify({
  //     name: title,
  //     area: area,
  //     price: price,
  //     type: type,
  //     city: city,
  //     photo: photo,
  //     rooms: rooms,
  //     description: description,
  //     contact: contact,
  //     userName: user.name,
  //     userID: user._id
  //   });

  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function() {
    if (this.readyState === 4) {
      console.log(JSON.parse(this.responseText));
    }
  });

  xhr.open("POST", "http://node-api-estates.herokuapp.com/api/v1/estates");
  xhr.setRequestHeader("authorization", `Bearer ${token}`);
  // xhr.setRequestHeader("cache-control", "no-cache");
  // xhr.setRequestHeader("postman-token", "f15cb0ca-92a7-c23d-b5e4-7ded6f6d294d");

  xhr.send(data);
};

const onFormSubmit = e => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const city = document.querySelector("#place").value;
  const price = document.querySelector("#price").value * 1;
  const area = document.querySelector("#area").value * 1;
  const photo = document.querySelector("#photo").files[0].name;
  const description = document.querySelector("#description").value;
  const contact = document.querySelector("#contact").value;
  const rooms = document.querySelector("#rooms").value;

  sendNewEstateReq(
    title,
    city,
    price,
    area,
    photo,
    description,
    contact,
    rooms
  );
};

form.addEventListener("submit", onFormSubmit);
