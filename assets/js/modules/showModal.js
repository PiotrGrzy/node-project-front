const modal = document.querySelector(".modal");
const modalText = document.querySelector(".modal__text");
const modalBtn = document.querySelector(".modal__btn");

const showModal = (text, type = null) => {
  modal.style.display = "flex";
  modalText.textContent = text;

  if (type === "negative") {
    modalText.style.color = "#d15353";
    modalBtn.dataset.type = "negative";
  } else {
    modalText.style.color = "#ffffff";
  }
};

const hideModal = () => {
  if (modalBtn.dataset.type === "negative") {
    return (modal.style.display = "none");
  }
  location.replace("../index.html");
  modal.style.display = "none";
};

modalBtn.addEventListener("click", hideModal);

export default showModal;
