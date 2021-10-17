import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import {
  memberCreateReducer,
  memberDeleteReducer,
  memberDetailsReducer,
  memberGetReducer,
  memberListReducer,
  memberUpdateReducer,
} from './reducers/memberReducers'

import {
  visitorCreateReducer,
  visitorDeleteReducer,
  visitorDetailsReducer,
  visitorGetReducer,
  visitorListReducer,
  visitorUpdateReducer,
} from './reducers/visitorReducers'
import { smsMessageCreateReducer } from './reducers/smsMessageReducers'
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateReducer,
} from './reducers/userReducers'

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
}

const reducer = combineReducers({
  memberList: memberListReducer,
  memberDetails: memberDetailsReducer,
  memberCreate: memberCreateReducer,
  memberUpdate: memberUpdateReducer,
  memberDelete: memberDeleteReducer,
  memberGet: memberGetReducer,

  visitorList: visitorListReducer,
  visitorDetails: visitorDetailsReducer,
  visitorCreate: visitorCreateReducer,
  visitorUpdate: visitorUpdateReducer,
  visitorDelete: visitorDeleteReducer,
  visitorGet: visitorGetReducer,

  userSignin: userSigninReducer,
  userDetails: userDetailsReducer,
  userRegister: userRegisterReducer,

  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  smsMessageCreate: smsMessageCreateReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
)
export default store
