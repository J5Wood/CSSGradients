class Color {
  constructor({ red, green, blue, opacity, hex }) {
    this.red = red;
    this.green = green;
    this.blue = blue;
    this.opacity = opacity;
    this.hex = hex;
  }

  render() {
    const newItem = document.createElement("li");
    newItem.classList.add("color");
    newItem.setAttribute("data-opacity", this.opacity);

    const span = document.createElement("span");
    span.classList.add("color-sample");
    span.style.backgroundColor = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;

    const h3 = document.createElement("h3");
    h3.innerText = "Color Sample 1";

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

    button.addEventListener("click", (e) => removeColor(e));

    newItem.appendChild(span);
    newItem.appendChild(h3);
    newItem.appendChild(input);
    newItem.appendChild(button);

    newItem.addEventListener("click", (e) => handleColorSelection(e));
    return newItem;
  }
}
