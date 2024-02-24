import styles from "./header.module.scss"
import React, { useEffect } from "react"
import { HomeIcon, AboutIcon, WorkIcon, ProjectsIcon, ContactIcon } from "../svg/SVF_JSX"

export default function NavigationMenu() {
	return (
		<>
			<nav className={styles.nav}>
				<a href="/" className={`${styles.nav_link} nav_link`} data-desc="Inicio">
					<HomeIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>Inicio</span>
				</a>
				<a href="/about" className={`${styles.nav_link} nav_link`}>
					<AboutIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>Sobre mí</span>
				</a>
				<a href="/work" className={`${styles.nav_link} nav_link`}>
					<WorkIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>Trabajos</span>
				</a>
				<a href="/projects" className={`${styles.nav_link} nav_link`}>
					<ProjectsIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>Proyectos</span>
				</a>
				<a href="/contact" className={`${styles.nav_link} nav_link`}>
					<ContactIcon className={styles.nav_icon} />
					<span className={`${styles.nav_name} nav_name`}>Contacto</span>
				</a>
			</nav>
		</>
	)
}
