class Color {
  constructor(
    {
      red,
      green,
      blue,
      opacity,
      hex,
      percent,
      percentFrom,
      selectColor,
      removeColor,
      id,
    },
    isConic
  ) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
    this.hex = hex;
    this.percent = percent;
    this.selectColor = selectColor;
    this.removeColor = removeColor;
    this.percentFrom = percentFrom;
    this.id = id;
    this.isConic = isConic;
  }

  render() {
    const newItem = document.createElement("li");
    newItem.classList.add("color");
    newItem.setAttribute("data-opacity", this.opacity);
    newItem.setAttribute("data-percent-from", this.percentFrom);
    newItem.setAttribute("data-percent", this.percent);
    newItem.setAttribute("data-hex-value", this.hex);

    const colorSwatch = document.createElement("button");
    colorSwatch.classList.add("color-sample");

    colorSwatch.dataset.jscolor = `{preset:'dark', width:250, value:'rgba(${this.red},${this.green},${this.blue},${this.opacity})', onChange: 'updateIndividualColorSelectors(this)', onInput: 'updateIndividualColorSelectors(this)'}`;
    colorSwatch.dataset.currentColor = `rgba(${this.red},${this.green},${this.blue},${this.opacity})`;

    const fullPercentDisplay = document.createElement("span");
    fullPercentDisplay.classList.add("conic-display-element");
    fullPercentDisplay.innerText = `From: ${this.percentFrom} \nTo: ${this.percent}`;

    const percentDisplay = document.createElement("span");
    percentDisplay.classList.add("percent-display");
    percentDisplay.innerText = ` ${this.percent}%`;

    if (this.isConic) {
      percentDisplay.classList.add("hide-display");
    } else {
      fullPercentDisplay.classList.add("hide-display");
    }

    const button = document.createElement("button");
    button.classList.add("delete-color-button");
    button.innerText = "X";
    button.addEventListener("click", (e) => this.removeColor(e, this));

    newItem.appendChild(colorSwatch);
    newItem.appendChild(fullPercentDisplay);
    newItem.appendChild(percentDisplay);
    newItem.appendChild(button);
    newItem.addEventListener("click", (e) => this.selectColor(e));
    return newItem;
  }
}
