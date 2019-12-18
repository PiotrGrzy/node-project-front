import showModal from "./modules/showModal";

const form = document.querySelector("#newEstateForm");
const estate = JSON.parse(localStorage.getItem("estate"));
const fillForm = estate => {
  document.querySelector("#title").value = estate.name;
  document.querySelector("#place").value = estate.city;
  document.querySelector("#price").value = estate.price;
  document.querySelector("#area").value = estate.area;
  document.querySelector("#photo-link").value = estate.mainImage;
  document.querySelector("#description").value = estate.description;
  document.querySelector("#contact").value = estate.contact;
  document.querySelector("#rooms").value = estate.rooms;
  document.querySelector("input:checked").value = estate.type;
};

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
      method: "patch",
      url: `http://node-api-estates.herokuapp.com/api/v1/estates/${estate._id}`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      },
      data: data
    });

    showModal("Zauktualizowano pomyślnie");
    console.log(response);
  } catch (err) {
    console.log(err);
    showModal("Coś poszło nie tak, spróbuj ponownie", "negative");
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
fillForm(estate);
