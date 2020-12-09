const shouldRedirectUser = () => {
  return !localStorage.getItem(APP_CONSTANTS.currentUser);
};

if (shouldRedirectUser()) redirectToLoginPage();

const redirectToLoginPage = () => (window.location.href = "pages/login.html");

const getCurrentUserData = () =>
  JSON.parse(
    localStorage.getItem(localStorage.getItem(APP_CONSTANTS.currentUser))
  );

let groceries = getCurrentUserData() ? getCurrentUserData() : [];

const onAddButtonClick = () => {
  if (groceries.length === APP_CONSTANTS.maximumNoOfGroceriesPerUser) {
    alert(APP_CONSTANTS.maxListLimitMessage);
    return;
  }
  if (isGroceryInEditMode()) return;
  groceries.push({ name: "", isEditMode: true });
  createGroceriesList();
  addEventListners();
};

const isGroceryInEditMode = () =>
  groceries.some((grocery) => grocery.isEditMode);

const createGroceriesList = () => {
  const listContainer = document.getElementById("listContainer");
  listContainer.innerHTML = getGroceriesList();
  localStorage.setItem(
    localStorage.getItem(APP_CONSTANTS.currentUser),
    JSON.stringify(groceries)
  );
};

const addEventListners = () => {
  const itemName = document.querySelector(".item-name");
  const saveButton = document.getElementById("saveBtn");
  const editButtons = document.getElementsByName("edit-btn");
  const deleteButtons = document.getElementsByName("delete-btn");

  itemName?.addEventListener("change", (event) =>
    onGroceryNameChangeHandler(event, itemName.id)
  );

  saveButton?.addEventListener("click", () => onSaveButtonClick(itemName.id));

  editButtons.forEach((editButton) => {
    editButton.addEventListener("click", () =>
      onEditButtonClick(parseInt(editButton.id.replace("edit-button-", ""), 10))
    );
  });

  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener("click", () =>
      onDeleteButtonClick(deleteButton.id)
    );
  });
};

const onEditButtonClick = (itemIndex) => {
  groceries = groceries.map((grocery, index) => {
    if (index === itemIndex) return { ...grocery, isEditMode: true };
    return grocery;
  });
  createGroceriesList();
  addEventListners();
};

const onDeleteButtonClick = (itemIndex) => {
  removeGrocery(itemIndex);
  createGroceriesList();
  addEventListners();
};

const removeGrocery = (itemIndex) =>
  (groceries = groceries.filter(
    (_grocery, index) => index !== Number(itemIndex)
  ));

const switchEditModeOff = (itemIndex) =>
  (groceries = groceries.map((grocery, index) => {
    if (index === Number(itemIndex)) return { ...grocery, isEditMode: false };
    return grocery;
  }));

const onSaveButtonClick = (itemIndex) => {
  switchEditModeOff(itemIndex);
  createGroceriesList();
  addEventListners();
};

const onGroceryNameChangeHandler = (event, itemIndex) => {
  groceries = groceries.map((grocery, index) => {
    if (index === Number(itemIndex))
      return { ...grocery, name: event.target.value };
    return grocery;
  });
};

const getGroceriesList = () => {
  let groceryListElements = "";
  groceries.forEach((grocery, index) => {
    groceryListElements += `<div class="list-item">
        ${
          grocery.isEditMode
            ? `<input id="${index}" type="text" class="item-name" value="${grocery.name}" placeholder="Item name" autofocus="true" />`
            : `<p class="item-name-read-only">${grocery.name}<p>`
        }
        ${
          grocery.isEditMode
            ? '<i id="saveBtn" class="fas fa-save action-icon"></i>'
            : `<i id="edit-button-${index}" class="fas fa-edit action-icon" name="edit-btn"></i>`
        }
        <i id="${index}" class="fas fa-trash-alt action-icon" name="delete-btn"></i>
      </div>`;
  });
  return groceryListElements;
};

const renderUserName = () => {
  document.getElementById("userName").innerHTML = localStorage.getItem(
    APP_CONSTANTS.currentUser
  );
};

const onLogoutButtonClick = () => {
  localStorage.removeItem(APP_CONSTANTS.currentUser);
  redirectToLoginPage();
};

// On Application Load
createGroceriesList();
addEventListners();
renderUserName();

// Static Elements
const addBtn = document.getElementById("addBtn");
const logoutBtn = document.getElementById("logoutBtn");

// Global event listeners
addBtn.addEventListener("click", onAddButtonClick);
logoutBtn.addEventListener("click", onLogoutButtonClick);
