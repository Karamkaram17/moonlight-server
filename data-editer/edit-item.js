const itemNameDOM = document.querySelector("#item-edit-name");
const itemCategoryDOM = document.querySelector("#item-edit-category");
const itemPriceDOM = document.querySelector("#item-edit-price");
const itemDescriptionDOM = document.querySelector("#item-edit-description");
const editFormDOM = document.querySelector(".single-item-form");
const editBtnDOM = document.querySelector(".item-edit-btn");
const formAlertDOM = document.querySelector(".form-alert");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

const showTask = async () => {
  try {
    const {
      data: { item },
    } = await axios.get(`/data/${id}`);
    itemNameDOM.value = item.name;
    itemCategoryDOM.value = item.category;
    itemPriceDOM.value = item.price;
    itemDescriptionDOM.value = item.description;
  } catch (error) {
    console.log(error);
  }
};

showTask();

// patch /data/:id
editFormDOM.addEventListener("submit", async (e) => {
  editBtnDOM.textContent = "Loading...";
  e.preventDefault();
  try {
    const itemName = itemNameDOM.value;
    const categoryName = itemCategoryDOM.value;
    const priceName = itemPriceDOM.value;
    const descriptionName = itemDescriptionDOM.value;
    await axios.patch(`/data/${id}`, {
      name: itemName,
      category: categoryName,
      price: priceName,
      description: descriptionName,
    });
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, edited item `;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    console.error(error);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  editBtnDOM.textContent = "edit";
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// footer
let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy.innerHTML = `&copy; ${date}`;

function logOut() {
  window.location.reload();
}
