// Middleware function to set theme based on cookie
async function setThemeMiddleware() {
  const body = document.body;
  let theme = (await getCookie("theme")) || "light"; // Get theme from cookie or default to light

  // Update UI based on theme
  body.setAttribute("data-theme", theme);
  btn.style.color = theme === "light" ? "black" : "white";
  btn.style.transform = theme === "light" ? "" : "rotate(180deg)";
}

(async () => {
  "use strict";

  // Call middleware to set theme
  await setThemeMiddleware();

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

let btn = document.getElementById("theme");
async function toggleTheme() {
  const body = document.body;
  let theme = (await getCookie("theme")) || "light"; // Get theme from cookie or default to light

  // Toggle theme
  theme = theme === "light" ? "dark" : "light";

  // Update UI based on theme
  body.setAttribute("data-theme", theme);
  btn.style.color = theme === "light" ? "black" : "white";
  btn.style.transform = theme === "light" ? "" : "rotate(180deg)";

  // Store updated theme in cookie
  setCookie("theme", theme, 30); // Set cookie with expiration time (adjust as needed)

  console.log(`Theme set to: ${theme}`);
}

btn.addEventListener("click", toggleTheme);

// Function to set a cookie
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// Function to get a cookie
function getCookie(name) {
  return new Promise((resolve, reject) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        resolve(c.substring(nameEQ.length, c.length));
    }
    resolve(null);
  });
}
