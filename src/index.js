// ***** Display and input section

// ***** Maybe a slider later? Start with input boxes.
// ***** Refactor into different modules

// ***** Add dynamic input for background position on radial gradients

// ***** Move gradient type up top, too crowded

const hexInput = document.querySelector(".hex-value");
const redInput = document.querySelector(".red");
const blueInput = document.querySelector(".blue");
const greenInput = document.querySelector(".green");
const opacityInput = document.querySelector(".opacity-number");
const degreeInput = document.querySelector(".degrees");
const percentInput = document.querySelector(".percentage-input");
const colorDisplay = document.querySelector(".selection-display");
const gradientType = document.querySelector("#gradients");
const gradientPosition = document.getElementsByName("position");
const linearOptions = document.querySelector(".linear-options");
const radialOptions = document.querySelector(".radial-options");
const radialShapes = document.getElementsByName("shape");
const keywordPosition = document.querySelector(".keyword-position");
const percentageOne = document.querySelector("#percentage-one");
const percentageTwo = document.querySelector("#percentage-two");
const unitsOne = document.querySelector("#units-one");
const lengthOne = unitsOne.previousElementSibling;
const unitsTwo = document.querySelector("#units-two");
const lengthTwo = unitsTwo.previousElementSibling;
const size = document.querySelector(".size");
const codeDisplay = document.querySelector(".code-display");
const copyCodeButton = document.querySelector(".code-copy-button");

let red = 0;
let green = 255;
let blue = 0;
let opacity = 1;

redInput.addEventListener("change", (e) => handleColorChange(e));
blueInput.addEventListener("change", (e) => handleColorChange(e));
greenInput.addEventListener("change", (e) => handleColorChange(e));
opacityInput.addEventListener("change", (e) => handleColorChange(e));
percentInput.addEventListener("change", (e) => handleColorChange(e));
hexInput.addEventListener("change", (e) =>
  handleHexChange(e.target.value.slice(1))
);

redInput.addEventListener("keyup", (e) => handleColorChange(e));
blueInput.addEventListener("keyup", (e) => handleColorChange(e));
greenInput.addEventListener("keyup", (e) => handleColorChange(e));
opacityInput.addEventListener("keyup", (e) => handleColorChange(e));
percentInput.addEventListener("keyup", (e) => handleColorChange(e));

redInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
blueInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
greenInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
opacityInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
degreeInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
percentInput.addEventListener("blur", (e) => handleEmptyDeselection(e));

degreeInput.addEventListener("change", (e) => updateColorDisplay());
degreeInput.addEventListener("keyup", (e) => updateColorDisplay());

gradientType.addEventListener("change", () => updateColorDisplay());

copyCodeButton.addEventListener("click", (e) => addToClipboard(e));

for (let option of radialShapes) {
  option.addEventListener("change", () => updateColorDisplay());
}

radialOptions.addEventListener("change", () => updateColorDisplay());

