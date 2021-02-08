import React, {Component} from 'react'
import {connect} from 'react-redux'
import {History} from 'history'
import {Ingredients} from 'types'
import {Form, Field, Submit} from 'features/form'
import {Button} from 'ui/button'
import {Loading} from 'ui/loading'
import {Input} from 'ui/input'
import {Dropdown} from 'ui/dropdown'
import styles from './styles.module.scss'
import {makeOrder} from './actions'

type ContactDataProps = {
  ingredients: Record<Ingredients, number>
  totalPrice: number
  history: History
  makeOrder: (data: any) => void
  status: 'initial' | 'loading' | 'success' | 'error'
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
    deliveryMethod: () => {
      if (!values.deliveryMethod) {
        errors.deliveryMethod = 'Required field'
      }
    },
  }

  const errors: Record<string, string> = {}
  Object.keys(values).forEach((key) => rules[key] && rules[key]())
  return errors
}
export class ContactDataComponent extends Component<ContactDataProps, ContactDataState> {
  state = {
    form: {
      name: '',
      email: '',
      street: '',
      zipCode: '',
      country: '',
      deliveryMethod: '',
    },
  }

  setFormValues = (values) => {
    this.setState({form: values})
  }

  makeOrder = () => {
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      order: this.state.form,
    }
    this.props.makeOrder(order)
    if (this.props.status === 'success') {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className={styles.contact}>
        {this.props.status === 'loading' ? (
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
                      {label: 'Choose delivery method', value: '', disabled: true},
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

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  status: state.contactData.status,
})

const mapDispatchToProps = (dispatch) => ({
  makeOrder: (data) => dispatch(makeOrder(data)),
})

export {reducer} from './reducer'
export const ContactData = connect(mapStateToProps, mapDispatchToProps)(ContactDataComponent)
