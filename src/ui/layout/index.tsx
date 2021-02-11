import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Toolbar} from 'ui/toolbar'
import {SideDrawer} from 'ui/side-drawer'
import styles from './styles.module.scss'

type LayoutState = {
  sideDrawerShown: boolean
}

type LayoutProps = {
  children: React.ReactNode
  isAuthenticated: boolean
}

class LayoutComponent extends Component<LayoutProps, LayoutState> {
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
        <Toolbar
          showSideDrawer={this.showSideDrawer}
          isAuthenticated={this.props.isAuthenticated}
        />
        <SideDrawer
          onClose={this.closeSideDrawer}
          isShown={this.state.sideDrawerShown}
          isAuthenticated={this.props.isAuthenticated}
        />
        <main className={styles.content}>{this.props.children}</main>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
})

export const Layout = connect(mapStateToProps)(LayoutComponent)
