import React from 'react'
import styles from './styles.module.scss'

export const Navigation = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a href="/" className={styles.link}>
            BurgerBuilder
          </a>
        </li>
        <li className={styles.item}>
          <a href="/" className={styles.link}>
            Checkout
          </a>
        </li>
      </ul>
    </nav>
  )
}
