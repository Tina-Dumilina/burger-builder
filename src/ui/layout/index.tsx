import React, {Component} from 'react'
import {Toolbar} from 'ui/toolbar'
import {SideDrawer} from 'ui/side-drawer'
import styles from './styles.module.scss'

type LayoutState = {
  sideDrawerShown: boolean
}

type LayoutProps = {
  children: React.ReactNode
}

export class Layout extends Component<LayoutProps, LayoutState> {
  state = {
    sideDrawerShown: false,
  }

  closeSideDrawer = () => {
    this.setState({sideDrawerShown: false})
  }

  showSideDrawer = () => {
    this.setState({sideDrawerShown: true})
  }

  render() {
    return (
      <>
        <Toolbar showSideDrawer={this.showSideDrawer} />
        <SideDrawer onClose={this.closeSideDrawer} isShown={this.state.sideDrawerShown} />
        <main className={styles.content}>{this.props.children}</main>
      </>
    )
  }
}
