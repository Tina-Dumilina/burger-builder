import React, {Component} from 'react'
import {BurgerPreview} from 'ui/burger-preview'
import {BuildControls} from 'ui/build-controls'
import {OrderSummary} from 'ui/order-summary'
import {Modal} from 'ui/modal'
import {Ingredients} from 'types'

type BurgerBuilderProps = Record<string, never>

type BurgerBuilderState = {
  ingredients: Record<Ingredients, number>
  showModal: boolean
}

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const BASE_PRICE = 4

export class BurgerBuilder extends Component<BurgerBuilderProps, BurgerBuilderState> {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    showModal: false,
  }

  calculateTotalPrice = () => {
    const ingredients = Object.keys(this.state.ingredients) as Ingredients[]
    const ingredientsPrice = ingredients.reduce(
      (acc, ingredient) => acc + INGREDIENT_PRICES[ingredient] * this.state.ingredients[ingredient],
      0,
    )
    return BASE_PRICE + ingredientsPrice
  }

  isPurchasable = () => {
    return Object.values(this.state.ingredients).reduce((acc, value) => (acc += value), 0) > 0
  }

  addIngredient = (type: Ingredients) => {
    this.setState((prevState) => ({
      ingredients: {...prevState.ingredients, [type]: prevState.ingredients[type] + 1},
    }))
  }

  removeIngredient = (type: Ingredients) => {
    if (this.state.ingredients[type] > 0) {
      this.setState((prevState) => ({
        ingredients: {...prevState.ingredients, [type]: prevState.ingredients[type] - 1},
      }))
    }
  }

  getDisabledButtons = () => {
    const disabledButtons = Object.fromEntries(
      Object.entries(this.state.ingredients).map(([key, value]) => [key, value <= 0]),
    ) as Record<Ingredients, boolean>
    return disabledButtons
  }

  showOrderSummary = () => {
    this.setState({showModal: true})
  }

  closeOrderSummary = () => {
    this.setState({showModal: false})
  }

  render() {
    const disabledButtons = this.getDisabledButtons()
    const totalPrice = this.calculateTotalPrice()
    const isPurchasable = this.isPurchasable()
    return (
      <>
        <BurgerPreview ingredients={this.state.ingredients} />
        <BuildControls
          addIngredient={this.addIngredient}
          removeIngredient={this.removeIngredient}
          disabled={disabledButtons}
          price={totalPrice}
          purchasable={isPurchasable}
          showOrderSummary={this.showOrderSummary}
        />
        {this.state.showModal && (
          <Modal onClose={this.closeOrderSummary}>
            <OrderSummary ingredients={this.state.ingredients} />
          </Modal>
        )}
      </>
    )
  }
}
