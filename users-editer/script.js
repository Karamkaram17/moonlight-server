const usersDOM = document.querySelector(".users");
const loadingDOM = document.querySelector(".loading-text");
const formDOM = document.querySelector(".user-form");
const usernameInputDOM = document.querySelector("#username-input");
const passwordInputDOM = document.querySelector("#password-input");
const roleInputDOM = document.querySelector("#role-input");
const formAlertDOM = document.querySelector(".form-alert");

// Load users from /api/users
const showUsers = async () => {
  loadingDOM.style.visibility = "visible";
  try {
    const {
      data: { users },
    } = await axios.get("/users");
    if (users.length < 1) {
      usersDOM.innerHTML = '<h5 class="empty-list">No users in your list</h5>';
      loadingDOM.style.visibility = "hidden";
      return;
    }
    const allusers = users
      .map((user) => {
        return `<div class="single-user">
                  <h5>${user.username} role: ${user.role}</h5>
                  <div class="user-links">
                    <button type="button" class="delete-btn" data-id="${user.username}">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div> `;
      })
      .join("");
    usersDOM.innerHTML = allusers;
  } catch (error) {
    usersDOM.innerHTML =
      '<h5 class="empty-list">There was an error, please try later....</h5>';
  }
  loadingDOM.style.visibility = "hidden";
};

showUsers();

// delete user /api/users/:id
usersDOM.addEventListener("click", async (e) => {
  let res = window.confirm("confirm user delete");
  if (res == true) {
    const el = e.target;
    if (el.parentElement.classList.contains("delete-btn")) {
      loadingDOM.style.visibility = "visible";
      const id = el.parentElement.dataset.id;
      try {
        await axios.delete(`/users/${id}`);
        showUsers();
      } catch (error) {
        console.log(error);
      }
    }
  }
  loadingDOM.style.visibility = "hidden";
});

// form
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;
  const role = roleInputDOM.value;
  try {
    await axios.post("/users", { username, password, role });
    showUsers();
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";
    roleInputDOM.value = "user";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = `success, user added`;
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
