import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './styles.module.scss'

type NavigationProps = {
  isAuthenticated: boolean
}

export const Navigation = ({isAuthenticated}: NavigationProps) => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink to="/" exact activeClassName={styles.active} className={styles.link}>
            BurgerBuilder
          </NavLink>
        </li>
        {isAuthenticated && (
          <li className={styles.item}>
            <NavLink to="/orders" activeClassName={styles.active} className={styles.link}>
              Orders
            </NavLink>
          </li>
        )}
        <li className={styles.item}>
          {isAuthenticated ? (
            <NavLink to="/logout" activeClassName={styles.active} className={styles.link}>
              Logout
            </NavLink>
          ) : (
            <NavLink to="/auth" activeClassName={styles.active} className={styles.link}>
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  )
}
