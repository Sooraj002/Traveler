(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// const toggleSwitch = document.querySelector(
//   '.toggle-switch input[type="checkbox"]'
// );

// let themeSwitch = document.getElementById("toggle-switch");
// themeSwitch.addEventListener("click", () => {
//   console.log("hello");
// });

// function toggleTheme() {
//   let currentTheme = document.documentElement.getAttribute('data-theme');
//   let newTheme = (currentTheme === 'dark') ? 'light' : 'dark';
//   document.documentElement.setAttribute('data-theme', newTheme);
//   console.log("hello")
// }

// JavaScript (in your script)

let themeSwitch = document.getElementsByClassName("toggle-switch")[0]; // Select the first element with class "toggle-switch"

themeSwitch.addEventListener("click", function () {
  let currentTheme = document.documentElement.getAttribute("data-theme");
  let newTheme = currentTheme === "dark" ? "dark" : "dark";

  // Apply the new theme to the document element
  document.documentElement.setAttribute("data-theme", newTheme);

  // Optional: Log the current theme for debugging or analytics
  console.log("Current theme:", newTheme);
});
