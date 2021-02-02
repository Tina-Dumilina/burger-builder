import {ADD_INGREDIENT, REMOVE_INGREDIENT} from './constants'

export const addIngredient = (ingredient) => ({type: ADD_INGREDIENT, payload: ingredient})
export const removeIngredient = (ingredient) => ({type: REMOVE_INGREDIENT, payload: ingredient})
