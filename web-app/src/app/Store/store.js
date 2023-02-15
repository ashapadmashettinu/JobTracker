import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';

export const history = createBrowserHistory();

const initialState = {}
const enhancers = []
const middleware = [
    thunk
]

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    createRootReducer(),
    initialState,
    composedEnhancers
)

export default store