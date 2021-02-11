import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './styles.module.scss'

type NavigationProps = {
  isAuthenticated: boolean
  onClick?: () => void
}

export const Navigation = ({isAuthenticated, onClick}: NavigationProps) => {
  return (
    <nav>
      <ul className={styles.list}>
        <li className={styles.item}>
          <NavLink
            to="/"
            exact
            activeClassName={styles.active}
            className={styles.link}
            onClick={onClick}
          >
            BurgerBuilder
          </NavLink>
        </li>
        {isAuthenticated && (
          <li className={styles.item}>
            <NavLink
              to="/orders"
              activeClassName={styles.active}
              className={styles.link}
              onClick={onClick}
            >
              Orders
            </NavLink>
          </li>
        )}
        <li className={styles.item}>
          {isAuthenticated ? (
            <NavLink
              to="/logout"
              activeClassName={styles.active}
              className={styles.link}
              onClick={onClick}
            >
              Logout
            </NavLink>
          ) : (
            <NavLink
              to="/auth"
              activeClassName={styles.active}
              className={styles.link}
              onClick={onClick}
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  )
}
