"use strict";
let personName = document.querySelector("#person-name");
let personCode = document.querySelector("#person-code");
let loginForm = document.querySelector("#form-login");
let signUpButton = document.querySelector("#sign-up");
let loginDiv = document.querySelector("#login");
let startOver = document.querySelector("#start-over");
startOver.addEventListener("click", (e) => {
  localStorage.clear();
  location.reload();
  personName.value = "";
  personCode.value = "";
});
let data = loadPersons();
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let personsString = localStorage.getItem("DATA");
  let persons = [];
  if (personsString) {
    persons = JSON.parse(personsString);
  }
  let user = persons.find((obj) => {
    if (obj.name == personName.value && obj.code == personCode.value) {
      return true;
    }
  });
  personName.value = "";
  personCode.value = "";
  if (user) {
    completeSignUp(user);
    openMenu(user);
  } else {
    alert("User Not Found");
  }
});
signUpButton.addEventListener("click", (e) => {
  personName.value = "";
  personCode.value = "";
  let children = Array.from(loginDiv.children);
  children.forEach((child) => child.remove());
  let h2 = document.createElement("h2");
  h2.innerText = "Sign Up";
  loginDiv.append(h2);
  let signupForm = document.createElement("form");
  let labelName = document.createElement("label");
  labelName.innerText = "Enter your name: ";
  let labelCode = document.createElement("label");
  labelCode.innerText = "Enter your code word: ";
  let labelSkinWhite = document.createElement("label");
  labelSkinWhite.setAttribute("for", "skin-white");
  labelSkinWhite.innerText = "White  ";
  let labelSkinBlack = document.createElement("label");
  labelSkinBlack.setAttribute("for", "skin-black");
  labelSkinBlack.innerText = "Black  ";
  let labelEyesBlue = document.createElement("label");
  labelEyesBlue.setAttribute("for", "eyes-blue");
  labelEyesBlue.innerText = "Blue  ";
  let labelEyesBrown = document.createElement("label");
  labelEyesBrown.setAttribute("for", "eyes-brown");
  labelEyesBrown.innerText = "Brown  ";
  let inputName = document.createElement("input");
  inputName.setAttribute("id", "signup-name");
  inputName.required = true;
  let inputCode = document.createElement("input");
  inputCode.required = true;
  labelName.append(inputName);
  labelCode.append(inputCode);
  let radioSkinWhite = document.createElement("input");
  radioSkinWhite.setAttribute("name", "skin");
  radioSkinWhite.setAttribute("id", "skin-white");
  radioSkinWhite.setAttribute("type", "radio");
  radioSkinWhite.setAttribute("value", "white");
  radioSkinWhite.checked = true;
  let radioSkinBlack = document.createElement("input");
  radioSkinBlack.setAttribute("name", "skin");
  radioSkinBlack.setAttribute("id", "skin-black");
  radioSkinBlack.setAttribute("type", "radio");
  radioSkinBlack.setAttribute("value", "black");
  labelSkinWhite.append(radioSkinWhite);
  labelSkinBlack.append(radioSkinBlack);
  let radioEyesBlue = document.createElement("input");
  radioEyesBlue.setAttribute("name", "eyes");
  radioEyesBlue.setAttribute("id", "eyes-blue");
  radioEyesBlue.setAttribute("type", "radio");
  radioEyesBlue.setAttribute("value", "blue");
  radioEyesBlue.checked = true;
  let radioEyesBrown = document.createElement("input");
  radioEyesBrown.setAttribute("name", "eyes");
  radioEyesBrown.setAttribute("id", "eyes-brown");
  radioEyesBrown.setAttribute("type", "radio");
  radioEyesBrown.setAttribute("value", "brown");
  labelEyesBlue.append(radioEyesBlue);
  labelEyesBrown.append(radioEyesBrown);
  let buttonSignUp = document.createElement("button");
  buttonSignUp.setAttribute("type", "submit");
  buttonSignUp.style.marginTop = "10px";
  buttonSignUp.innerText = "Create Avatar";
  let backToLogIn = document.createElement("button");
  backToLogIn.innerText = "Back To Login";
  backToLogIn.addEventListener("click", (e) => {
    location.reload();
  });
  signupForm.append(
    labelName,
    labelCode,
    "Choose Skin Color:",
    labelSkinWhite,
    labelSkinBlack,
    "Choose Eye Color:",
    labelEyesBlue,
    labelEyesBrown,
    buttonSignUp,
    backToLogIn
  );
  signupForm.setAttribute("id", "signup-form");
  loginDiv.append(signupForm);
  signupForm.addEventListener("submit", (e) => {
    let personsString = localStorage.getItem("DATA");
    let persons = [];
    if (personsString) {
      persons = JSON.parse(personsString);
    }
    console.log(persons);
    if (
      persons.some((obj) => {
        return obj.name == inputName.value;
      })
    ) {
      alert("User Name Already Taken");
    } else {
      handleSignUp(e, inputName, inputCode);
    }
  });
});
function handleSignUp(e, name, code) {
  e.preventDefault();
  let skinTypes = Array.from(document.getElementsByName("skin"));
  let eyeColors = Array.from(document.getElementsByName("eyes"));
  let skinColor = "";
  let eyeColor = "";
  skinTypes.forEach((el) => {
    if (el.checked) {
      skinColor = el.value;
    }
  });
  eyeColors.forEach((el) => {
    if (el.checked) {
      eyeColor = el.value;
    }
  });
  console.log(skinColor, eyeColor);
  let person = {
    name: name.value,
    code: code.value,
    skinColor,
    eyeColor,
  };
  completeSignUp(person);
  savePerson(person);
}
function completeSignUp(person) {
  let children = Array.from(loginDiv.children);
  children.forEach((el) => {
    el.remove();
  });
  let h2 = document.createElement("h2");
  h2.innerText = `Hi ${person.name}`;
  console.log(person.eyeColor, person.skinColor);
  let personFace = createFace(person);
  let logOut = document.createElement("button");
  logOut.innerText = "Log Out";
  logOut.style.marginTop = "20px";
  logOut.addEventListener("click", (e) => {
    location.reload();
  });
  loginDiv.append(h2, personFace, logOut);
  openMenu(person);
}
function savePerson(person) {
  data.push(person);
  localStorage.setItem("DATA", JSON.stringify(data));
}
function loadPersons() {
  let friendsJSON = localStorage.getItem("DATA");
  if (friendsJSON) {
    return JSON.parse(friendsJSON);
  } else {
    return [];
  }
}
function createFace(person) {
  let skinColor = person.skinColor;
  let eyeColor = person.eyeColor;
  let personFace = document.createElement("div");
  personFace.id = "person";
  let hatBottom = document.createElement("div");
  hatBottom.id = "hat-bottom";
  let face = document.createElement("div");
  face.id = "face";
  let eyeRight = document.createElement("div");
  eyeRight.setAttribute("class", "eyes right");
  let eyeRightBall = document.createElement("div");
  eyeRightBall.setAttribute("class", "eyeball");
  eyeRight.append(eyeRightBall);
  let eyeLeft = document.createElement("div");
  eyeLeft.setAttribute("class", "eyes left");
  let eyeLeftBall = document.createElement("div");
  eyeLeftBall.setAttribute("class", "eyeball");
  eyeLeft.append(eyeLeftBall);
  let nose = document.createElement("div");
  nose.setAttribute("class", "nose");
  let mouth = document.createElement("div");
  mouth.setAttribute("class", "mouth");
  if (skinColor == "black") {
    face.style.backgroundColor = "RGB(198, 134, 66)";
  }
  if (eyeColor == "brown") {
    eyeLeftBall.style.backgroundColor = "brown";
    eyeRightBall.style.backgroundColor = "brown";
  }
  face.append(eyeRight, eyeLeft, nose, mouth);
  personFace.append(hatBottom, face);
  return personFace;
}
let menu = document.querySelector("#menu");
function openMenu(person) {
  // Clear Friends Menu
  let children = Array.from(menu.children);
  children === null || children === void 0
    ? void 0
    : children.forEach((element) => {
        element.remove();
      });
  //Display Info
  let name = person.name;
  let code = person.code;
  let skinColor = person.skinColor;
  let eyeColor = person.eyeColor;
  let h2 = document.createElement("h2");
  h2.innerText = person.name.toUpperCase();
  let h3name = document.createElement("h3");
  h3name.innerText = `Name: ${name}`;
  let h3code = document.createElement("h3");
  h3code.innerText = `Code: ${code}`;
  let h3skin = document.createElement("h3");
  h3skin.innerText = `Skin: ${skinColor}`;
  let h3eyes = document.createElement("h3");
  h3eyes.innerText = `Eyes: ${eyeColor}`;
  menu === null || menu === void 0
    ? void 0
    : menu.append(h2, h3name, h3code, h3skin, h3eyes);
}
function handleEditing(person) {}
