const itemsDOM = document.querySelector(".items");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".item-form");
const nameInputDOM = document.querySelector("#name-input");
const categoryInputDOM = document.querySelector("#category-input");
const priceInputDOM = document.querySelector("#price-input");
const descriptionInputDOM = document.querySelector("#description-input");
const formAlertDOM = document.querySelector(".form-alert");
const shortcuts = document.getElementById("shortcuts");

// Load items from /api/items
const showitems = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { items },
    } = await axios.get("/data");
    if (items.length < 1) {
      itemsDOM.innerHTML = '<h5 class="empty-list">No items in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allitems = items
      .map((item) => {
        return `<div class="single-item">
                  <h5>${item.name}</h5>
                  <div class="item-links">
                    <a href="edit-item.html?id=${item._id}" class="edit-link">
                      <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${item._id}">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>`;
      })
      .join("");
    itemsDOM.innerHTML = allitems;
  } catch (error) {
    itemsDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showitems();

// delete item /api/items/:id
itemsDOM.addEventListener("click", async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains("delete-btn")) {
    loadingDOM.style.visibility = "visible";
    const id = el.parentElement.dataset.id;
    try {
      await axios.delete(`/data/${id}`);
      showitems();
    } catch (error) {
      console.log(error);
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInputDOM.value;
  const category = categoryInputDOM.value;
  const price = priceInputDOM.value;
  const description = descriptionInputDOM.value;
  try {
    await axios.post("/data", { name, category, price, description });
    showitems();
    nameInputDOM.value = "";
    categoryInputDOM.value = "";
    priceInputDOM.value = "";
    descriptionInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, item added`;
    formAlertDOM.classList.add("text-success");
  } catch (error) {
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = `error, please try again`;
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// for footer
let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy.innerHTML = `&copy; ${date}`;

function logOut() {
  window.location.reload();
}
