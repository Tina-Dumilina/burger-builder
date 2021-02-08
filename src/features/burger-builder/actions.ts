import {orderProvider} from 'utils/order-provider'
import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
  FETCH_INGREDIENTS_FAILED,
} from './constants'

export const addIngredient = (ingredient) => ({type: ADD_INGREDIENT, payload: ingredient})
export const removeIngredient = (ingredient) => ({type: REMOVE_INGREDIENT, payload: ingredient})

const setIngredients = (ingredients) => ({type: SET_INGREDIENTS, payload: ingredients})
const fetchIngredientsFailed = () => ({type: FETCH_INGREDIENTS_FAILED})

export const fetchIngredients = () => {
  return (dispatch) => {
    orderProvider
      .get('/ingredients.json')
      .then((response) => dispatch(setIngredients(response.data)))
      .catch((error) => dispatch(fetchIngredientsFailed()))
  }
}
