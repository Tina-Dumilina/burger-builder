import React, {useState, useCallback, useEffect} from 'react'
import {FormContextProvider} from './components/form-context'

type FormProps = {
  children: React.ReactNode
  onSubmit: (args: {[key: string]: string}) => void
  onChange: (args: any) => void
  validators?: any
}

export const Form = ({children, onSubmit, onChange, validators}: FormProps) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [isValid, setIsValid] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formValues)
  }

  const onChangeInput = useCallback((name, value) => {
    setFormValues((prevState) => ({...prevState, [name]: value}))
  }, [])

  useEffect(() => {
    onChange(formValues)
  }, [onChange, formValues])

  // iterate form fields to validate and set errors
  useEffect(() => {
    setFormErrors(validators(formValues))
  }, [formValues, validators])

  // check form validity
  useEffect(() => {
    Object.keys(formErrors).length === 0 ? setIsValid(true) : setIsValid(false)
  }, [formErrors])

  return (
    <form onSubmit={handleSubmit}>
      <FormContextProvider value={{onChangeInput, isValid, formErrors}}>
        {children}
      </FormContextProvider>
    </form>
  )
}

export {Field} from './components/field'
export {Submit} from './components/submit'
