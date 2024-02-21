import React from "react"
import style from "./button.module.scss"


interface Props {
	type: "Link" | "Button"
	href?: string
	text?: string
	children: React.JSX.Element
	isSecondary?: boolean
}

export function Button({ type, href, text, children, isSecondary }: Props) {


	return (
		<>
			{
				type === "Link" &&
				<a
					className={style.button}
					href={href}
					target="_blank"
				>
					{children}
					{text}
				</a>

			}
			{
				type === "Button" &&
				<button className={`${style.button} ${isSecondary && style.button_secondary}`}>
					{children}
					{text}
				</button>

			}
		</>
	)

}

/*
<style>

</style>
*/