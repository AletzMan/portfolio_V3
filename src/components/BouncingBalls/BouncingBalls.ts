const NAME_LOGOS = [
	"html",
	"css",
	"javascript",
	"sass",
	"pug",
	"git",
	"firebase",
	"typescript",
	"github",
	"mysql",
	"react",
	"next",
	"vite",
	"csharp",
	"npm",
	"netcore",
	"xamarin",
	"xaml",
	"c",
	"vscode",
	"vs",
]

let containerTags: HTMLDivElement[] = []

export class TagBubble {
	posX: number
	posY: number
	speedX: number
	speedY: number
	mass: number
	isColliding: boolean
	width: number
	height: number
	initPosMouseX: number
	initPosMouseY: number

	constructor(posX: number, posY: number, speedX: number, speedY: number, mass: number) {
		this.posX = posX
		this.posY = posY
		this.speedX = speedX
		this.speedY = speedY
		this.mass = mass
		this.isColliding = false
		this.width = 0
		this.height = 0
		this.initPosMouseX = 0
		this.initPosMouseY = 0
	}

	createItem(bubbleSection: HTMLElement, bodySection: HTMLElement, Size: number) {
		const newBubble = document.createElement("div")
		newBubble.style.backgroundImage =
			"url('/icons/" + NAME_LOGOS[GetRandomNumber(0, NAME_LOGOS.length - 1)] + "-logo.svg')"
		newBubble.className = "tag__move"
		newBubble.style.left = `${this.posX}px`
		newBubble.style.top = `${this.posY}px`
		containerTags.push(newBubble)
		bubbleSection?.appendChild(newBubble)

		newBubble.style.width = `${Size}px`
		newBubble.style.height = `${Size}px`

		this.width = Math.floor(newBubble.getBoundingClientRect().width)
		this.height = Math.floor(newBubble.getBoundingClientRect().height)

		this.initPosMouseX = 0
		this.initPosMouseY = 0

		newBubble.addEventListener("mousedown", (e) => {
			this.initPosMouseX = e.clientX
			this.initPosMouseY = e.clientY
		})

		let directionX = 0
		let directionY = 0

		bodySection.addEventListener("mouseup", (e) => {
			if (this.initPosMouseX != 0) {
				if (this.initPosMouseX - e.clientX > 0) {
					directionX = -10
				} else {
					directionX = +10
				}
				if (this.initPosMouseY - e.clientY > 0) {
					directionY = -10
				} else {
					directionY = +10
				}
				for (let index = 0; index < 20; index++) {
					setTimeout(() => {
						this.speedX += directionX
						this.speedY += directionY
					}, 50)
				}
				this.initPosMouseX = 0
				this.initPosMouseY = 0
			}
		})
	}

	updatePosition(timeElapsed: number) {
		this.posX += this.speedX * timeElapsed
		this.posY += this.speedY * timeElapsed
	}
}

let timeElapsed = 0
let oldTimeStamp = 0
let bubblesContainer: TagBubble[] = []

/*
const initAnimation = () => {
    setTimeout(() => {
        createBubbleTags(NUMBER_BUBBLE)
        window.requestAnimationFrame((timeStamp) => { animationLoop(timeStamp) })
    }, 200)
}
*/

export const createBubbleTags = (numberBubbles: number, section: HTMLElement, size: number) => {
	if (section) {
		for (let index = 0; index < numberBubbles; index++) {
			let positionTagX = GetRandomNumber(50, window.innerWidth - 50)
			let positionTagY = GetRandomNumber(100, section.getBoundingClientRect().height - 20)

			bubblesContainer.push(
				new TagBubble(
					positionTagX,
					positionTagY,
					GetRandomNumber(-20, 70),
					GetRandomNumber(-20, 70),
					GetRandomNumber(1, 10)
				)
			)
		}
		for (let i = 0; i < bubblesContainer.length; i++) {
			bubblesContainer[i].createItem(section, section, size)
			bubblesContainer[i].mass = bubblesContainer[i].width * 150
		}
	}
}

export const animationLoop = (timeStamp: number, section: HTMLBodyElement) => {
	timeElapsed = (timeStamp - oldTimeStamp) / 1000
	oldTimeStamp = timeStamp
	for (let i = 0; i < bubblesContainer.length; i++) {
		bubblesContainer[i].updatePosition(timeElapsed)
	}
	UpdatePosition()
	detectCollisions()
	borderCollisionDetection(section)
	window.requestAnimationFrame((timeStamp) => animationLoop(timeStamp, section))
}

