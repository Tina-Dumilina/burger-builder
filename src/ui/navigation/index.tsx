import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './styles.module.scss'

export const Navigation = () => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" exact activeClassName={styles.active} className={styles.link}>
            BurgerBuilder
          </NavLink>
        </li>
        <li className={styles.item}>
          <NavLink to="/orders" activeClassName={styles.active} className={styles.link}>
            Orders
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}
