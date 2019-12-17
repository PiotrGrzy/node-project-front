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
  const data = new FormData();
  data.append("name", title);
  data.append("area", area);
  data.append("price", price);
  data.append("type", type);
  data.append("city", city);
  data.append("mainImage", photo);
  data.append("rooms", rooms);
  data.append("description", description);
  data.append("contact", contact);
  data.append("userName", user.name);
  data.append("userID", user._id);

  try {
    const response = await axios({
      method: "post",
      url: "http://node-api-estates.herokuapp.com/api/v1/estates",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      data: data
    });

    alert("Dodano ogłoszenie");
    location.replace("../../index.html");

    console.log(response);
  } catch (err) {
    console.log(err);
    alert("Coś poszło nie tak, spróbuj ponownie");
  }
};

const onFormSubmit = e => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const city = document.querySelector("#place").value;
  const price = document.querySelector("#price").value * 1;
  const area = document.querySelector("#area").value * 1;
  const photo = document.querySelector("#photo-link").value;
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
