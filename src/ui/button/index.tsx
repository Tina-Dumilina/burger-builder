import React from 'react'
import styles from './styles.module.scss'

type ButtonType = {
  onClick: () => void
  type: 'success' | 'danger'
  children: React.ReactNode
}

export const Button = (props: ButtonType) => {
  return (
    <button onClick={props.onClick} className={styles.button} data-type={props.type}>
      {props.children}
    </button>
  )
}
