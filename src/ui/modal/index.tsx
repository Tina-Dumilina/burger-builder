import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styles from './styles.module.scss'

type ModalState = {
  container: React.ReactNode
}

type ModalProps = {
  children: React.ReactNode
  onClose: () => void
}

export class Modal extends Component<ModalProps, ModalState> {
  state = {
    container: document.createElement('div'),
  }

  componentDidMount() {
    document.body.appendChild(this.state.container)
  }

  componentWillUnmount() {
    document.body.removeChild(this.state.container)
  }

  render() {
    return ReactDOM.createPortal(
      <>
        <div className={styles.backdrop} onClick={this.props.onClose} />
        <div className={styles.modal}>{this.props.children}</div>
      </>,
      this.state.container,
    )
  }
}
