const colorDisplay = document.querySelector(".color-display")

const redInput = document.querySelector(".red")
const blueInput = document.querySelector(".blue")
const greenInput = document.querySelector(".green")
const opacityInput = document.querySelector(".opacity-number")

let red = 0
let green = 255
let blue = 0
let opacity = 1

redInput.addEventListener("keyup", e => handleColorChange(e))
blueInput.addEventListener("keyup", e => handleColorChange(e))
greenInput.addEventListener("keyup", e => handleColorChange(e))
opacityInput.addEventListener("keyup", e => handleColorChange(e))

// redInput.addEventListener("deselect", e => handleDeselection(e))
// blueInput.addEventListener("deselect", e => handleDeselection(e))
// greenInput.addEventListener("deselect", e => handleDeselection(e))
// opacityInput.addEventListener("deselect", e => handleDeselection(e))

function handleColorChange(e) {
    if(e.target.value > 255) e.target.value = 255
    if(e.target.value < 0) e.target.value = 0
    if(e.target.name === "red"){
        red = e.target.value
    } else if(e.target.name === "blue"){
        blue = e.target.value
    } else if(e.target.name === "green"){
        green = e.target.value
    } else {
        opacity = e.target.value
    }
    colorDisplay.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, ${opacity})`
}

// function handleDeselection(e) {
//     console.log(e.target)
// }