import React, {useState, useContext, useEffect, useRef} from 'react'
import {FormContext} from '../form-context'

type FieldProps = {
  children: (args: any) => React.ReactNode
  name: string
  type?: string
}

export const Field = ({children, name, type = 'text'}: FieldProps) => {
  const [value, setValue] = useState('')
  const previousValueRef = useRef('')
  const previousValue = previousValueRef.current
  const [touched, setTouched] = useState(false)
  const {onChangeInput, formErrors} = useContext(FormContext)

  useEffect(() => {
    previousValueRef.current = value
  }, [value])

  useEffect(() => {
    onChangeInput(name, value)
  }, [onChangeInput, name, value])

  useEffect(() => {
    if (value !== previousValue) {
      setTouched(true)
    }
  }, [value])

  return (
    <div>
      {children({
        name,
        type,
        value,
        onChange: setValue,
        error: formErrors[name],
        touched,
      })}
    </div>
  )
}
