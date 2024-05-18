export interface Ii18n {
	SEO_Description: string
	navigationMenu: {
		home: Iin18Button
		works: Iin18Button
		projects: Iin18Button
		experience: Iin18Button
		contact: Iin18Button
	}
	socialMedia: {
		github: string
		linkedin: string
		email: {
			title: string
			copy: Iin18Button
			send: Iin18Button
		}
		resume: Iin18Button
	}
	homeSection: {
		position: string
	}
	worksSection: {
		title: string
		works: Ii18nProject[]
	}
	projectsSection: {
		title: string
		projects: Ii18nProject[]
	}
	experienceSection: Ii18nExperience[]
	contactSection: {
		title: string
		message: string[]
		form: IFormContact
	}
}

export interface Iin18Button {
	text: string
	title: string
}

export interface Iin18ButtonLink {
	text: string
	title: string
	link: string
}

export interface IFieldForm {
	label: string
	error: string
}

export interface Ii18nProject {
	name: string
	description: string[]
	type: "web" | "desktop" | "mobile"
	image: string
	technologies: string[]
	technologies_names: string[]
	demo: Iin18ButtonLink
	code: Iin18ButtonLink
}

export interface Ii18nExperience {
	id: number
	age_start: number
	age_end: number
	name: string
	company: string
	text: string
	position: "LEFT" | "RIGHT"
	technologies: string[]
	name_technologies: string[]
	softskills: string[]
}

export interface IFormContact {
	name: IFieldForm
	email: IFieldForm
	message: IFieldForm
	response: {
		success: string[]
		error: string[]
	}
	button: Iin18Button
}
