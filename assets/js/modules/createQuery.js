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
  for (const item in queryObj) {
    if (queryObj[item]) query += queryObj[item] + "&";
  }

  return query;
};

export default createQuery;
