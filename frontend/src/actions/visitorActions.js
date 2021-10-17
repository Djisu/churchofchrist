import Axios from 'axios'
import {
  VISITOR_CREATE_FAIL,
  VISITOR_CREATE_REQUEST,
  VISITOR_CREATE_SUCCESS,
  VISITOR_DELETE_FAIL,
  VISITOR_DELETE_REQUEST,
  VISITOR_DELETE_SUCCESS,
  VISITOR_DETAILS_FAIL,
  VISITOR_DETAILS_REQUEST,
  VISITOR_DETAILS_SUCCESS,
  VISITOR_LIST_FAIL,
  VISITOR_LIST_REQUEST,
  VISITOR_LIST_SUCCESS,
  VISITOR_UPDATE_FAIL,
  VISITOR_UPDATE_REQUEST,
  VISITOR_UPDATE_SUCCESS,
} from '../constants/visitorConstants'

export const listVisitors = ({ surname = '' }) => async (dispatch) => {
  console.log('in listVisitors visitorActions', surname)

  dispatch({ type: VISITOR_LIST_REQUEST })

  try {
    const { data } = await Axios.get(`/api/visitors?surname=${surname}`)

    dispatch({ type: VISITOR_LIST_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: VISITOR_LIST_FAIL, payload: err.message })
  }
}

export const detailsVisitor = (visitorId) => async (dispatch) => {
  dispatch({ type: VISITOR_DETAILS_REQUEST, payload: visitorId })

  try {
    const { data } = await Axios.get(`/api/visitors/${visitorId}`)
    dispatch({ type: VISITOR_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: VISITOR_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const createVisitor = () => async (dispatch, getState) => {
  console.log('in in createdVisitor action')
  dispatch({ type: VISITOR_CREATE_REQUEST })
  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.post(
      '/api/visitors',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    )
    //console.log('data:', data)
    dispatch({ type: VISITOR_CREATE_SUCCESS, payload: data.visitor })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({
      type: VISITOR_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateVisitor = (visitor) => async (dispatch, getState) => {
  dispatch({ type: VISITOR_UPDATE_REQUEST, payload: visitor })

  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.put(`/api/visitors/${visitor._id}`, visitor, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: VISITOR_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: VISITOR_UPDATE_FAIL, error: message })
  }
}

export const deleteVisitor = (visitorId) => async (dispatch, getState) => {
  dispatch({ type: VISITOR_DELETE_REQUEST, payload: visitorId })

  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.delete(`/api/visitors/${visitorId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: VISITOR_DELETE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: VISITOR_DELETE_FAIL, payload: message })
  }
}
