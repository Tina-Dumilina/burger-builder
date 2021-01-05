import React from 'react'
import {Ingredients} from 'types'
import styles from './styles.module.scss'

type BuildControlType = {
  label: string
  addIngredient: () => void
  removeIngredient: () => void
  disabled: boolean
}

type BuildControlsType = {
  addIngredient: (type: Ingredients) => void
  removeIngredient: (type: Ingredients) => void
  disabled: Record<Ingredients, boolean>
  price: number
  purchasable: boolean
  showOrderSummary: () => void
}

const BuildControl = (props: BuildControlType) => {
  return (
    <div className={styles.control}>
      <div className={styles.label}>{props.label}</div>
      <button className={styles.more} onClick={props.addIngredient}>
        More
      </button>
      <button className={styles.less} onClick={props.removeIngredient} disabled={props.disabled}>
        Less
      </button>
    </div>
  )
}

export const BuildControls = (props: BuildControlsType) => {
  const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
  ] as const
  return (
    <div className={styles.controls}>
      <p>
        Current price: <strong>{props.price}$</strong>
      </p>
      {controls.map((control) => (
        <BuildControl
          label={control.label}
          key={control.type}
          addIngredient={() => props.addIngredient(control.type)}
          removeIngredient={() => props.removeIngredient(control.type)}
          disabled={props.disabled[control.type]}
        />
      ))}
      <button
        className={styles.order}
        disabled={!props.purchasable}
        onClick={props.showOrderSummary}
      >
        ORDER NOW
      </button>
    </div>
  )
}
