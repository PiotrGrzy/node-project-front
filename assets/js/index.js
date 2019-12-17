var searchSelect = new Selectal('#search__select');

const results = document.querySelector('.results__list');
const queryForm = document.querySelector('.search');

let html = '';
let estate = {};
let estateDetails;

const createQuery = () => {
	const name = document.querySelector('#title').value;
	const city = document.querySelector('#place').value;
	const priceFrom = document.querySelector('#min-price').value;
	const priceTo = document.querySelector('#max-price').value;
	const areaFrom = document.querySelector('#min-area').value;
	const areaTo = document.querySelector('#max-area').value;
	const roomsFrom = document.querySelector('#min-rooms').value;
	const roomsTo = document.querySelector('#max-rooms').value;
	const sorting = document.querySelector('#search__select').value;

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

	let query = '?';
	for (item in queryObj) {
		if (queryObj[item]) query += queryObj[item] + '&';
	}

	return query;
};

const showEstates = list => {
	if (!list.length > 1) {
		return '<li>Niestety nie znaleziono wyników o wybranych kryteriach</li>';
	} else {
		html = list
			.map(
				estate => `<li class="results__item" data-id=${estate._id}>
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
        </div>
    </li>`
			)
			.join(' ');
		results.innerHTML = html;
	}
};

const showSingleEstate = estate => {
	if (estateDetails !== undefined) {
		const descrContent = document.createElement('p');
		descrContent.classList.add('results__descr-content');
		descrContent.innerText = estate.description;
		const descr = document.createElement('div');
		descr.classList.add('results__descr');
		descr.appendChild(descrContent);
		estateDetails.appendChild(descr);

		const contactUsername = document.createElement('span');
		contactUsername.classList.add('results__contact-username');
		contactUsername.innerText = estate.userName;
		const contactPhone = document.createElement('span');
		contactPhone.classList.add('results__contact-number');
		contactPhone.innerText = `tel. ${estate.contact}`;
		const contact = document.createElement('div');
		contact.classList.add('results__contact', 'tb');
		contact.appendChild(contactUsername);
		contact.appendChild(contactPhone);
		estateDetails.appendChild(contact);
	}
};

const onSearchFormSubmit = e => {
	e.preventDefault();
	const query = createQuery();
	getEstates(query);
};

const insertAfterNode = (referenceNode, newNode) => {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const onListClick = e => {
	const estate = e.target.closest('li');
	if (estate) {
		const ID = estate.dataset.id;
		getSingleEstate(ID);

		if (estateDetails === undefined) {
			estateDetails = document.createElement('li');
			estateDetails.classList.add('results__details', 'tr');
			insertAfterNode(estate, estateDetails);
		} else {
			estateDetails.parentNode.removeChild(estateDetails);
			estateDetails = undefined;
		}
	}
};

const getEstates = async (query = '') => {
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
		showSingleEstate(estate);
	} catch (err) {
		console.log(err);
	}
};

getEstates();

results.addEventListener('click', onListClick);
queryForm.addEventListener('submit', onSearchFormSubmit);
