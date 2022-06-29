class ColorList {
  constructor() {
    this.list = document.querySelector(".color-list");
    this.addColorButton = document.querySelector(".add-color-button");
    this.addColorButton.addEventListener("click", this.addNewColor.bind(this));
    this.addInitialColors();
    this.currentColor = document.getElementsByClassName("color")[0];
    this.currentColor.classList.add("selected-color");
  }

  handleColorSelection(e) {
    this.currentColor.classList.remove("selected-color");
    if (e.target.className === "color") {
      this.currentColor = e.target;
    } else {
      this.currentColor = e.target.parentElement;
    }
    this.currentColor.classList.add("selected-color");
    let hexColor = this.currentColor.children[2].value.slice(1);
    hexInput.value = hexColor;
    opacityInput.value = this.currentColor.dataset.opacity;
    percentInput.value = this.currentColor.dataset.percent;
    handleHexChange(hexColor);
  }

  addNewColor() {
    const colorObj = {
      red: redInput.value,
      green: greenInput.value,
      blue: blueInput.value,
      opacity: opacityInput.value,
      hex: hexInput.value,
      percent: percentInput.value,
      selectColor: this.handleColorSelection.bind(this),
      removeColor: this.removeColor.bind(this),
    };
    const newColor = new Color(colorObj);
    this.list.insertBefore(newColor.render(), this.list.lastElementChild);
    updateColorDisplay();
  }

  removeColor(e) {
    e.target.parentElement.remove();
    e.stopPropagation();
    updateColorDisplay();
  }

  addInitialColors() {
    this.addNewColor();
    redInput.value = 255;
    blueInput.value = 255;
    greenInput.value = 255;
    hexInput.value = "#ffffff";
    percentInput.value = "100";
    updateColorDisplay();
    this.addNewColor();
    redInput.value = 0;
    greenInput.value = 45;
    blueInput.value = 45;
    hexInput.value = "#002d2d";
    percentInput.value = "0";
    updateColorDisplay();
  }
}
