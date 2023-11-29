// ***** Display and input section

// ***** Maybe a slider later? Start with input boxes.
// ***** Refactor into different modules

// ***** Add dynamic input for background position on radial gradients

const hexInput = document.querySelector(".hex-value");
const redInput = document.querySelector(".red");
const blueInput = document.querySelector(".blue");
const greenInput = document.querySelector(".green");
const opacityInput = document.querySelector(".opacity-number");
const degreeInput = document.querySelector(".degrees");
const percentInput = document.querySelector(".percentage-input");
const percentFromInput = document.querySelector(".percentage-from-input");
const colorDisplay = document.querySelector(".selection-display");
const gradientType = document.querySelector("#gradients");
const gradientPosition = document.getElementsByName("position");
const linearOptions = document.querySelector(".linear-options");
const radialOptions = document.querySelector(".radial-options");
const conicOptions = document.querySelector(".conic-options");
const radialShapes = document.getElementsByName("shape");
const keywordPosition = document.querySelector(".keyword-position");
const radialPercentageOne = document.querySelector("#percentage-one");
const radialPercentageTwo = document.querySelector("#percentage-two");
const unitsOne = document.querySelector("#units-one");
const lengthOne = unitsOne.previousElementSibling;
const unitsTwo = document.querySelector("#units-two");
const lengthTwo = unitsTwo.previousElementSibling;
const size = document.querySelector(".size");
const codeDisplay = document.querySelector(".code-display");
const copyCodeButton = document.querySelector(".code-copy-button");
const percentageFromDisplay = document.querySelector(
  ".percentage-from-display"
);
const percentageToText = document.querySelector(".percentage-to-text");
const conicInputType = document.querySelectorAll("[name=conic-type]");
const conicFromValue = document.querySelector("#conic-from-value");
const conicPercentInputOne = document.querySelector("#conic-at-percentage-one");
const conicPercentInputTwo = document.querySelector("#conic-at-percentage-two");
const measurementIcons = document.querySelectorAll(".input-icon");

let red = 177;
let green = 13;
let blue = 255;
let opacity = 0.82;

redInput.addEventListener("change", (e) => handleColorChange(e));
blueInput.addEventListener("change", (e) => handleColorChange(e));
greenInput.addEventListener("change", (e) => handleColorChange(e));
opacityInput.addEventListener("change", (e) => handleColorChange(e));
percentInput.addEventListener("change", (e) => handleColorChange(e));
percentFromInput.addEventListener("change", (e) => handleColorChange(e));
hexInput.addEventListener("change", (e) =>
  handleHexChange(e.target.value.slice(1))
);

redInput.addEventListener("keyup", (e) => handleColorChange(e));
blueInput.addEventListener("keyup", (e) => handleColorChange(e));
greenInput.addEventListener("keyup", (e) => handleColorChange(e));
opacityInput.addEventListener("keyup", (e) => handleColorChange(e));
percentInput.addEventListener("keyup", (e) => handleColorChange(e));
percentFromInput.addEventListener("keyup", (e) => handleColorChange(e));

redInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
blueInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
greenInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
opacityInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
degreeInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
percentInput.addEventListener("blur", (e) => handleEmptyDeselection(e));
percentFromInput.addEventListener("blur", (e) => handleEmptyDeselection(e));

degreeInput.addEventListener("change", (e) => updateColorDisplay());
degreeInput.addEventListener("keyup", (e) => updateColorDisplay());

conicOptions.addEventListener("change", (e) => updateColorDisplay(e));
conicInputType.forEach((input) =>
  input.addEventListener("change", (e) => {
    measurementIcons.forEach((icon) => (icon.innerText = e.target.value));
  })
);

