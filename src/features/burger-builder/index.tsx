import React, {Component} from 'react'
import {History} from 'history'
import {orderProvider} from 'utils/order-provider'
import {BurgerPreview} from 'ui/burger-preview'
import {BuildControls} from 'ui/build-controls'
import {OrderSummary} from 'ui/order-summary'
import {Modal} from 'ui/modal'
import {Loading} from 'ui/loading'
import {Ingredients} from 'types'

type BurgerBuilderProps = {
  history: History
}

type BurgerBuilderState = {
  ingredients: Record<Ingredients, number>
  showModal: boolean
  loading: boolean
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
    loading: false,
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

  purchaseContinue = () => {
    this.setState({loading: true})
    const order = {
      ingredients: this.state.ingredients,
      price: this.calculateTotalPrice(),
      customer: {
        name: 'Tina',
        address: {
          street: 'Test street',
          zipCode: '41351',
          country: 'Russia',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    }
    // orderProvider
    //   .post('/orders.json', order)
    //   .then((response) => console.log(response))
    //   .catch((error) => console.log(error))
    //   .finally(() => this.setState({loading: false, showModal: false}))
    const keys = Object.keys(this.state.ingredients) as Ingredients[]
    const queryParams = keys
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(this.state.ingredients[key])}`)
      .join('&')
    this.props.history.push({pathname: '/checkout', search: `?${queryParams}`})
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
            {this.state.loading ? (
              <Loading />
            ) : (
              <OrderSummary
                ingredients={this.state.ingredients}
                onCancel={this.closeOrderSummary}
                onContinue={this.purchaseContinue}
                price={totalPrice}
              />
            )}
          </Modal>
        )}
      </>
    )
  }
}
