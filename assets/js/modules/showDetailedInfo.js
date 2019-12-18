const showDetailedInfo = (estate, estateDetails) => {
  if (estateDetails !== undefined) {
    const descrContent = document.createElement("p");
    descrContent.classList.add("results__descr-content");
    descrContent.innerText = estate.description;
    const descr = document.createElement("div");
    descr.classList.add("results__descr");
    descr.appendChild(descrContent);
    estateDetails.appendChild(descr);

    const contactUsername = document.createElement("span");
    contactUsername.classList.add("results__contact-username");
    contactUsername.innerText = estate.userName;
    const contactPhone = document.createElement("span");
    contactPhone.classList.add("results__contact-number");
    contactPhone.innerText = `tel. ${estate.contact}`;
    const contact = document.createElement("div");
    contact.classList.add("results__contact", "tb");
    contact.appendChild(contactUsername);
    contact.appendChild(contactPhone);
    estateDetails.appendChild(contact);
  }
};

export default showDetailedInfo;
