import "@babel/polyfill";
var searchSelect = new Selectal("#search__select");

import createQuery from "./modules/createQuery";
import showEstates from "./modules/showEstates";
import showDetailedInfo from "./modules/showDetailedInfo";

const results = document.querySelector(".results__list");
const queryForm = document.querySelector(".search");

let html = "";
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
    showDetailedInfo(estate);
  } catch (err) {
    console.log(err);
  }
};

getEstates();

results.addEventListener("click", onListClick);
queryForm.addEventListener("submit", onSearchFormSubmit);
