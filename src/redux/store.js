import { createStore, applyMiddleware } from "redux"
import { rootReduce } from "./reducer"
import thunk from "redux-thunk"
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootSaga from "./saga/rootSaga"
import createSagaMiddleware from 'redux-saga'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, rootReduce)

const sagaMiddleware = createSagaMiddleware()

const middleware = [thunk, sagaMiddleware]

export const configureStore = () => {
  let store = createStore(persistedReducer, applyMiddleware(...middleware));


  sagaMiddleware.run(rootSaga)
  return store;
}

export let store = configureStore();
export let persistor = persistStore(store)