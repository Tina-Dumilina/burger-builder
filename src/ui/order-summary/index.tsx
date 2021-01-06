import React from 'react'
import {Ingredients} from 'types'
import {Button} from 'ui/button'

type OrderSummaryType = {
  ingredients: Record<Ingredients, number>
  onCancel: () => void
  onContinue: () => void
  price: number
}

export const OrderSummary = ({ingredients, onContinue, onCancel, price}: OrderSummaryType) => {
  const ingredientsSummary = () => {
    const keys = Object.keys(ingredients) as Ingredients[]
    return keys.map((key) => (
      <li key={key}>
        <span style={{textTransform: 'capitalize'}}>{key}:</span> {ingredients[key]}
      </li>
    ))
  }
  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious order with the following ingredients:</p>
      <ul>{ingredientsSummary()}</ul>
      <p>
        <strong>Total price: {price}$</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button type="danger" onClick={onCancel}>
        CANCEL
      </Button>
      <Button type="success" onClick={onContinue}>
        CONTINUE
      </Button>
    </>
  )
}
