import {combineReducers, createStore} from 'redux'
import {reducer as burgerBuilderReducer} from 'features/burger-builder'

const combinedReducers = combineReducers({
  burger: burgerBuilderReducer,
})

export const store = createStore(combinedReducers)
