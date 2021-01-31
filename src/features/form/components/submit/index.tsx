import React, {useContext} from 'react'
import {FormContext} from '../form-context'

export const Submit = ({children}) => {
  const {isValid} = useContext(FormContext)
  return children(isValid)
}
