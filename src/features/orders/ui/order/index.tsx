import React from 'react'
import styles from './styles.module.scss'

type OrderType = {
  ingredients: any
  price: string
}

export const Order = ({price, ingredients}: OrderType) => {
  const adaptedIngredients = Object.keys(ingredients)
    .map((key) => ({
      name: key,
      amount: ingredients[key],
    }))
    .filter((ingredient) => ingredient.amount > 0)

  return (
    <div className={styles.order}>
      <p>
        Ingredients:{' '}
        {adaptedIngredients.map((ingredient) => (
          <span key={ingredient.name} className={styles.ingredient}>
            {ingredient.name} ({ingredient.amount})
          </span>
        ))}
      </p>
      <p>
        Price: <strong>USD {price}</strong>
      </p>
    </div>
  )
}
