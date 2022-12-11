const form = document.getElementById("myForm");
const displaydiv = document.getElementById("displaydiv");
var nameValue = document.getElementById("name");
var categoryValue = document.getElementById("category");
var priceValue = document.getElementById("price");
var descriptionValue = document.getElementById("description");
const params = window.location.search;
const id = new URLSearchParams(params).get("id");

displayMenuItems();

function displayMenuItems() {
  fetch(`/menu/data/${id}`)
    .then((response) => response.json())
    .then((data) => {
      nameValue.value = data.name;
      categoryValue.value = data.category;
      priceValue.value = data.price;
      descriptionValue.value = data.description;
    });
}
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const requiredFields = form.querySelectorAll("[required]");
  let hasEmptyFields = false;
  for (const field of requiredFields) {
    if (field.value === "") {
      hasEmptyFields = true;
      break;
    }
  }
  if (hasEmptyFields) {
    alert("Please fill out all required fields.");
    return;
  }
  fetch(`/menu/data/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue.value.trim(),
      category: categoryValue.value.trim().toLowerCase(),
      price: priceValue.value.trim(),
      description: descriptionValue.value.trim(),
    }),
  }).then(() => {
    displaydiv.style.display = "block";
    displaydiv.innerHTML = `
    <div>successfully updated !</div>
    <div><a href="/api-editer"
            ><button style="background-color: inherit; border-radius: 5px">
              return to home page
            </button></a
          ></div>`;
  });
});

let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy.innerHTML = `&copy; ${date}`;