gradientType.addEventListener("change", (e) => {
  const conicDisplayElements = document.querySelectorAll(
    ".conic-display-element"
  );
  const percentageDisplayElements =
    document.querySelectorAll(".percent-display");
  if (e.target.value === "conic") {
    let conicFrom;
    if (conicInputType[0].checked) {
      // from degrees
      conicFrom = "deg";
    } else if (conicInputType[1].checked) {
      // from turns
      conicFrom = "turn";
    } else {
      conicFrom = "rad";
    }

    percentageFromDisplay.classList.remove("hide-display");
    percentageToText.classList.remove("hide-display");
    conicDisplayElements.forEach((conicElement) => {
      conicElement.classList.remove("hide-display");
    });
    percentageDisplayElements.forEach((percentageElement) => {
      percentageElement.classList.add("hide-display");
    });
    measurementIcons.forEach((icon) => (icon.innerText = conicFrom));
  } else {
    percentageFromDisplay.classList.add("hide-display");
    percentageToText.classList.add("hide-display");
    conicDisplayElements.forEach((conicElement) => {
      conicElement.classList.add("hide-display");
    });
    percentageDisplayElements.forEach((percentageElement) => {
      percentageElement.classList.remove("hide-display");
    });
    measurementIcons.forEach((icon) => (icon.innerText = "%"));
  }
  updateColorDisplay();
});

copyCodeButton.addEventListener("click", (e) => addToClipboard(e));

for (let option of radialShapes) {
  option.addEventListener("change", () => updateColorDisplay());
}

radialOptions.addEventListener("change", () => updateColorDisplay());

function handleColorChange(e) {
  // ***** Handling number checking in a couple different spots, clean up a little?
  // * Could add check to change e to 0 if entered in input
  // change input that's too high to max value
  if (
    e.target.value > 255 &&
    e.target.name !== "percentage-input" &&
    e.target.name !== "percentage-from-input"
  )
    e.target.value = 255;
  // If input is below zero change input to 0
  // Checking for non number match and below 0 only.
  // Checking for empty string here provides bad UI experience, as it immediately changes a cleared input field to 0 before new info can be input.
  if (e.target.value < 0 || e.target.value.match(/[^0-9.]/)) e.target.value = 0;

  // check if changing input is for color, percentage, or opacity
  if (e.target.name === "red") {
    red = e.target.value;
  } else if (e.target.name === "blue") {
    blue = e.target.value;
  } else if (e.target.name === "green") {
    green = e.target.value;
  } else if (
    e.target.name === "percentage-input" ||
    e.target.name === "percentage-from-input"
  ) {
    if (gradientType.value === "conic") {
      // When Percentage To property changes, also change element data and percentage value for linear and radial options
      if (e.target.className === "percentage-input") {
        // change Percent To
        const innerText = colorList.currentColor.childNodes[1].innerText;
        const newText = (innerText.split("\n")[0] += `\nTo: ${e.target.value}`);
        colorList.currentColor.childNodes[1].innerText = newText;
        colorList.currentColor.childNodes[2].innerText = ` ${e.target.value}`;
        colorList.currentColor.dataset.percent = e.target.value;
      } else {
        // change Percent From
        const innerText = colorList.currentColor.childNodes[1].innerText;
        const newText = `From: ${e.target.value}\n` + innerText.split("\n")[1];
        colorList.currentColor.childNodes[1].innerText = newText;
        colorList.currentColor.dataset.percentFrom = e.target.value;
      }
    } else {
      // If changing percentage on radial and linear options, update To percentage for conic options
      colorList.currentColor.dataset.percent = e.target.value;
      colorList.currentColor.childNodes[2].innerHTML = `${e.target.value}%`;
      const innerText = colorList.currentColor.childNodes[1].innerHTML;
      const newText = (innerText.split("<br>")[0] += `\nTo: ${e.target.value}`);
      colorList.currentColor.childNodes[1].innerText = newText;
    }
  } else {
    if (e.target.value > 1) e.target.value = 1;
    opacity = e.target.value;
  }

  // turn color inputs into their respective hex value
  const hexValArr = [
    parseInt(red).toString(16),
    parseInt(green).toString(16),
    parseInt(blue).toString(16),
  ];

  // Check for empty input, if so change to 00
  // Empty input comes when input is cleared but still focused (still being changed).
  // Pad start on single digit inputs. Join array into hex value
  for (let i = 0; i < hexValArr.length; i++) {
    if (hexValArr[i] === "NaN") hexValArr[i] = "00";
    hexValArr[i] = hexValArr[i].padStart(2, "0");
  }
  hexInput.value = `#${hexValArr.join("").toUpperCase()}`;

  // Set selected color swatch to current color, update displayed hex
  colorList.currentColor.children[0].jscolor.fromRGBA(
    red,
    green,
    blue,
    opacity
  );
  colorList.currentColor.setAttribute("data-opacity", `${opacity}`);
  colorList.currentColor.getElementsByTagName("input")[0].value = `#${hexValArr
    .join("")
    .toUpperCase()}`;

  sortColorList();
  updateColorDisplay();
}

