const form = document.querySelector("#form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const password2 = document.querySelector("#password2");

//cheking function

const checkInputValue = function (
  parentElement,
  message,
  email = false,
  passwordValidation = false,
  passwordCheck = false
) {
  if (parentElement.value === "" || !isValidUsername(parentElement)) {
    showError(parentElement, message);
  } else if (email) {
    if (isValidEmail(parentElement.value)) {
      showSuccess(parentElement);
    } else {
      showError(parentElement, "Invalid email");
    }
  } else if (passwordValidation) {
    if (isValidPassword(parentElement.value)) {
      showSuccess(parentElement);
    } else {
      showError(
        parentElement,
        "Password does not have minimum 8 letters, with at least one symbol, upper and lower case letters and a number",
        true
      );
    }
  } else if (passwordCheck) {
    if (
      parentElement.value === password.value &&
      isValidPassword(parentElement.value)
    ) {
      showSuccess(password2);
    } else if (
      !isValidPassword(password.value) &&
      parentElement.value === password.value
    ) {
      showError(password2, "Your password is invalid!");
    } else {
      showError(password2, "Passwords do not match");
    }
  } else {
    showSuccess(parentElement);
  }
};

const getFieldName = function (input) {
  return input.id.charAt[0].toUpperCase() + input.id.slice(1);
};

const showError = function (input, message, bigErr = false) {
  const formControl = input.parentElement;
  const small = formControl.querySelector("small");
  if (bigErr) {
    formControl.classList.add("error-big");
    small.innerText = message;
  } else {
    formControl.classList.add("error");
    small.innerText = message;
  }
};

const showSuccess = function (input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

const isValidUsername = function (parentElement) {
  const re = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return re.test(parentElement.value);
};
const isValidEmail = function (email) {
  const re =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email);
};

function isValidPassword(password) {
  var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let success = [];
  checkInputValue(username, "Username is required!!");
  checkInputValue(email, "Email required", true);
  checkInputValue(password, "Password required", false, true, false);
  checkInputValue(
    password2,
    "Password confirmation required!",
    false,
    false,
    true
  );
  const all = form.querySelectorAll(".form-control");
  all.forEach((i) => {
    if (i.classList.contains("success")) {
      success.push(true);
    }
  });
  if (success.filter((i) => i === true).length === 4) {
    renderSuccesRegister();
    setTimeout(function () {
      location.reload();
    }, 20000);
  }
});

const renderSuccesRegister = function () {
  form.innerHTML = "";
  const markup = `<div class="form-control-successed">
          <h2 class="sMessage">Sucessfully registered!</h2> 
          <br>

          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="body_1" width="215" height="161" style="
    margin-left: 45px;
    margin-bottom:50px;">

<g transform="matrix(0.31445312 0 0 0.31445312 26.999996 -0)">
    <path d="M470.6 105.4C 483.1 117.9 483.1 138.2 470.6 150.7L470.6 150.7L214.6 406.7C 202.1 419.2 181.8 419.2 169.3 406.7L169.3 406.7L41.300003 278.7C 28.800003 266.2 28.800003 245.90001 41.300003 233.40001C 53.800003 220.90001 74.100006 220.90001 86.600006 233.40001L86.600006 233.40001L192 338.7L425.4 105.4C 437.9 92.9 458.19998 92.9 470.69998 105.4L470.69998 105.4L470.6 105.4z" stroke="none" fill="#23cc71" fill-rule="nonzero"/>
</g>
</svg>`;
  document.querySelector(".form").insertAdjacentHTML("afterbegin", markup);
};
