import React from 'react'
import {BurgerPreview} from 'ui/burger-preview'
import {Button} from 'ui/button'
import {Ingredients} from 'types'
import styles from './styles.module.scss'

type CheckoutSummaryProps = {
  ingredients: Record<Ingredients, number>
  cancelCheckout: () => void
  continueCheckout: () => void
}

export const CheckoutSummary = ({
  ingredients,
  cancelCheckout,
  continueCheckout,
}: CheckoutSummaryProps) => {
  return (
    <div className={styles.summary}>
      <h1>We hope it tastes well!</h1>
      <div className={styles.summary__container}>
        <BurgerPreview ingredients={ingredients} />
      </div>
      <Button type="danger" onClick={cancelCheckout}>
        CANCEL
      </Button>
      <Button type="success" onClick={continueCheckout}>
        CONTINUE
      </Button>
    </div>
  )
}
