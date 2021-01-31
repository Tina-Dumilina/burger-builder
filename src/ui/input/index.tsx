import React from 'react'
import styles from './styles.module.scss'

type InputProps = {
  type?: 'text' | 'email' | 'password'
  multiline?: boolean
  error?: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
  placeholder: string
  touched?: boolean
}

export const Input = ({multiline = false, onChange, error, touched, ...props}: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {multiline ? (
        <textarea className={styles.input} onChange={onChange} {...props} />
      ) : (
        <input className={styles.input} onChange={onChange} {...props} />
      )}
      {touched && error && <span className={styles.error}>{error}</span>}
    </div>
  )
}
