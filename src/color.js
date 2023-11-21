class Color {
  constructor({
    red,
    green,
    blue,
    opacity,
    hex,
    percent,
    selectColor,
    removeColor,
    percentFrom,
    id,
  }) {
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
  }

  // renderPercentages() {

  //   if(this.percentFrom || this.percentTo) {
  //     const percentElement = document.createElement("span");
  //   }
  // }

  render() {
    const newItem = document.createElement("li");
    newItem.classList.add("color");
    newItem.setAttribute("data-opacity", this.opacity);
    newItem.setAttribute("data-percent", this.percent);

    const colorSwatch = document.createElement("button");
    colorSwatch.classList.add("color-sample");

    colorSwatch.dataset.jscolor = `{preset:'dark', width:250, value:'rgba(${this.red},${this.green},${this.blue},${this.opacity})', onChange: 'updateIndividualColorSelectors(this)', onInput: 'updateIndividualColorSelectors(this)'}`;
    colorSwatch.dataset.currentColor = `rgba(${this.red},${this.green},${this.blue},${this.opacity})`;

    const fullPercentDisplay = document.createElement("span");
    fullPercentDisplay;
    fullPercentDisplay.innerText = `From: ${this.percentFrom}\nTo: ${this.percent}%`;

    const percentDisplay = document.createElement("span");
    percentDisplay.innerText = ` ${this.percent}%`;

    const input = document.createElement("input");
    input.setAttribute("name", "color-input");
    input.setAttribute("type", "text");
    input.setAttribute("value", this.hex);
    input.setAttribute("maxLength", "7");
    input.addEventListener("change", (e) => {
      return handleHexChange(e.target.value.slice(1));
    });

    const button = document.createElement("button");
    button.classList.add("delete-color-button");
    button.innerText = "X";
    button.addEventListener("click", (e) => this.removeColor(e, this));

    newItem.appendChild(colorSwatch);
    newItem.appendChild(percentDisplay);
    newItem.appendChild(input);
    newItem.appendChild(button);
    newItem.addEventListener("click", (e) => this.selectColor(e));
    return newItem;
  }
}
