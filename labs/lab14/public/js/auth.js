document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".auth-form");
  if (!form) {
    return;
  }

  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("password2");
  const status = form.querySelector("[data-status]");
  const submitButton = form.querySelector(".submit-btn");

  if (!password || !status || !submitButton) {
    return;
  }

  const isSignup = Boolean(confirmPassword);

  const setState = (message, isValid) => {
    status.textContent = message;
    status.classList.toggle("invalid", !isValid);
    status.classList.toggle("valid", isValid);
    submitButton.disabled = !isValid;
  };

  const validateSignup = () => {
    if (!isSignup) {
      setState("", true);
      return true;
    }

    if (password.value.length < 8) {
      setState("Minimo 8 caracteres.", false);
      return false;
    }

    if (password.value !== confirmPassword.value) {
      setState("Las contrasenas no coinciden.", false);
      return false;
    }

    setState("Contrasena valida.", true);
    return true;
  };

  password.addEventListener("input", validateSignup);
  if (confirmPassword) {
    confirmPassword.addEventListener("input", validateSignup);
  }

  form.addEventListener("submit", (event) => {
    if (!validateSignup()) {
      event.preventDefault();
    }
  });

  validateSignup();
});
