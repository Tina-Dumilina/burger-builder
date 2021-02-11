import React from 'react'
import {Navigation} from 'ui/navigation'
import {Logo} from 'ui/logo'
import {Backdrop} from 'ui/backdrop'
import styles from './styles.module.scss'

type SideDrawerType = {
  onClose: () => void
  isShown: boolean
  isAuthenticated: boolean
}

export const SideDrawer = (props: SideDrawerType) => {
  return (
    <>
      {props.isShown && <Backdrop onClick={props.onClose} />}
      <div className={styles.drawer} data-open={props.isShown}>
        <div className={styles.image}>
          <Logo />
        </div>
        <Navigation isAuthenticated={props.isAuthenticated} />
      </div>
    </>
  )
}
