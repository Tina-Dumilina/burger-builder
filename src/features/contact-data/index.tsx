import React, {Component} from 'react'
import {History} from 'history'
import {orderProvider} from 'utils/order-provider'
import {Ingredients} from 'types'
import {Button} from 'ui/button'
import {Loading} from 'ui/loading'
import styles from './styles.module.scss'

type ContactDataProps = {
  ingredients: Record<Ingredients, number>
  history: History
}

type ContactDataState = {
  name: string
  email: string
  address: {
    street: string
    postalCode: string
  }
  loading: boolean
}

export class ContactData extends Component<ContactDataProps, ContactDataState> {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  makeOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      customer: {
        name: this.state.name,
        address: {
          street: this.state.address.street,
          postalCode: this.state.address.postalCode,
        },
        email: this.state.email,
      },
      deliveryMethod: 'fastest',
    }
    orderProvider
      .post('/orders.json', order)
      .then((response) => console.log(response))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({loading: false})
        this.props.history.push('/')
      })
  }

  render() {
    return (
      <div className={styles.contact}>
        {this.state.loading ? (
          <Loading />
        ) : (
          <>
            <h4>Enter your contact data</h4>
            <form onSubmit={(event) => this.makeOrder(event)}>
              <input
                className={styles.contact__input}
                type="text"
                name="name"
                placeholder="Your name"
              />
              <input
                className={styles.contact__input}
                type="email"
                name="email"
                placeholder="Your email"
              />
              <input
                className={styles.contact__input}
                type="text"
                name="street"
                placeholder="Your street"
              />
              <input
                className={styles.contact__input}
                type="text"
                name="postal"
                placeholder="Postal code"
              />
              <Button type="success">ORDER</Button>
            </form>
          </>
        )}
      </div>
    )
  }
}
