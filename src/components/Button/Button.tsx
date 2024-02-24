import React from "react"
import style from "./button.module.scss"


interface Props {
	type: "Link" | "Button"
	href?: string
	text?: string
	children: React.JSX.Element
	isSecondary?: boolean
	id?: string
}

export function Button({ type, href, text, children, isSecondary, id }: Props) {


	return (
		<>
			{
				type === "Link" &&
				<a
					className={`${style.button} ${isSecondary && style.button_secondary}`}
					href={href}
					target="_blank"
				>
					{children}
					{text}
				</a>

			}
			{
				type === "Button" &&
				<button id={id} className={`${style.button} ${isSecondary && style.button_secondary}`}>
					{children}
					{text}
				</button>

			}
		</>
	)

}
