import React, { useRef, useEffect } from "react"
import { animationLoop, createBubbleTags } from "./BouncingBalls"

export const BouncingBall: React.FC = () => {
    const containerBallRef = useRef<HTMLDivElement | null>(null)
    useEffect(() => {
        if (containerBallRef !== null) {
            const initAnimation = () => {
                setTimeout(() => {
                    createBubbleTags(50, document.querySelector("#containerBalls") as HTMLBodyElement, 45)
                    window.requestAnimationFrame((timeStamp) => {
                        animationLoop(timeStamp, document.querySelector("#containerBalls") as HTMLBodyElement)
                    })
                }, 200)
            }

            initAnimation() // Llama a la función cuando el componente se monta

            // Agrega cualquier limpieza necesaria si el componente se desmonta
            // return () => {
            // Realiza limpieza aquí si es necesario
            //  }
        }
    }, []) // El segundo argumento es un arreglo vacío para que useEffect se ejecute solo una vez

    return null
}

