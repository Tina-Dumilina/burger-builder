import React from 'react'
import {Navigation} from 'ui/navigation'
import {Logo} from 'ui/logo'
import styles from './styles.module.scss'

type ToolbarType = {
  showSideDrawer: () => void
}

export const Toolbar = (props: ToolbarType) => {
  return (
    <header className={styles.toolbar}>
      <div onClick={props.showSideDrawer} className={styles.toggler}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles.image}>
        <Logo />
      </div>
      <Navigation />
    </header>
  )
}
