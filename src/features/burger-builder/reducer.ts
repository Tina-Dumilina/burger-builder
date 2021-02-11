import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from './constants'

const BASE_PRICE = 4

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
}

const initialState = {
  ingredients: {},
  totalPrice: BASE_PRICE,
  error: false,
  building: false,
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
        building: true,
      }
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
        building: true,
      }
    case SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        error: false,
        totalPrice: BASE_PRICE,
        building: false,
      }
    case FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      }
  }
  return state
}
