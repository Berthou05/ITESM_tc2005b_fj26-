document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const p1 = document.getElementById("p1");
  const p2 = document.getElementById("p2");
  const status = document.getElementById("status");
  const signInButton = document.getElementById("sign-in-button");
  const tooltip = document.getElementById("tooltip-password");

  function validar() {
    if (p1.value.length < 8) {
      status.textContent = "Mínimo 8 caracteres";
      return false;
    }

    if (p1.value !== p2.value) {
      status.textContent = "No coinciden";
      signInButton.style.backgroundColor = "grey";
      return false;
    }

    status.textContent = "Correcto";
    signInButton.style.backgroundColor = "blue";
    return true;
  }



  p1.addEventListener("input", validar);
  p2.addEventListener("input", validar);

  // Function to recomend password restrictions when user focuses on the first password field
  
  p1.addEventListener("mouseenter", function () {
    const rect = p1.getBoundingClientRect();

    tooltip.style.top = rect.top + "px";
    tooltip.style.left = rect.left + "px";

    tooltip.style.visibility = "visible";
    tooltip.style.opacity = "1";
  });

  p1.addEventListener("mouseleave", function () {
    tooltip.style.visibility = "hidden";
    tooltip.style.opacity = "0";
  });  

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const ok = validar();
    console.log("validar:", ok);

    if (!ok) return;

    document.getElementById("login-screen").style.display = "none";
    document.getElementById("welcome-screen").style.display = "flex";
  });

  const logout = document.getElementById("logout");
  logout.addEventListener("click", function () {
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
  });
});