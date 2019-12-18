import '@babel/polyfill';

import createQuery from './modules/createQuery';
import showEstates from './modules/showEstates';
import showDetailedInfo from './modules/showDetailedInfo';
import deleteEstate from './modules/deleteEstate';

const searchSelect = new Selectal('#search__select');

const results = document.querySelector('.results__list');
const queryForm = document.querySelector('.search');
const loginBtn = document.querySelector('#login-btn');
const logoutBtn = document.querySelector('#logout-btn');
const postNew = document.querySelector('#post-new');
const myEstates = document.querySelector('#my-estates');

const logOn = localStorage.getItem('logOn');

const user = JSON.parse(localStorage.getItem('user'));

const logout = () => {
	localStorage.clear();
	location.reload();
};

if (logOn) {
	postNew.style.display = 'inline-block';
	logoutBtn.style.display = 'inline-block';
	myEstates.style.display = 'inline-block';
} else {
	loginBtn.style.display = 'inline-block';
}

const showMyEstates = () => {
	console.log('klik');
	const query = `?userID=${user._id}`;
	console.log(query);
	getEstates(query, true);
};

logoutBtn.addEventListener('click', logout);
myEstates.addEventListener('click', showMyEstates);

//let estate = {};
let estateDetails;

const onSearchFormSubmit = e => {
	e.preventDefault();
	const query = createQuery();
	getEstates(query);
};

const insertAfterNode = (referenceNode, newNode) => {
	referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const onListClick = async e => {
	const estate = e.target.closest('li');
	const ID = estate.dataset.id;
	if (e.target.className === 'results__delete-btn') {
		if (estate) {
			return deleteEstate(ID);
		}
	} else if (e.target.className === 'results__update-btn') {
		const estateToUpdate = await getSingleEstate(ID);
		localStorage.setItem('estate', JSON.stringify(estateToUpdate));
		return location.replace('../update.html');
	}

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

const getEstates = async (query = '', enableUpdate = false) => {
	try {
		const response = await fetch(
			`http://node-api-estates.herokuapp.com/api/v1/estates${query}`
		);
		const data = await response.json();
		showEstates(data.data.estates, enableUpdate);
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
		const estate = { ...data.data.estate };
		showDetailedInfo(estate, estateDetails);
		return estate;
	} catch (err) {
		console.log(err);
	}
};

getEstates();

results.addEventListener('click', onListClick);
queryForm.addEventListener('submit', onSearchFormSubmit);