export const UpdatePosition = () => {
	for (let index = 0; index < containerTags.length; index++) {
		containerTags[index].style.left = bubblesContainer[index].posX + "px"
		containerTags[index].style.top = bubblesContainer[index].posY + "px"
	}
}

export const detectCollisions = () => {
	let objectOne: TagBubble
	let objectTwo: TagBubble
	for (let i = 0; i < bubblesContainer.length; i++) {
		bubblesContainer[i].isColliding = false
	}

	for (let i = 0; i < bubblesContainer.length; i++) {
		objectOne = bubblesContainer[i]
		for (let j = i + 1; j < bubblesContainer.length; j++) {
			objectTwo = bubblesContainer[j]
			if (
				intersectionCircles(
					objectOne.posX,
					objectOne.posY,
					objectOne.width / 2,
					objectTwo.posX,
					objectTwo.posY,
					objectTwo.width / 2
				)
			) {
				objectOne.isColliding = true
				objectTwo.isColliding = true
				let collisionVector = {
					x: objectTwo.posX - objectOne.posX,
					y: objectTwo.posY - objectOne.posY,
				}
				let distance = Math.sqrt(
					(objectTwo.posX - objectOne.posX) * (objectTwo.posX - objectOne.posX) +
						(objectTwo.posY - objectOne.posY) * (objectTwo.posY - objectOne.posY)
				)
				let collisionVectorNorm = {
					x: collisionVector.x / distance,
					y: collisionVector.y / distance,
				}
				let relativeVelocityVector = {
					x: objectOne.speedX - objectTwo.speedX,
					y: objectOne.speedY - objectTwo.speedY,
				}
				let speed =
					relativeVelocityVector.x * collisionVectorNorm.x +
					relativeVelocityVector.y * collisionVectorNorm.y

				if (speed < 0) break
				let impulse = (2 * speed) / (objectOne.mass + objectTwo.mass)
				objectOne.speedX -= impulse * objectTwo.mass * collisionVectorNorm.x
				objectOne.speedY -= impulse * objectTwo.mass * collisionVectorNorm.y
				objectTwo.speedX += impulse * objectOne.mass * collisionVectorNorm.x
				objectTwo.speedY += impulse * objectOne.mass * collisionVectorNorm.y
			}
		}
	}
}

export const borderCollisionDetection = (BubbleSection: HTMLBodyElement) => {
	const COLLISION_LIMIT_X_LEFT = 1
	const COLLISION_LIMIT_X_RIGHT = BubbleSection!.getBoundingClientRect()?.width - 5
	const COLLISION_LIMIT_Y_TOP = 5
	const COLLISION_LIMIT_Y_BOTTOM = BubbleSection!.getBoundingClientRect()?.height - 5 || 0
	const SPEED_RESET = 0.95
	let bubble: TagBubble
	for (let i = 0; i < bubblesContainer.length; i++) {
		bubble = bubblesContainer[i]

		if (bubble.posX < COLLISION_LIMIT_X_LEFT) {
			bubble.speedX = Math.abs(bubble.speedX) * SPEED_RESET
			bubble.posX = COLLISION_LIMIT_X_LEFT
		} else if (bubble.posX > COLLISION_LIMIT_X_RIGHT - bubble.width) {
			bubble.speedX = -Math.abs(bubble.speedX) * SPEED_RESET
			bubble.posX = COLLISION_LIMIT_X_RIGHT - bubble.width
		}

		if (bubble.posY < COLLISION_LIMIT_Y_TOP) {
			bubble.speedY = Math.abs(bubble.speedY) * SPEED_RESET
			bubble.posY = COLLISION_LIMIT_Y_TOP
		} else if (bubble.posY > COLLISION_LIMIT_Y_BOTTOM - bubble.height) {
			bubble.speedY = -Math.abs(bubble.speedY) * SPEED_RESET
			bubble.posY = COLLISION_LIMIT_Y_BOTTOM - bubble.height
		}
	}
}

function intersectionCircles(
	posXOne: number,
	posYOne: number,
	radiusOne: number,
	posXTwo: number,
	posYTwo: number,
	radiusTwo: number
) {
	let distanceBetweenCircles =
		(posXOne - posXTwo) * (posXOne - posXTwo) + (posYOne - posYTwo) * (posYOne - posYTwo)
	return distanceBetweenCircles <= (radiusOne + radiusTwo) * (radiusOne + radiusTwo)
}

function GetRandomNumber(min: number, max: number) {
	return Math.floor(Math.random() * (max - min) + min)
}

function GetRandomNumberFloat(min: number, max: number) {
	return Math.random() * (max - min) + min
}
