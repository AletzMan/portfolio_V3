import React, { useEffect, useState } from "react"
import styles from "./styles.module.scss"


interface Props {
    slides: string[]
}
export function Slider({ slides }: Props) {
    const [numberSlide, setNumberSlide] = useState(0)

    useEffect(() => {
        const loop = setInterval(() => {
            if (numberSlide < slides.length - 1) {
                setNumberSlide(numberSlide + 1)
            } else {
                setNumberSlide(0)
            }

        }, 1400)
        return () => clearInterval(loop)
    }, [numberSlide])



    function HandleResetSlider(): void {
        setNumberSlide(0)
    }

    return (
        <>
            <img className={styles.image} src={slides[numberSlide]} onMouseOut={HandleResetSlider} />
        </>
    )
}