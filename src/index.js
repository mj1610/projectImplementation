const api = `https://randomuser.me/api`;
const adduser = document.getElementById("user-btn");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const descSortbtn = document.getElementById("descSort");
const ascSortbtn = document.getElementById("ascSort");
const appState = [];

adduser.addEventListener("click", async function () {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];
  appState.push(user);
  domRenderer(appState);
});

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    const userEle = document.createElement("div");
    userEle.innerHTML = `<div>
    ${userObj.name.title} ${userObj.name.first} ${userObj.name.last}
    <ol>
    <li>${userObj.gender}</li>
    <li>${userObj.email}</li>
    </ol>
    </div>`;
    userList.appendChild(userEle);
  });
};

searchInput.addEventListener("keyup", (e) => {
  const filterAppState = appState.filter(
    (user) =>
      user.name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.name.last.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filterAppState);
});

descSortbtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? 1 : -1));
  domRenderer(appStateCopy);
});

ascSortbtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name.first < b.name.first ? -1 : 1));
  domRenderer(appStateCopy);
});
