const shouldRedirecToGroceryList = () =>
  !!localStorage.getItem(APP_CONSTANTS.currentUser);

if (shouldRedirecToGroceryList()) window.location.href = "../index.html";

const loginForm = document.getElementById("loginForm");

const isUserPresent = (name) =>
  !!localStorage.getItem(APP_CONSTANTS.users) &&
  JSON.parse(localStorage.getItem(APP_CONSTANTS.users)).find(
    (user) => user.name === name
  );

const setCurrentUser = (name) =>
  localStorage.setItem(APP_CONSTANTS.currentUser, name);

const isPasswordCorrect = (name, password) =>
  JSON.parse(localStorage.getItem(APP_CONSTANTS.users))?.find(
    (user) => user.name === name
  )?.password === password;

const getOldUsersFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(APP_CONSTANTS.users))
    ? JSON.parse(localStorage.getItem(APP_CONSTANTS.users))
    : [];

const redirectToGroceryList = () => (window.location.href = "../index.html");

const validateMaxNoOfUserData = () => {
  const users = getOldUsersFromLocalStorage();
  if (users.length === APP_CONSTANTS.maximumNoOfUserData)
    removeOldestUserData();
};

const removeOldestUserData = () => {
  const users = getOldUsersFromLocalStorage();
  localStorage.removeItem(users[0].name);
  users.splice(0, 1);
  updateUserList(users);
};

const updateUserList = (users) =>
  localStorage.setItem(APP_CONSTANTS.users, JSON.stringify(users));

const addUser = (name, password) => {
  const users = getOldUsersFromLocalStorage();
  users.push({ name, password });
  updateUserList(users);
};

const onSignInClick = (event) => {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (isUserPresent(userName) && isPasswordCorrect(userName, password)) {
    setCurrentUser(userName);
    redirectToGroceryList();
  } else if (
    isUserPresent(userName) &&
    !isPasswordCorrect(userName, password)
  ) {
    alert("Incorrect Password");
  } else {
    validateMaxNoOfUserData();
    addUser(userName, password);
    setCurrentUser(userName);
    redirectToGroceryList();
  }
};

//event listeners
loginForm.addEventListener("submit", onSignInClick);
