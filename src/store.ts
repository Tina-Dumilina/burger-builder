import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {reducer as burgerBuilderReducer} from 'features/burger-builder'
import {reducer as contactDataReducer} from 'features/contact-data'
import {reducer as ordersReducer} from 'features/orders'

const combinedReducers = combineReducers({
  burger: burgerBuilderReducer,
  contactData: contactDataReducer,
  orders: ordersReducer,
})

export const store = createStore(combinedReducers, applyMiddleware(thunk))
