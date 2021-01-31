import React, {Component} from 'react'
import {History} from 'history'
import {orderProvider} from 'utils/order-provider'
import {Ingredients} from 'types'
import {Form, Field, Submit} from 'features/form'
import {Button} from 'ui/button'
import {Loading} from 'ui/loading'
import {Input} from 'ui/input'
import {Dropdown} from 'ui/dropdown'
import styles from './styles.module.scss'

type ContactDataProps = {
  ingredients: Record<Ingredients, number>
  history: History
}

type ContactDataState = {
  form: {
    name: string
    email: string
    deliveryMethod: string
    street: string
    zipCode: string
    country: string
  }
  loading: boolean
}

const validators = (values) => {
  const rules = {
    name: () => {
      if (!values.name) {
        errors.name = 'Required field'
      }
    },
    email: () => {
      if (!values.email) {
        errors.email = 'Required field'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid e-mail'
      }
    },
    street: () => {
      if (!values.street) {
        errors.street = 'Required field'
      }
    },
    zipCode: () => {
      if (!values.zipCode) {
        errors.zipCode = 'Required field'
      }
    },
    country: () => {
      if (!values.country) {
        errors.country = 'Required field'
      }
    },
  }

  const errors: Record<string, string> = {}
  Object.keys(values).forEach((key) => rules[key] && rules[key]())
  return errors
}
export class ContactData extends Component<ContactDataProps, ContactDataState> {
  state = {
    form: {
      name: '',
      email: '',
      street: '',
      zipCode: '',
      country: '',
      deliveryMethod: '',
    },
    loading: false,
  }

  setFormValues = (values) => {
    this.setState({form: values})
  }

  makeOrder = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.props.ingredients,
      order: this.state.form,
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
            <Form onSubmit={this.makeOrder} onChange={this.setFormValues} validators={validators}>
              <Field name="name">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="Your name"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Field name="email" type="email">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="Your email"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Field name="street">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="Your street"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Field name="zipCode">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="ZIP code"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Field name="country">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="Your country"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Field name="deliveryMethod">
                {({onChange, ...props}) => (
                  <Dropdown
                    onChange={(e) => onChange(e.target.value)}
                    options={[
                      {label: 'Fastest', value: 'fastest'},
                      {label: 'Cheapest', value: 'cheapest'},
                    ]}
                    {...props}
                  />
                )}
              </Field>
              <Submit>
                {(isFormValid) => (
                  <Button type="success" disabled={!isFormValid}>
                    ORDER
                  </Button>
                )}
              </Submit>
            </Form>
          </>
        )}
      </div>
    )
  }
}
