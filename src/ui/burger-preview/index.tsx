import React from 'react'
import {BurgerIngredient} from 'ui/burger-ingredient'
import {Ingredients} from 'types'
import styles from './styles.module.scss'

type BurgerPreviewType = {
  ingredients: Record<Ingredients, number>
}

export const BurgerPreview = ({ingredients}: BurgerPreviewType) => {
  const transformedIngredients = transformIngredientsToArray(ingredients)
  return (
    <div className={styles.burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length ? (
        transformedIngredients
      ) : (
        <p>Please start adding ingredients!</p>
      )}
      <BurgerIngredient type="bread-bottom" />
    </div>
  )
}

function transformIngredientsToArray(object: Record<Ingredients, number>): JSX.Element[] {
  const keys = Object.keys(object) as Ingredients[]
  return keys.flatMap((key) => {
    return Array.from({length: object[key]}).map((_, index) => (
      <BurgerIngredient key={key + index} type={key} />
    ))
  })
}
