import React from 'react'
import {Ingredients} from 'types'

type OrderSummaryType = {
  ingredients: Record<Ingredients, number>
}

export const OrderSummary = ({ingredients}: OrderSummaryType) => {
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
      <p>Continue to Checkout?</p>
    </>
  )
}
