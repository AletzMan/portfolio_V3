import styles from "./header.module.scss"
import React, { useEffect, useState } from "react"
import { HomeIcon, AboutIcon, WorkIcon, ProjectsIcon, ContactIcon } from "../svg/SVF_JSX"

export default function NavigationMenu(props) {
	const { props: namesMenu, currentLocale } = props
	const [scroll, setScroll] = useState("home")

	useEffect(() => {
		handleScroll()
	}, [])

	useEffect(() => {
		window.addEventListener("scroll", handleScroll)
		return () => {
			window.removeEventListener("scroll", handleScroll)
		}
	}, [])

	const handleScroll = () => {
		if (scrollY < 550) setScroll("home")
		if (scrollY > 550 && scrollY < 2250) setScroll("works")
		if (scrollY > 2250 && scrollY < 3550) setScroll("projects")
		if (scrollY > 3550 && scrollY < 5150) setScroll("experience")
		if (scrollY > 5150) setScroll("contact")
	}

	return (
		<>
			<nav className={styles.nav}>
				<a
					href={`/${currentLocale}#home`}
					className={`
					${styles.nav_link} 
					${scroll === "home" && styles.nav_linkActive} nav_link`}
					title={namesMenu.home.title}
				>
					<HomeIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>{namesMenu.home.text}</span>
				</a>

				<a
					href="#works"
					className={`
					${styles.nav_link} 
					${scroll === "works" && styles.nav_linkActive} nav_link`}
					title={namesMenu.works.title}
				>
					<WorkIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>{namesMenu.works.text}</span>
				</a>
				<a
					href="#projects"
					className={`
					${styles.nav_link} 
					${scroll === "projects" && styles.nav_linkActive} nav_link`}
					title={namesMenu.projects.title}
				>
					<ProjectsIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>{namesMenu.projects.text}</span>
				</a>
				<a
					href="#experience"
					className={`
					${styles.nav_link} 
					${scroll === "experience" && styles.nav_linkActive} nav_link`}
					title={namesMenu.experience.title}
				>
					<AboutIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>
						{namesMenu.experience.text}
					</span>
				</a>
				<a
					href="#contact"
					className={`
					${styles.nav_link} 
					${scroll === "contact" && styles.nav_linkActive} nav_link`}
					title={namesMenu.contact.title}
				>
					<ContactIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>{namesMenu.contact.text}</span>
				</a>
			</nav>
		</>
	)
}
