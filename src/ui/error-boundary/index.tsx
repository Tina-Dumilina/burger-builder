import React from 'react'
import {Modal} from 'ui/modal'
import {orderProvider} from 'utils/order-provider'

type ErrorBoundaryProps = {
  children: React.ReactNode
}

type ErrorBoundaryState = {
  error: Error | null
  showModal: boolean
  requestInterceptor: number
  responseInterceptor: number
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state = {
    error: null,
    showModal: false,
    requestInterceptor: 0,
    responseInterceptor: 0,
  }

  componentDidMount() {
    this.setState({
      requestInterceptor: orderProvider.interceptors.request.use((request) => {
        this.setState({error: null})
        return request
      }),
    })
    this.setState({
      responseInterceptor: orderProvider.interceptors.response.use(
        (response) => response,
        (error) => this.setState({error}),
      ),
    })
  }

  componentWillUnmount() {
    orderProvider.interceptors.request.eject(this.state.requestInterceptor)
    orderProvider.interceptors.response.eject(this.state.responseInterceptor)
  }

  componentDidCatch(error: any) {
    this.setState({error})
  }

  closeModal = () => {
    window.location.reload()
  }

  render() {
    if (this.state.error) {
      return <Modal onClose={this.closeModal}>Something went wrong</Modal>
    }
    return this.props.children
  }
}
