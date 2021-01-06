import React from 'react'
import Burger from './burger-logo.png'
import styles from './styles.module.scss'

export const Logo = () => {
  return (
    <div className={styles.logo}>
      <img src={Burger} alt="Logo" />
    </div>
  )
}
