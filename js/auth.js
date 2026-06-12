function register() {
  let fullname = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let username = document.getElementById("newUsername").value;
  let password = document.getElementById("newPassword").value;

  let error = document.getElementById("registerError");

  if (fullname === "" || email === "" || username === "" || password === "") {
    error.innerHTML = "Please fill all fields";
    return;
  }

  // SO, I HAVE TO CREATE USER OBJECT TO STORE IN LOCAL STORAGE, AND THIS OBJECT CONTAINS ALL THE USER DETAILS.
  let user = {
    fullname: fullname,
    email: email,
    username: username,
    password: password,
  };

  // SAVE TO LOCAL STORAGE, And I am saving the user object as a string using JSON.stringify which is username.

  localStorage.setItem(username, JSON.stringify(user));
  error.innerHTML = "Account created successfully";

  // NOW, HERE IS SETUP TO CLEAR INPUTS

  document.getElementById("fullname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}

// HERE IS WHERE I BUILD THE LOGIN FUNCTION

function login() {
  let username = document.getElementById("userName").value;
  let password = document.getElementById("passWord").value;
  let error = document.getElementById("loginError");

  if (username === "" || password === "") {
    error.innerHTML = "Please fill all fields";
    return;
  }

  // NOW, THIS IS HOW I FETCH USER FROM STORAGE

  let storedUser = localStorage.getItem(username);
  if (storedUser === null) {
    error.innerHTML =
      "User not found, Please register first or try a different username";
    return;
  }

  let userData = JSON.parse(storedUser);
  if (userData.password === password) {
    error.innerHTML = "Login successful";

    // SO, HERE IS WHERE I SAVE LOGIN SESSION

    localStorage.setItem("loggedInUser", username);

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  } else {
    error.innerHTML = "Incorrect password";
  }
}

// HERE IS THE LOGOUT FUNCTION
function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}

function isLoggedIn() {
  let loggedInUser = localStorage.getItem("loggedInUser");
  return loggedInUser !== null;
}

function getCurrentUser() {
  let username = localStorage.getItem("loggedInUser");
  if (username === null) {
    return null;
  }

  // Get user's full data
  let userDataString = localStorage.getItem(username);
  if (userDataString === null) {
    return null;
  }

  // Convert string to object
  let userData = JSON.parse(userDataString);
  return userData;
}

function updateHeaderForAuth() {
  let userLogin = document.getElementById("userLogin");
  if (!userLogin) {
    return;
  }

  if (isLoggedIn()) {
    let user = getCurrentUser();

    userLogin.innerHTML = `
    <a href="../../pages/dashboard.html" class="loginbutton">Dashboard</a>
    <a href="../../pages/orders/orders.html" class="loginbutton">Orders</a>
    <a href="../../pages/analytics/analytics.html" class="loginbutton">Analytics</a>
    <a href="../profile.html" class="loginbutton">Profile</a>
    <a href="../../pages/settings/settings.html" class="loginbutton">Settings</a>
    <button onclick="logout()" class="registerbutton1">Logout</button>
    `;
  } else {
    userLogin.innerHTML = `
    <a href="../pages/about.html" class="loginbutton">About Us</a>
    <a href="/login.html" class="loginbutton">Login</a>
    <a href="/register.html" class="registerbutton">Register</a>
    `;
  }
}
