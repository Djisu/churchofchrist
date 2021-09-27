import {
  SMS_MESSAGE_FAIL,
  SMS_MESSAGE_REQUEST,
  SMS_MESSAGE_SUCCESS,
} from '../constants/smsConstants'
import Axios from 'axios'

export const sendSmsMessage = (message) => async (dispatch, getState) => {
  dispatch({ type: SMS_MESSAGE_REQUEST, payload: message })
  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.post('/api/sms', message, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })
    dispatch({ type: SMS_MESSAGE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({ type: SMS_MESSAGE_FAIL, error: error.message })
  }
}
