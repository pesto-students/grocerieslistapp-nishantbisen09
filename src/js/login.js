const shouldRedirecToGroceryList = () =>
  !!localStorage.getItem(APP_CONSTANTS.currentUser);

if (shouldRedirecToGroceryList()) window.location.href = "../index.html";

const signInBtn = document.getElementById("signInBtn");

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

const onSignInClick = (event) => {
  event.preventDefault();
  const userName = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (isUserPresent(userName) && isPasswordCorrect(userName, password)) {
    setCurrentUser(userName);
    window.location.href = "../index.html";
  } else if (
    isUserPresent(userName) &&
    !isPasswordCorrect(userName, password)
  ) {
    alert("Incorrect Password");
  } else {
    const newUsers = JSON.parse(localStorage.getItem(APP_CONSTANTS.users))
      ? JSON.parse(localStorage.getItem(APP_CONSTANTS.users))
      : [];

    if (newUsers.length === 3) {
      localStorage.removeItem(newUsers[0].name);
      newUsers.splice(0, 1);
    }
    newUsers.push({ name: userName, password });
    localStorage.setItem(APP_CONSTANTS.users, JSON.stringify(newUsers));
    setCurrentUser(userName);
    window.location.href = "../index.html";
  }
};

//event listeners
signInBtn.addEventListener("click", onSignInClick);
