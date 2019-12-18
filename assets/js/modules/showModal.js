const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");
const modalBtn = document.querySelector(".modal__btn");

const showModal = (text, type = null) => {
  modal.style.display = "flex";
  modalText.textContent = text;
  if (type === "negative") {
    modalText.style.color = "red";
  } else {
    modalText.style.color = "#fffff";
  }
};

const hideModal = () => {
  console.log(location);
  location.replace("../../../index.html");
  modal.style.display = "none";
};

modalBtn.addEventListener("click", hideModal);

export default showModal;
