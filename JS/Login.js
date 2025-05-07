const wrapper = document.querySelector(".wrapper");
const registerLink = document.querySelector(".register-link");
var loginLink = document.querySelector(".login-link");

registerLink.onclick = () => {
  wrapper.classList.add("active");
};

loginLink.onclick = () => {
  wrapper.classList.remove("active");
};

// Register
document
  .getElementById("register-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Registration successful, switch to login form
        alert("Registration successful! Please login.");
        wrapper.classList.remove("active");
        document.getElementById("register-form").reset();
      })
      .catch((error) => {
        alert(error.message);
      });
  });

// Login
document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login successful, redirect to home page
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Invalid email or password.");
    });
});
