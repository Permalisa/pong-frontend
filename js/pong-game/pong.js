import Ball from "./ball.js"
import Paddle from "./paddle.js"
import { getCanvasContent, setMenu, drawMenu, getPongGameValue, setPongGameOff} from "../menu/select-menu.js"

const canvas = getCanvasContent().canvas
const ctx = getCanvasContent().ctx
const backToMenu = getCanvasContent().backToMenu

let ball = new Ball()
let paddle1 = new Paddle(1)
let paddle2 = new Paddle(2)

let lastTime, score1, score2
let opponent = false
let animationId = null

function start() {
    score1 = 0  
    score2 = 0
    reset()
    ball.draw()
    paddle1.draw()
    paddle2.draw()
    drawScore()
}

function reset () {
    ball.reset()
    paddle1.reset()
    paddle2.reset()
}

function update (time) {
    animationId = requestAnimationFrame(update)
    ctx.clearRect(0,0, canvas.width, canvas.height)
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [paddle1, paddle2])
        paddle1.update(false)
        if (opponent)
            paddle2.update(true)
        else
            paddle2.update_computer(delta, ball)
        drawScore()
        if (isLose()) handleLose()        
    }
    lastTime = time
}

function isLose () {
    return ball.x + ball.radius >= canvas.width || ball.x - ball.radius <= 0
}

function handleLose () {
    if (ball.x + ball.radius >= canvas.width)
        score1++
    else if (ball.x - ball.radius <= 0)
        score2++

    cancelAnimationFrame(animationId)
    reset()
    requestAnimationFrame(update)
}

function drawScore() {
    ctx.font = "30px Arial"
    ctx.fillStyle = "white"
    ctx.textAlign = "center"
    ctx.fillText(score1, canvas.width / 4, 50)
    ctx.fillText(score2, canvas.width * 3 / 4, 50)
}

backToMenu.addEventListener("click", function () {
    if (getPongGameValue()){

        backToMenu.style.display = "none"
        cancelAnimationFrame(animationId)
        animationId = null;
        ctx.clearRect(0,0, canvas.width, canvas.height)

        console.log("pong")
        console.log(getPongGameValue())

        setPongGameOff()
        setMenu(true)
        drawMenu()
    }
})

// //Event
// addEventListener("keydown", e => {
// 	if (e.code == "Space" || e.key == "32" || e.key == " " ) {
//         if(animationId == null && getPongGameValue()) {
//         }
// 	}
// })

export function playPong() {
    backToMenu.style.display = "block"
    setMenu(false)
    start()
    animationId = requestAnimationFrame(update)
    
}

//update()