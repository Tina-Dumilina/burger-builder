import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {Form, Field, Submit} from 'features/form'
import {Input} from 'ui/input'
import {Button} from 'ui/button'
import {Loading} from 'ui/loading'
import {auth} from './actions'
import styles from './styles.module.scss'

const validators = (values) => {
  const rules = {
    email: () => {
      if (!values.email) {
        errors.email = 'Required field'
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid e-mail'
      }
    },
    password: () => {
      if (!values.password) {
        errors.password = 'Required field'
      } else if (values.password.length < 6) {
        errors.password = 'Password is too short. Min 6 characters required'
      }
    },
  }

  const errors: Record<string, string> = {}
  Object.keys(values).forEach((key) => rules[key] && rules[key]())
  return errors
}

type AuthProps = {
  auth: (...args) => void
  loading: boolean
  error: any
  isAuthenticated: boolean
  building: boolean
}

type AuthState = {
  form: {
    email: string
    password: string
  }
  isSignUp: boolean
}

class AuthComponent extends Component<AuthProps, AuthState> {
  state = {
    form: {
      email: '',
      password: '',
    },
    isSignUp: true,
  }

  setFormValues = (values) => {
    this.setState({form: values})
  }

  submit = () => {
    const {email, password} = this.state.form
    this.props.auth(email, password, this.state.isSignUp)
  }

  switchAuthMode = () => {
    this.setState((prevState) => ({isSignUp: !prevState.isSignUp}))
  }

  render() {
    return this.props.isAuthenticated ? (
      <Redirect to={this.props.building ? '/checkout' : '/'} />
    ) : (
      <div className={styles.auth}>
        {this.props.loading ? (
          <Loading />
        ) : (
          <>
            {this.props.error && this.props.error.data.error.message}
            <Form onSubmit={this.submit} onChange={this.setFormValues} validators={validators}>
              <Field name="email" type="email">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="Your email"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Field name="password" type="password">
                {({onChange, ...props}) => (
                  <Input
                    placeholder="Your password"
                    onChange={(e) => onChange(e.target.value)}
                    {...props}
                  />
                )}
              </Field>
              <Submit>
                {(isFormValid) => (
                  <Button type="success" disabled={!isFormValid}>
                    SUBMIT
                  </Button>
                )}
              </Submit>
            </Form>
            <Button type="danger" onClick={this.switchAuthMode}>
              SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuthenticated: state.auth.token !== null,
  building: state.burger.building,
})

const mapDispatchToProps = (dispatch) => ({
  auth: (email, password, isSignUp) => dispatch(auth(email, password, isSignUp)),
})

export const Auth = connect(mapStateToProps, mapDispatchToProps)(AuthComponent)
export {reducer} from './reducer'
export {logout, authCheckState} from './actions'
