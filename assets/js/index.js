var searchSelect = new Selectal("#search__select");

const results = document.querySelector(".results__list");
const queryForm = document.querySelector(".search");

let html = "";

const createQuery = () => {
  const name = document.querySelector("#title").value;
  const city = document.querySelector("#place").value;
  const priceFrom = document.querySelector("#min-price").value;
  const priceTo = document.querySelector("#max-price").value;
  const areaFrom = document.querySelector("#min-area").value;
  const areaTo = document.querySelector("#max-area").value;
  const roomsFrom = document.querySelector("#min-rooms").value;
  const roomsTo = document.querySelector("#max-rooms").value;
  const sorting = document.querySelector("#search__select").value;

  const queryObj = {
    name: name ? `name=${name}` : null,
    city: city ? `city=${city}` : null,
    priceFrom: priceFrom ? `price[gte]=${priceFrom}` : null,
    priceTo: priceTo ? `price[lte]=${priceTo}` : null,
    areaFrom: areaFrom ? `area[gte]=${areaFrom}` : null,
    areaTo: areaTo ? `area[lte]=${areaTo}` : null,
    roomsFrom: roomsFrom ? `rooms[gte]=${roomsFrom}` : null,
    roomsTo: roomsTo ? `rooms[lte]=${roomsTo}` : null,
    sorting: sorting ? `sort=${sorting}` : null
  };

  let query = "?";
  for (item in queryObj) {
    if (queryObj[item]) query += queryObj[item] + "&";
  }

  console.log(query);
  return query;
};

const showEstates = list => {
  if (!list.length > 1) {
    return "<li>Niestety nie znaleziono wyników o wybranych kryteriach</li>";
  } else {
    html = list
      .map(
        estate => `<li class="results__item">
        <div class="results__img">
            <img src='http://node-api-estates.herokuapp.com/${
              estate.mainImage
            }'>
        </div>
        <div class="results__info">
            <div class="results__info-title">
                <span class="results__title tb">${estate.name}</span>
                <span class="resulst__place tr">Miasto: ${estate.city}</span>
            </div>
            <div class="results__info-main tbs1">
                <div class="results__area">
                    <span class="results__area-key">Powierzchnia:</span>
                    <span class="results__area-value trs1">${
                      estate.area
                    }m<sup>2</sup></span>
                </div>
                <div class="results__rooms">
                    <span class="results__rooms-key">Pokoje:</span>
                    <span class="results__rooms-value trs1">${
                      estate.rooms
                    }</span>
                </div>
                <div class="results__date">
                    <span class="results__date-key">Data dodania ogłoszenia:</span>
                    <span class="results__date-value trs1">${estate.createdAt.slice(
                      0,
                      10
                    )}</span>
                </div>
            </div>
        </div>
        <div class="results__price">
            <span class="results__price-value tbl1">${estate.price} zł</span>
        </div>
    </li>`
      )
      .join(" ");
    results.innerHTML = html;
  }
};

const onSearchFormSubmit = e => {
  e.preventDefault();
  const query = createQuery();
  getEstates(query);
};

const getEstates = async (query = "") => {
  try {
    const response = await fetch(
      `http://node-api-estates.herokuapp.com/api/v1/estates${query}`
    );
    const data = await response.json();
    console.log(data.data.estates);
    showEstates(data.data.estates);
  } catch (err) {
    console.log(err);
  }
};

getEstates();

queryForm.addEventListener("submit", onSearchFormSubmit);
