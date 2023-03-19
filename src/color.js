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
  }) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
    this.hex = hex;
    this.percent = percent;
    this.selectColor = selectColor;
    this.removeColor = removeColor;
  }

  render() {
    const newItem = document.createElement("li");
    newItem.classList.add("color");
    newItem.setAttribute("data-opacity", this.opacity);
    newItem.setAttribute("data-percent", this.percent);

    const colorSwatch = document.createElement("button");
    colorSwatch.dataset.jscolor = `{preset:'dark', width:250, paletteCols:15, value:'rgba(${this.red} ,${this.green},${this.blue},${this.opactity})'}`;

    const span = document.createElement("span");
    span.classList.add("color-sample");
    span.style.backgroundColor = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity}) `;

    const info = document.createElement("span");
    info.innerText = ` ${this.percent}%`;

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

    button.addEventListener("click", (e) => this.removeColor(e));

    newItem.appendChild(span);
    newItem.appendChild(info);
    newItem.appendChild(input);
    newItem.appendChild(button);
    newItem.appendChild(colorSwatch);
    newItem.addEventListener("click", (e) => this.selectColor(e));
    return newItem;
  }
}
