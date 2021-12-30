// ***** Display and input section

const colorDisplay = document.querySelector(".color-display")

const hexInput = document.querySelector(".hex-value")
const redInput = document.querySelector(".red")
const blueInput = document.querySelector(".blue")
const greenInput = document.querySelector(".green")
const opacityInput = document.querySelector(".opacity-number")
const gradientList = document.querySelector(".gradient-list")
let red = 0
let green = 255
let blue = 0
let opacity = 1

redInput.addEventListener("change", e => handleColorChange(e))
blueInput.addEventListener("change", e => handleColorChange(e))
greenInput.addEventListener("change", e => handleColorChange(e))
opacityInput.addEventListener("change", e => handleColorChange(e))
hexInput.addEventListener("change", e => handleHexChange(e))
gradientList.addEventListener("change", e => handleGradientChange(e))

redInput.addEventListener("keyup", e => handleColorChange(e))
blueInput.addEventListener("keyup", e => handleColorChange(e))
greenInput.addEventListener("keyup", e => handleColorChange(e))
opacityInput.addEventListener("keyup", e => handleColorChange(e))

redInput.addEventListener("blur", e => handleEmptyDeselection(e))
blueInput.addEventListener("blur", e => handleEmptyDeselection(e))
greenInput.addEventListener("blur", e => handleEmptyDeselection(e))
opacityInput.addEventListener("blur", e => handleEmptyDeselection(e))

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

    const hexValArr = [parseInt(red).toString(16), parseInt(green).toString(16), parseInt(blue).toString(16)]
    for(let i = 0; i < hexValArr.length; i++){
        if(hexValArr[i] === "NaN") hexValArr[i] = "00"
        hexValArr[i] = hexValArr[i].padStart(2, "0")
    }
    hexInput.value = hexValArr.join("")

    colorDisplay.style.background = `linear-gradient(0deg, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${red}, ${green}, ${blue}, ${opacity}))`
}

function handleHexChange(e) {
    let numValArr
    if(!!e.target.value.match(/[^0-9a-fA-F]+/gm)){
        numValArr = [0, 0, 0]
        hexInput.value = "000000"
    } else{
        if(e.target.value.length < 6) {
            e.target.value = e.target.value.padStart(6, "0")
        }
        let numArr = e.target.value.split(/(.{2})/gm).filter(val => !!val === true)
        numValArr = numArr.map(num => parseInt(num, 16))
    }
    red = redInput.value = numValArr[0]
    green = greenInput.value = numValArr[1]
    blue = blueInput.value = numValArr[2]

    colorDisplay.style.background = `linear-gradient(0deg, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${red}, ${green}, ${blue}, ${opacity}))`
}

function handleEmptyDeselection(e){
    if(!e.target.value) {
        e.target.value = "0"
        handleColorChange(e)
    }
}

function handleGradientChange(e){
    console.log(e.target.value)
    debugger
    colorDisplay.style.background = `${e.target.value}-gradient(0deg, rgba(${red}, ${green}, ${blue}, ${opacity}), rgba(${red}, ${green}, ${blue}, ${opacity}))`
}

// ***** List section

const colorList = document.getElementsByClassName("color")
for(let i = 0; i < colorList.length; i++){
    colorList[i].addEventListener("click", e => handleColorSelection(e))
}
let currentColor = colorList[0]

function handleColorSelection(e){
    currentColor.classList.remove("selected-color")
    currentColor = e.target
    e.target.classList.add("selected-color")

    
}