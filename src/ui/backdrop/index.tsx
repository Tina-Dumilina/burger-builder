import React from 'react'
import styles from './styles.module.scss'

type BackdropType = {
  onClick: () => void
}

export const Backdrop = (props: BackdropType) => {
  return <div className={styles.backdrop} onClick={props.onClick} />
}
