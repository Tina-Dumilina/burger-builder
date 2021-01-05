import React from 'react'
import styles from './styles.module.scss'

export type BurgerIngredientType = {
  type: 'bread-bottom' | 'bread-top' | 'meat' | 'cheese' | 'bacon' | 'salad'
}

export const BurgerIngredient = ({type}: BurgerIngredientType) => {
  return (
    <div className={styles.ingredient} data-type={type}>
      {type === 'bread-top' && (
        <>
          <div className={styles.seeds1} />
          <div className={styles.seeds2} />
        </>
      )}
    </div>
  )
}
