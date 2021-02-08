import React, {Component} from 'react'
import {History} from 'history'
import {connect} from 'react-redux'
import {BurgerPreview} from 'ui/burger-preview'
import {Modal} from 'ui/modal'
import {Ingredients} from 'types'
import {BuildControls} from './ui/build-controls'
import {OrderSummary} from './ui/order-summary'
import {addIngredient, removeIngredient, fetchIngredients} from './actions'
export {reducer} from './reducer'

type BurgerBuilderProps = {
  history: History
  ingredients: Record<Ingredients, number> | Record<string, never>
  addIngredient: (value: string) => void
  removeIngredient: (value: string) => void
  fetchIngredients: () => void
  totalPrice: number
  error: boolean
}

type BurgerBuilderState = {
  showModal: boolean
}
class BurgerBuilderComponent extends Component<BurgerBuilderProps, BurgerBuilderState> {
  state = {
    showModal: false,
  }

  componentDidMount() {
    this.props.fetchIngredients()
  }

  isPurchasable = () => {
    return Object.values(this.props.ingredients ?? {}).reduce((acc, value) => (acc += value), 0) > 0
  }

  getDisabledButtons = () => {
    const disabledButtons = Object.fromEntries(
      Object.entries(this.props.ingredients ?? {}).map(([key, value]) => [key, value <= 0]),
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
    this.props.history.push({pathname: '/checkout'})
  }

  render() {
    const disabledButtons = this.getDisabledButtons()
    const isPurchasable = this.isPurchasable()
    const {ingredients, addIngredient, removeIngredient, totalPrice} = this.props
    return (
      <>
        <BurgerPreview ingredients={ingredients} />
        <BuildControls
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          disabled={disabledButtons}
          price={totalPrice}
          purchasable={isPurchasable}
          showOrderSummary={this.showOrderSummary}
        />
        {this.state.showModal && (
          <Modal onClose={this.closeOrderSummary}>
            <OrderSummary
              ingredients={ingredients}
              onCancel={this.closeOrderSummary}
              onContinue={this.purchaseContinue}
              price={totalPrice}
            />
          </Modal>
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  error: state.burger.error,
})

const mapDispatchToProps = (dispatch) => ({
  addIngredient: (ingredient) => dispatch(addIngredient(ingredient)),
  removeIngredient: (ingredient) => dispatch(removeIngredient(ingredient)),
  fetchIngredients: () => dispatch(fetchIngredients()),
})

export const BurgerBuilder = connect(mapStateToProps, mapDispatchToProps)(BurgerBuilderComponent)
