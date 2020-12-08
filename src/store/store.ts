import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {rootReducer} from './reducers/rootReducer'

let enhancer= applyMiddleware(thunk, logger)

if (process.env.NODE_ENV !== "production") {
  const composeEnhancers =
    // @ts-ignore
    typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
  enhancer = composeEnhancers(enhancer);
}

const _localStorage: any = localStorage.getItem('reduxState')

export const store = createStore(
  rootReducer,
  enhancer
)