import { playBlock } from "../block-game/block-game.js"
import { playPong } from "../pong-game/pong.js"

export function getCanvasContent () {
    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")
    const backToMenu = document.getElementById("back-to-menu")
    return {ctx : ctx, canvas : canvas, backToMenu : backToMenu}
}

const canvas = getCanvasContent().canvas
const ctx = getCanvasContent().ctx

let menuOn = true
let blockGameON = false

export function getVariableValue () {
    return blockGameON
}

export function setBlockGameOff () {
    blockGameON = false;
}
export function setMenuOn () {
    menuOn = true
}

//CUBE IMG
const cubeImg = new Image()
cubeImg.src = "img-canvas/cube.png"
cubeImg.width = 250
cubeImg.height = 250
let cubeImgX = ((canvas.width / 2 - cubeImg.width) /2)
let cubeImgY = (canvas.height - cubeImg.width) / 2
let hoverCube = false

//PONG IMG
const pongImg = new Image()
pongImg.src = "img-canvas/pong.jpg"
pongImg.width = 250
pongImg.height = 250
let pongImgX = ((canvas.width  / 2 - pongImg.width) / 2 + canvas.width / 2)
let pongImgY = (canvas.height - pongImg.width) / 2
let hoverPong = false

function drawCube () {
    if (hoverCube) {
        cubeImg.width = 300
        cubeImg.height = 300 
        cubeImgX = ((canvas.width / 2 - cubeImg.width) /2)
        cubeImgY = (canvas.height - cubeImg.width) / 2
    } else {
        cubeImg.width = 250
        cubeImg.height = 250
        cubeImgX = ((canvas.width / 2 - cubeImg.width) /2)
        cubeImgY = (canvas.height - cubeImg.width) / 2
    }
    ctx.drawImage(cubeImg, cubeImgX, cubeImgY, cubeImg.width, cubeImg.height)
}

function drawPong () {
    if (hoverPong) {
        pongImg.width = 300
        pongImg.height = 300 
        pongImgX = ((canvas.width  / 2 - pongImg.width) / 2 + canvas.width / 2)
        pongImgY = (canvas.height - pongImg.width) / 2
    } else {
        pongImg.width = 250
        pongImg.height = 250
        pongImgX = ((canvas.width  / 2 - pongImg.width) / 2 + canvas.width / 2)
        pongImgY = (canvas.height - pongImg.width) / 2
    }
    ctx.drawImage(pongImg, pongImgX, pongImgY, pongImg.width, pongImg.height)
}

export function drawMenu() {
    ctx.clearRect( 0,0, canvas.width, canvas.height)
    drawCube()
    drawPong()
}

function isMouseOverImg(mouseX, mouseY, imgX, imgY, imgW, imgH) {
    return (
        mouseX > imgX && mouseX < imgX + imgW &&
        mouseY > imgY && mouseY < imgY + imgH
    )
}

canvas.addEventListener('mousemove', (e) => {
    const mouseX = e.offsetX
    const mouseY = e.offsetY

    hoverCube = isMouseOverImg(mouseX, mouseY, cubeImgX, cubeImgY, cubeImg.width, cubeImg.height)
    hoverPong = isMouseOverImg(mouseX, mouseY, pongImgX, pongImgY, pongImg.width, pongImg.height)
    
    if (menuOn)
    drawMenu()
})

canvas.addEventListener('mousedown', (e) => {
    const mouseX = e.offsetX
    const mouseY = e.offsetY
    
    hoverCube = isMouseOverImg(mouseX, mouseY, cubeImgX, cubeImgY, cubeImg.width, cubeImg.height)
    hoverPong = isMouseOverImg(mouseX, mouseY, pongImgX, pongImgY, pongImg.width, pongImg.height)

    if (hoverCube){
        menuOn = false
        ctx.clearRect( 0,0, canvas.width, canvas.height)
        blockGameON = true
        playBlock()
    } else if (hoverPong) {
        menuOn = false
        ctx.clearRect( 0,0, canvas.width, canvas.height)
        playPong()
    }

})

cubeImg.onload = function () {
    if (menuOn)
        drawCube()
}

pongImg.onload = function () {
    if (menuOn)
        drawPong()
}

