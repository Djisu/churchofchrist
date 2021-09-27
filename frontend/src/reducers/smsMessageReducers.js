import {
  SMS_MESSAGE_FAIL,
  SMS_MESSAGE_REQUEST,
  SMS_MESSAGE_RESET,
  SMS_MESSAGE_SUCCESS,
} from '../constants/smsConstants'

export const smsMessageCreateReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case SMS_MESSAGE_REQUEST:
      return { loading: true }

    case SMS_MESSAGE_SUCCESS:
      return { loading: false, payload: action.payload }

    case SMS_MESSAGE_FAIL:
      return { loading: false, error: action.payload }

    case SMS_MESSAGE_RESET:
      return {}

    default:
      return state
  }
}
