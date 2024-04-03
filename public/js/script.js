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
let btn = document.getElementById("theme");

btn.addEventListener("click", function () {
  const body = document.body;
  btn.style.transform = btn.style.transform ? "" : "rotate(180deg)";
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    btn.style.color = "white";
    console.log("dark");
  } else {
    body.setAttribute("data-theme", "light");
    btn.style.color = "black";
    console.log("light");
  }
});
