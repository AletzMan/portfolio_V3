import React from "react"
import style from "./button.module.scss"


interface Props {
	type: "Link" | "Button"
	href?: string
	text?: string
	title?: string
	children: React.JSX.Element
	isSecondary?: boolean
	id?: string
	className?: string
	disabled?: boolean
}

export function Button({ type, href, text, children, isSecondary, id, title, className, disabled }: Props) {


	return (
		<>
			{
				type === "Link" &&
				<a
					className={`${style.button} ${className} ${isSecondary && style.button_secondary} ${disabled && style.button_disabled}`}
					href={href}
					target="_blank"
					title={title}
				>
					{children}
					{text}
				</a>

			}
			{
				type === "Button" &&
				<button id={id} className={`${style.button}  ${className} ${isSecondary && style.button_secondary} ${disabled && style.button_disabled}`} title={title}>
					{children}
					{text}
				</button>

			}
		</>
	)

}
