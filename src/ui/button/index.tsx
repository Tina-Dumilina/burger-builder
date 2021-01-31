import React from 'react'
import styles from './styles.module.scss'

type ButtonType = {
  onClick?: () => void
  type: 'success' | 'danger'
  children: React.ReactNode
  disabled?: boolean
}

export const Button = ({onClick, type, children, disabled}: ButtonType) => {
  return (
    <button onClick={onClick} className={styles.button} data-type={type} disabled={disabled}>
      {children}
    </button>
  )
}
