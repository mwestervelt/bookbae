import { createStore, applyMiddleware, compose } from 'redux'
import createDebounce from 'redux-debounced';
import thunk from 'redux-thunk'
import reducer from './reducer'

const store = createStore(reducer, compose(applyMiddleware(thunk, createDebounce()), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export default store
