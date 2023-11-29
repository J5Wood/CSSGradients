class ColorList {
  constructor() {
    this.list = document.querySelector(".color-list");
    this.addColorButton = document.querySelector(".add-color-button");
    this.addColorButton.addEventListener("click", this.addNewColor.bind(this));
    this.uuid = 0;
    this.colors = {};
    this.addInitialColors();
    this.currentColor = document.getElementsByClassName("color")[0];
    this.currentColor.classList.add("selected-color");
  }

  incrementId() {
    this.uuid += 1;
  }

  handleColorSelection(e) {
    this.currentColor.classList.remove("selected-color");
    if (e.target.className === "color") {
      this.currentColor = e.target;
    } else {
      this.currentColor = e.target.parentElement;
    }
    this.currentColor.classList.add("selected-color");
    let hexColor = this.currentColor.children[3].value.slice(1);
    hexInput.value = hexColor;
    opacityInput.value = this.currentColor.dataset.opacity;
    percentFromInput.value = this.currentColor.dataset.percentFrom;
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
      percentFrom: percentFromInput.value,
      selectColor: this.handleColorSelection.bind(this),
      removeColor: this.removeColor.bind(this),
      id: this.uuid,
    };
    this.incrementId();
    let isConic = gradientType.value === "conic" ? true : false;
    const newColor = new Color(colorObj, isConic);
    this.colors[newColor.id] = newColor;
    this.list.insertBefore(newColor.render(), this.list.lastElementChild);
    jscolor.install();
    this.sortList();
    updateColorDisplay();
  }

  sortList() {
    const colorListChildren = [...this.list.children];
    colorListChildren.sort((a, b) => a.dataset.percent - b.dataset.percent);
    colorListChildren.forEach((node) => this.list.appendChild(node));
  }

  removeColor(e, node) {
    delete this.colors[node.id];
    e.target.parentElement.remove();
    e.stopPropagation();
    updateColorDisplay();
  }

  addInitialColors() {
    this.addNewColor();

    redInput.value = 13;
    greenInput.value = 255;
    blueInput.value = 201;
    hexInput.value = "#0DFFC9";
    percentFromInput.value = "10";
    percentInput.value = "20";
    opacityInput.value = 0.8;
    this.addNewColor();

    redInput.value = 0;
    greenInput.value = 10;
    blueInput.value = 248;
    hexInput.value = "#000AF8";
    percentFromInput.value = "30";
    percentInput.value = "60";
    opacityInput.value = 0.81;
    this.addNewColor();

    redInput.value = 62;
    greenInput.value = 0;
    blueInput.value = 47;
    hexInput.value = "3E002F";
    percentFromInput.value = "99";
    percentInput.value = "100";
    opacityInput.value = 1;
    this.addNewColor();

    redInput.value = 177;
    greenInput.value = 13;
    blueInput.value = 255;
    hexInput.value = "#B10DFF";
    percentFromInput.value = "0";
    percentInput.value = "0";
    opacityInput.value = 0.82;
    updateColorDisplay();
  }
}
