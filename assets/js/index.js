import "@babel/polyfill";
var searchSelect = new Selectal("#search__select");

import createQuery from "./modules/createQuery";
import showEstates from "./modules/showEstates";
import showDetailedInfo from "./modules/showDetailedInfo";

const results = document.querySelector(".results__list");
const queryForm = document.querySelector(".search");
const loginBtn = document.querySelector("#login-btn");
const logoutBtn = document.querySelector("#logout-btn");
const postNew = document.querySelector("#post-new");
const myEstates = document.querySelector("#my-estates");

const logOn = localStorage.getItem("logOn");

const user = JSON.parse(localStorage.getItem("user"));

const logout = () => {
  localStorage.clear();
  location.reload();
};

if (logOn) {
  postNew.style.display = "inline-block";
  logoutBtn.style.display = "inline-block";
  myEstates.style.display = "inline-block";
} else {
  loginBtn.style.display = "inline-block";
}

const showMyEstates = () => {
  const query = `?userID=${user._id}`;
  getEstates();
};

logoutBtn.addEventListener("click", logout);
myEstates.addEventListener("click", showMyEstates);

let estate = {};
let estateDetails;

const onSearchFormSubmit = e => {
  e.preventDefault();
  const query = createQuery();
  getEstates(query);
};

const insertAfterNode = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const onListClick = e => {
  const estate = e.target.closest("li");
  if (estate) {
    const ID = estate.dataset.id;
    getSingleEstate(ID);
    if (estateDetails === undefined) {
      estateDetails = document.createElement("li");
      estateDetails.classList.add("results__details", "tr");
      insertAfterNode(estate, estateDetails);
    } else {
      estateDetails.parentNode.removeChild(estateDetails);
      estateDetails = undefined;
    }
  }
};

const getEstates = async (query = "") => {
  try {
    const response = await fetch(
      `http://node-api-estates.herokuapp.com/api/v1/estates${query}`
    );
    const data = await response.json();
    showEstates(data.data.estates);
  } catch (err) {
    console.log(err);
  }
};

const getSingleEstate = async id => {
  try {
    const response = await fetch(
      `http://node-api-estates.herokuapp.com/api/v1/estates/${id}`
    );
    const data = await response.json();
    estate = { ...data.data.estate };
    showDetailedInfo(estate, estateDetails);
  } catch (err) {
    console.log(err);
  }
};

getEstates();

results.addEventListener("click", onListClick);
queryForm.addEventListener("submit", onSearchFormSubmit);
