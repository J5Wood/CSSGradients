// ***** Display and input section

// ***** Each list item needs to have option for one or two degree values between 0 and 100
// ***** Maybe a slider later? Start with input boxes.
// ***** Need degree adjuster up top, one adjuster for all values
// ***** if hex value contains incorrect character remove
// ***** add check for incorrect hex inputs)

const colorDisplay = document.querySelector(".selection-display");

const hexInput = document.querySelector(".hex-value");
const redInput = document.querySelector(".red");
const blueInput = document.querySelector(".blue");
const greenInput = document.querySelector(".green");
const opacityInput = document.querySelector(".opacity-number");
const gradientList = document.querySelector(".gradient-list");
let red = 0;
let green = 255;
let blue = 0;
let opacity = 1;

redInput.addEventListener("change", (e) => handleColorChange(e));
blueInput.addEventListener("change", (e) => handleColorChange(e));
greenInput.addEventListener("change", (e) => handleColorChange(e));
opacityInput.addEventListener("change", (e) => handleColorChange(e));
hexInput.addEventListener("change", (e) =>
  handleHexChange(e.target.value.slice(1))
);
gradientList.addEventListener("change", (e) => handleGradientChange(e));

redInput.addEventListener("keyup", (e) => handleColorChange(e));
blueInput.addEventListener("keyup", (e) => handleColorChange(e));
greenInput.addEventListener("keyup", (e) => handleColorChange(e));
opacityInput.addEventListener("keyup", (e) => handleColorChange(e));

redInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
blueInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
greenInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
opacityInput.addEventListener("blur", (e) => handleEmptyDeselection(e));

function handleColorChange(e) {
  if (e.target.value > 255) e.target.value = 255;
  if (e.target.value < 0 || e.target.value.match(/[^0-9.]/)) e.target.value = 0;
  if (e.target.name === "red") {
    red = e.target.value;
  } else if (e.target.name === "blue") {
    blue = e.target.value;
  } else if (e.target.name === "green") {
    green = e.target.value;
  } else {
    opacity = e.target.value;
  }
  const hexValArr = [
    parseInt(red).toString(16),
    parseInt(green).toString(16),
    parseInt(blue).toString(16),
  ];
  for (let i = 0; i < hexValArr.length; i++) {
    if (hexValArr[i] === "NaN") hexValArr[i] = "00";
    hexValArr[i] = hexValArr[i].padStart(2, "0");
  }
  hexInput.value = `#${hexValArr.join("")}`;

  colorDisplay.style.background =
    currentColor.firstElementChild.style.background = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  currentColor.setAttribute("data-opacity", `${opacity}`);

  currentColor.getElementsByTagName("input")[0].value = `#${hexValArr.join(
    ""
  )}`;
}

function handleHexChange(value) {
  opacity = opacityInput.value;
  let numValArr;
  if (!!value.match(/[^0-9a-fA-F]+/gm)) {
    numValArr = [0, 0, 0];
    hexInput.value = "#000000";
  } else {
    if (value.length < 6) {
      value = value.padStart(6, "0");
    }
    let numArr = value.split(/(.{2})/gm).filter((val) => !!val === true);
    numValArr = numArr.map((num) => parseInt(num, 16));
  }
  red = redInput.value = numValArr[0];
  green = greenInput.value = numValArr[1];
  blue = blueInput.value = numValArr[2];

  colorDisplay.style.background = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  currentColor.firstElementChild.style.background = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  currentColor.getElementsByTagName("input")[0].value = `#${value}`;
  hexInput.value = `#${value}`;
}

function handleEmptyDeselection(e) {
  if (!e.target.value) {
    e.target.value = "0";
    handleColorChange(e);
  }
}

function handleGradientChange(e) {
  console.log(e.target.value);
  // debugger;
  colorDisplay.style.background = `${e.target.value}-gradient(0deg, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${red}, ${green}, ${blue}, ${opacity}))`;
}

// ***** List section

const colorList = document.querySelector(".color-list");

function handleColorSelection(e) {
  currentColor.classList.remove("selected-color");
  if (e.target.className === "color") {
    currentColor = e.target;
  } else {
    currentColor = e.target.parentElement;
  }
  currentColor.classList.add("selected-color");
  let hexColor = currentColor.children[2].value.slice(1);
  hexInput.value = hexColor;
  opacityInput.value = currentColor.dataset.opacity;

  handleHexChange(hexColor);
}

const addColorButton = document.querySelector(".add-color-button");
addColorButton.addEventListener("click", addNewColor);

function addNewColor() {
  // debugger;
  const colorObj = {
    red: redInput.value,
    green: greenInput.value,
    blue: blueInput.value,
    opacity: opacityInput.value,
    hex: hexInput.value,
  };
  const newColor = new Color(colorObj);
  colorList.insertBefore(newColor.render(), colorList.lastElementChild);
}

function removeColor(e) {
  e.target.parentElement.remove();
  e.stopPropagation();
}

addNewColor();
let currentColor = document.getElementsByClassName("color")[0];
