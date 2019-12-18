const deleteEstate = async id => {
  const token = localStorage.getItem("token");
  try {
    confirm("Czy na pewno chcesz usunąć to ogłoszenie?");
    const response = await axios({
      method: "delete",
      url: `http://node-api-estates.herokuapp.com/api/v1/estates/${id}`,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`
      }
    });
    console.log(response);
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

export default deleteEstate;