function handleColorChange(e) {
  // ***** Handling number checking in a couple different spots, clean up a little?
  if (e.target.value > 255) e.target.value = 255;
  if (e.target.value < 0 || e.target.value.match(/[^0-9.]/)) e.target.value = 0;
  if (e.target.name === "red") {
    red = e.target.value;
  } else if (e.target.name === "blue") {
    blue = e.target.value;
  } else if (e.target.name === "green") {
    green = e.target.value;
  } else if (e.target.name === "percentage-input") {
    colorList.currentColor.dataset.percent = e.target.value;
    colorList.currentColor.childNodes[1].innerHTML = `${e.target.value}%`;
  } else {
    if (e.target.value > 1) e.target.value = 1;
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

  colorList.currentColor.firstElementChild.style.background = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  colorList.currentColor.setAttribute("data-opacity", `${opacity}`);

  colorList.currentColor.getElementsByTagName(
    "input"
  )[0].value = `#${hexValArr.join("")}`;
  sortColorList();
  updateColorDisplay();
}

function handleHexChange(value) {
  opacity = opacityInput.value;
  let numValArr;
  value = value.replace(/[^0-9a-fA-F]/gm, "0");

  if (value.length < 6) {
    value = value.padStart(6, "0");
  }

  let numArr = value.split(/(.{2})/gm).filter((val) => !!val === true);
  numValArr = numArr.map((num) => parseInt(num, 16));

  red = redInput.value = numValArr[0];
  green = greenInput.value = numValArr[1];
  blue = blueInput.value = numValArr[2];
  colorList.currentColor.firstElementChild.style.background = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
  colorList.currentColor.getElementsByTagName("input")[0].value = `#${value}`;
  hexInput.value = `#${value}`;
  sortColorList();
  updateColorDisplay();
}

function handleEmptyDeselection(e) {
  if (!e.target.value) {
    e.target.value = "0";
    if (e.target.id === "degrees") {
      updateColorDisplay();
    } else {
      handleColorChange(e);
    }
  }
}

// ***** Color Display Section

function updateColorDisplay() {
  let positionStyle, position, shape;
  let type = gradientType.value;

  if (type === "radial") {
    linearOptions.style.display = "none";
    radialOptions.style.display = "";

    for (let option of gradientPosition) {
      if (option.checked) {
        positionStyle = option.value;
      }
    }
    for (let option of radialShapes) {
      if (option.checked) {
        shape = option.value;
      }
    }
    if (positionStyle === "keyword") {
      position = `at ${keywordPosition.value}`;
    } else if (positionStyle === "percentage-position") {
      position = `at ${percentageOne.value}% ${percentageTwo.value}%`;
    } else if (positionStyle === "length") {
      let [length, height] = [lengthOne.value, lengthTwo.value];

      // Correct vh units for height of display, not entire window.
      // ***** weird positioning results with vmax, when not adjusting for
      if (
        unitsOne.value === "vh" ||
        (unitsOne.value === "vmax" &&
          colorDisplay.offsetHeight > colorDisplay.offsetWidth) ||
        (unitsOne.value === "vmin" &&
          colorDisplay.offsetHeight < colorDisplay.offsetWidth)
      ) {
        let displayHeight = colorDisplay.offsetHeight;
        let correctedOffset = parseInt(length) * 0.01 * parseInt(displayHeight);
        length = `${correctedOffset}px`;
      } else {
        length += unitsOne.value;
      }
      if (
        unitsTwo.value === "vh" ||
        (unitsTwo.value === "vmax" &&
          colorDisplay.offsetHeight > colorDisplay.offsetWidth) ||
        (unitsTwo.value === "vmin" &&
          colorDisplay.offsetHeight < colorDisplay.offsetWidth)
      ) {
        let displayHeight = colorDisplay.offsetHeight;
        let correctedOffset = parseInt(height) * 0.01 * parseInt(displayHeight);
        height = `${correctedOffset}px`;
      } else {
        height += unitsTwo.value;
      }
      position = `at ${length} ${height}`;
    }

    type = `${type}-gradient(${shape} ${size.value} ${position},`;
  } else {
    radialOptions.style.display = "none";
    linearOptions.style.display = "";
    type += `-gradient( ${degreeInput.value}deg, `;
  }

  const colors = [...document.getElementsByClassName("color")];
  colors.sort((a, b) => a.dataset.percent - b.dataset.percent);

  const gradientList = colors.map((color) => {
    let rgb = color.children[0].style.backgroundColor;

    if (rgb[3] !== "a") {
      rgb =
        rgb.slice(0, 3) +
        "a" +
        rgb.slice(3, rgb.length - 1) +
        `, ${color.dataset.opacity}` +
        rgb.slice(rgb.length - 1);
    }
    rgb += ` ${color.dataset.percent}%`;
    return rgb;
  });
  if (gradientList.length === 1) {
    gradientList[1] = gradientList[0];
  }
  const fullBackground = `${type} ${gradientList.join(", ")})`;
  colorDisplay.style.background = fullBackground;
  codeDisplay.innerHTML = "background: " + fullBackground + ";";
}

const colorList = new ColorList();

function sortColorList() {
  const colorListChildren = [...colorList.list.children];
  colorListChildren.sort((a, b) => a.dataset.percent - b.dataset.percent);
  colorListChildren.forEach((node) => colorList.list.appendChild(node));
}

function addToClipboard() {
  const codeSnippet = document.querySelector(".code-display").innerText;
  navigator.clipboard.writeText(codeSnippet);
}
