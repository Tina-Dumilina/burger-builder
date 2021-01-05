import React from 'react'
import styles from './styles.module.scss'

type LayoutType = {
  children: React.ReactNode
}

export const Layout = ({children}: LayoutType) => {
  return (
    <>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main className={styles.content}>{children}</main>
    </>
  )
}
