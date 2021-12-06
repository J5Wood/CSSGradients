const colorDisplay = document.querySelector(".color-display")

const hexInput = document.querySelector(".hex-value")
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
hexInput.addEventListener("change", e => handleHexChange(e))

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

    // ***** Can move changing hex to deselction on color inputs, would be smoother
    const hexValArr = [parseInt(red).toString(16), parseInt(green).toString(16), parseInt(blue).toString(16)]
    for(let i = 0; i < hexValArr.length; i++){
        hexValArr[i] = hexValArr[i].padStart(2, "0")
    }
    hexInput.value = hexValArr.join("")

    colorDisplay.style.background = `linear-gradient(0deg, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${red}, ${green}, ${blue}, ${opacity}))`
}

function handleHexChange(e) {
    // ***** if input has illegal inputs, set to all 0s

    
    let numArr = e.target.value.split(/(.{2})/gm).filter(val => !!val === true)
    let numValArr = numArr.map(num => parseInt(num, 16))

    red = redInput.value = numValArr[0]
    green = greenInput.value = numValArr[1]
    blue = blueInput.value = numValArr[2]

    colorDisplay.style.background = `linear-gradient(0deg, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${red}, ${green}, ${blue}, ${opacity}))`
}



// ***** Make input boxes return to 0 when box is left empty, 
// ***** but don't assign to 0 whenbox is just cleared and cursor still in box (on backspaces)

// redInput.addEventListener("deselect", e => handleDeselection(e))
// blueInput.addEventListener("deselect", e => handleDeselection(e))
// greenInput.addEventListener("deselect", e => handleDeselection(e))
// opacityInput.addEventListener("deselect", e => handleDeselection(e))

// function handleDeselection(e) {
//     console.log(e.target)
// }