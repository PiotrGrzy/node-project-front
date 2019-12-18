const results = document.querySelector(".results__list");

const showEstates = (list, enableUpdate) => {
  let html = "";
  if (list.length < 1) {
    html = "<li>Niestety nie znaleziono wyników o wybranych kryteriach</li>";
  } else {
    html = list
      .map(
        estate => `<li class="results__item" data-id=${estate._id}>
          <div class="results__img">
              <img src='${estate.mainImage}'>
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
                      <span class="results__date-key">Data&nbsp;dodania&nbsp;ogłoszenia:</span>
                      <span class="results__date-value trs1">${estate.createdAt.slice(
                        0,
                        10
                      )}</span>
                  </div>
              </div>
          </div>
          <div class="results__price">
              <span class="results__price-value tbl1">${
                estate.price
              }&nbsp;zł</span>
           ${
             enableUpdate
               ? `<button id="update-btn" class="results__update-btn" >Edytuj</button>
           <button id="delete-btn" class="results__delete-btn"'>Usuń</button>`
               : ""
           }
            
          </div>
      </li>`
      )
      .join(" ");
  }
  results.innerHTML = html;
};

export default showEstates;
