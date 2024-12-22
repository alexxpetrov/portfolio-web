import { composeWithDevTools } from '@redux-devtools/extension'
import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { reducers } from './user/reducers'
import { rootSaga } from './user/sagas'

const sagaMiddleware = createSagaMiddleware()
const enhancer = composeWithDevTools(applyMiddleware(sagaMiddleware))
const store = createStore(reducers, enhancer)
sagaMiddleware.run(rootSaga)

export {
  sagaMiddleware,
  store,
}
