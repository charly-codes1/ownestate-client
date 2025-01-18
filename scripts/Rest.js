const password = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");

  togglePassword.addEventListener("click", function () {
    // Toggle the type attribute
    const type = password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);

    // Toggle the eye symbol
    this.textContent = type === "password" ? "👁️" : "";
});