function handleHexChange(value) {
  // Change any non hex values to 0
  value = value.replace(/[^0-9a-fA-F]/gm, "0");

  // Change input  to correct length
  if (value.length < 6) {
    value = value.padStart(6, "0");
  }

  // find individual color values from hex, change inputs
  let numArr = value.split(/(.{2})/gm).filter((val) => !!val === true);
  let numValArr = numArr.map((num) => parseInt(num, 16));

  opacity = opacityInput.value;
  red = redInput.value = numValArr[0];
  green = greenInput.value = numValArr[1];
  blue = blueInput.value = numValArr[2];
  colorList.currentColor.children[0].jscolor.fromRGBA(
    red,
    green,
    blue,
    opacity
  );
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

  // Can maybe handle this better. Only need to use this for conic gradients, currently running every time. Need to use variable in current level of scope in function later.
  let conicFrom;
  if (conicInputType[0].checked) {
    // from degrees
    conicFrom = "deg";
  } else if (conicInputType[1].checked) {
    // from turns
    conicFrom = "turn";
  } else {
    conicFrom = "rad";
  }

  if (type === "radial") {
    linearOptions.style.display = "none";
    conicOptions.style.display = "none";
    radialOptions.style.display = "";

    // Check currently selected position style and shape
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

    // format position output
    if (positionStyle === "keyword") {
      position = `at ${keywordPosition.value}`;
    } else if (positionStyle === "percentage-position") {
      position = `at ${radialPercentageOne.value}% ${radialPercentageTwo.value}%`;
    } else if (positionStyle === "length") {
      let [length, height] = [lengthOne.value, lengthTwo.value];

      // Correct vh units for height of display, not height of viewport
      // ***** weird positioning results with vmax
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
  } else if (type === "conic") {
    radialOptions.style.display = "none";
    linearOptions.style.display = "none";
    conicOptions.style.display = "";

    type += `-gradient(from ${conicFromValue.value + conicFrom} at ${
      conicPercentInputOne.value
    }% ${conicPercentInputTwo.value}%, `;
  } else {
    radialOptions.style.display = "none";
    conicOptions.style.display = "none";
    linearOptions.style.display = "";
    type += `-gradient( ${degreeInput.value}deg, `;
  }

  // Do we need to sort colors here? Can we re use color sort function?
  const colors = [...document.getElementsByClassName("color")];
  colors.sort((a, b) => a.dataset.percent - b.dataset.percent);

  const gradientList = colors.map((color) => {
    let rgb = color.children[0].dataset.currentColor;
    // check for rgb instead of rgba. Is this necessary? Should be able to remove alpha denotation
    if (rgb[3] !== "a") {
      rgb =
        rgb.slice(0, 3) +
        "a" +
        rgb.slice(3, rgb.length - 1) +
        `, ${color.dataset.opacity}` +
        rgb.slice(rgb.length - 1);
    }

    // if conic add that, otherwise continue
    if (gradientType.value === "conic") {
      rgb += ` ${color.dataset.percentFrom}${conicFrom} ${color.dataset.percent}${conicFrom}`;
    } else {
      rgb += ` ${color.dataset.percent}%`;
    }
    return rgb;
  });

  // Sets display to last remaining color if all others removed. Otherwise previously removed color will remain
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

function updateIndividualColorSelectors(picker) {
  redInput.value = red = Math.round(picker.channels.r);
  greenInput.value = green = Math.round(picker.channels.g);
  blueInput.value = blue = Math.round(picker.channels.b);
  opacityInput.value = opacity = picker.channels.a.toFixed(2);
  hexInput.value = picker.toHEXString();
  colorList.currentColor.getElementsByTagName("input")[0].value =
    picker.toHEXString();
  colorList.currentColor.dataset.opacity = picker.channels.a;

  updateColorDisplay();
}
