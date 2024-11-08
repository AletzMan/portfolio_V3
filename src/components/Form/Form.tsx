import React, { useRef, type FormEvent, useState, type ChangeEvent } from "react"
import emailjs from '@emailjs/browser'
import styles from "./form.module.scss"
import { Button } from "../Button/Button"
import { CheckIcon, LoadingIcon, SendIcon } from "../svg/SVF_JSX"
import type { IFormContact } from "../../Types/i18n"

const SERVICE_ID = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID
const PUBLIC_KEY = import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY
const TEMPLATE_ID = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID

interface IErrors {
    name: string
    email: string
    message: string
}

const EmptyErrors: IErrors = {
    name: "",
    email: "",
    message: ""
}

interface Props {
    formTraductions: IFormContact
}

export function Form({ formTraductions }: Props) {
    const form = useRef<HTMLFormElement | null>(null);
    const [errors, setErrors] = useState<IErrors>(EmptyErrors)
    const [responseSend, setResponseSend] = useState<{ status: boolean, text: string[] }>({ status: false, text: [""] })
    const [loading, setLoading] = useState<boolean>(false)


    const sendEmail = () => {




        if (form.current) {
            setLoading(true)
            emailjs
                .sendForm(SERVICE_ID, TEMPLATE_ID, form?.current, {
                    publicKey: PUBLIC_KEY,
                })
                .then(
                    () => {
                        console.log('SUCCESS!')
                        setLoading(false)
                        setResponseSend({ status: true, text: formTraductions.response.success })
                    },
                    (error) => {
                        console.log('FAILED...', error.text)
                        setResponseSend({ status: false, text: formTraductions.response.error })
                        setLoading(false)
                    },
                )
        }

    }

    const ValidateForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const regexMail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const inputs = e.currentTarget.getElementsByTagName("input")
        const textArea = e.currentTarget.getElementsByTagName("textarea")

        const name = inputs[0].value
        const email = inputs[1].value
        const message = textArea[0].value

        const newErrors: IErrors = {
            name: name === "" ? formTraductions.name.error : "",
            email: !regexMail.test(email) ? formTraductions.email.error : "",
            message: message === "" ? formTraductions.message.error : ""
        }

        setErrors(newErrors)
        if (Object.values(newErrors).some(text => text !== "")) return

        sendEmail()
    }

    const HandleOnCHange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.currentTarget
        setErrors({ ...errors, [name]: "" })
    }

    return (
        <>
            {!responseSend.status && <form className={styles.form} onSubmit={ValidateForm} ref={form}>
                <label className={styles.form_label}>
                    {formTraductions.name.label}
                    <input className={styles.form_input} type="text" name="name" placeholder="John Doe" onChange={HandleOnCHange} />
                    <span className={`${styles.form_error} ${errors.name && styles.form_errorActive}`}>{errors?.name}</span>
                </label>
                <label className={styles.form_label}>
                    {formTraductions.email.label}
                    <input className={styles.form_input} type="email" name="email" placeholder="example@email.com" onChange={HandleOnCHange} />
                    <span className={`${styles.form_error} ${errors.email && styles.form_errorActive}`}>{errors?.email}</span>
                </label>
                <label className={styles.form_label}>
                    {formTraductions.message.label}
                    <textarea className={`${styles.form_input} ${styles.form_textarea}`} name="message" onChange={HandleOnCHange} />
                    <span className={`${styles.form_error} ${errors.message && styles.form_errorActive}`}>{errors?.message}</span>
                </label>
                <div className={styles.loading}>
                    {loading && <LoadingIcon className={styles.loading_icon} />}
                    <span className={styles.loading_text}>{responseSend.text}</span>
                </div>
                <Button
                    className={styles.form_button}
                    type="Button"
                    text={formTraductions.button.text}
                    title={formTraductions.button.title}
                >
                    <SendIcon />
                </Button>
            </form>
            }
            {responseSend.status &&
                <div className={styles.success}>
                    <CheckIcon className={styles.success_icon} />
                    {formTraductions?.response?.success?.map(message => (
                        <p key={message} className={styles.success_message}>{message}</p>
                    ))}
                </div>

            }
        </>
    )
}