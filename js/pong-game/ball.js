import { getCanvasContent } from "../menu/select-menu.js"

const INITIAL_SPEED = .2
const SPEED_BALL_INCREASE = .00001

const canvas = getCanvasContent().canvas
const ctx = getCanvasContent().ctx

export default class Ball {
    constructor () {
        this.reset()
    }

    reset () {
        console.log("in reset ball\n x:",this.x , " y:",this.y)
        this.x =  canvas.width /2
        this.y = canvas.height /2
        this.radius = 7
        this.direction =  this.direction = {x: 0}
        while (Math.abs(this.direction.x) <= 0.2 || Math.abs(this.direction.x) >= 0.9) {
        const heading =randomNumberBetween(0, 2 * Math.PI)
        this.direction = {x: Math.cos(heading), y: Math.sin(heading)}
        }
        this.speed = INITIAL_SPEED
    }

    draw () {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "yellow"
        ctx.fill()
        ctx.closePath()
    }

    update (delta, Paddles) {
        console.log("in update ball\n x:",this.x , " y:",this.y, this.speed, this.direction.x)
        this.x += this.direction.x * this.speed * delta
        this.y += this.direction.y * this.speed * delta
        this.speed += SPEED_BALL_INCREASE * delta
        
        //check wall collision
        if (this.y + this.radius >= canvas.height || this.y - this.radius <= 0) {
            this.direction.y *= -1
        }
        
        //check paddle collision
        if (Paddles.some((r => isCollision(r, this))))
            this.direction.x *= -1
        
        this.draw()
        //console.log(canvas.width)
        //console.log("x:",this.x , " y:",this.y)
        //console.log("ball drawn")
    }
}

function randomNumberBetween(min, max) {
	return Math.random() * (max - min) + min
}

function isCollision(paddle, ball) {
	return (
		ball.x + ball.radius >= paddle.x &&
		ball.x - ball.radius <= paddle.x + paddle.width &&
		ball.y + ball.radius >= paddle.y &&
		ball.y - ball.radius <= paddle.y + paddle.height
	)
}