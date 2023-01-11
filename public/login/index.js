const formDOM = document.getElementById("form");
const usernameInputDOM = document.getElementById("username");
const passwordInputDOM = document.getElementById("password");
const formAlertDOM = document.getElementById("alert");
const containerDom = document.getElementById("main-container");

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInputDOM.value;
  const password = passwordInputDOM.value;
  formAlertDOM.innerHTML = ``;
  containerDom.innerHTML = `
    <div>
      <a href="https://moonlight-znjk.onrender.com/users-editer">
        <button class="gotouser">Edit Users</button>
      </a>
    </div>
    <div>
      <a href="https://moonlight-znjk.onrender.com/data-editer">
        <button class="gotodata">Edit Data</button>
      </a>
    </div>
    <div>
      <button onclick="logOut()" class="logout">Log Out</button>
    </div>`;
  try {
    await axios.post("/checklogin", { username: username, password: password });
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";
  } catch (error) {
    formAlertDOM.innerHTML = `check username/password`;
    usernameInputDOM.value = "";
    passwordInputDOM.value = "";
  }
});

function logOut() {
  window.location.reload();
}
