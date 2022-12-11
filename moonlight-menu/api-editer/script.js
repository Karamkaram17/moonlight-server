const Display = document.getElementById("displaydiv");
const form = document.getElementById("myForm");
const shortcuts = document.getElementById("shortcuts");

displayMenuItems();
function displayMenuItems() {
  fetch("/menu/data")
    .then((response) => response.json())
    .then((data) => {
      disp(data);
      menuTypes(data);
    });
}

function menuTypes(DATA) {
  const menutypes = [];
  DATA.forEach((element) => {
    if (element.category != undefined) {
      menutypes.push(element.category);
    }
  });
  let menutype = menutypes.filter(
    (item, index) => menutypes.indexOf(item) === index
  );
  menutype.forEach((type) => {
    let btn = document.createElement("button");
    btn.innerText = type;
    shortcuts.appendChild(btn);
    btn.onclick = function filterer() {
      let newData = [];
      DATA.forEach((elm) => {
        if (elm.category == type) {
          newData.push(elm);
        }
      });
      Display.innerHTML = "";
      disp(newData);
    };
    let dispAll = document.getElementById("dispAll");
    dispAll.onclick = function () {
      Display.innerHTML = "";
      disp(DATA);
    };
  });
}

function disp(data) {
  data.forEach((element) => {
    let div = document.createElement("div");
    div.innerHTML = `<span>${element.name}</span>
  <a  href="edit-item.html?id=${element.id}"><i style="font-size: 16px" class="fa">
    &#xf044;
  </i></a>
  <i style="font-size: 16px" class="fa"onclick="deleteItem(${element.id})">
    &#xf014;
  </i>`;
    Display.appendChild(div);
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
  // (you would handle the submission here)
  createItem();
  Display.innerHTML = "";
  shortcuts.innerHTML = `<button id="dispAll">All</button>`;
  displayMenuItems();
});

function createItem() {
  const nameValue = document.getElementById("name");
  const categoryValue = document.getElementById("category");
  const priceValue = document.getElementById("price");
  const descriptionValue = document.getElementById("description");
  const date = new Date().getTime();
  fetch(`/menu/data/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue.value.trim(),
      category: categoryValue.value.trim().toLowerCase(),
      price: priceValue.value.trim(),
      description: descriptionValue.value.trim(),
      id: date,
    }),
  }).then(() => {
    nameValue.value = "";
    categoryValue.value = "";
    priceValue.value = "";
    descriptionValue.value = "";
  });
}

function deleteItem(id) {
  const answer = window.confirm("are you sure you want to delete ?");
  if (answer) {
    fetch(`/menu/data/${id}`, {
      method: "DELETE",
    });
  }
  Display.innerHTML = "";
  shortcuts.innerHTML = `<button id="dispAll">All</button>`;
  displayMenuItems();
}

let date = new Date().getFullYear();
let copy = document.getElementById("copy");
copy.innerHTML = `&copy; ${date}`;
