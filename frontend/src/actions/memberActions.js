import Axios from 'axios'
import {
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_SUCCESS,
  MEMBER_DELETE_FAIL,
  MEMBER_DELETE_REQUEST,
  MEMBER_DELETE_SUCCESS,
  MEMBER_DETAILS_FAIL,
  MEMBER_DETAILS_REQUEST,
  MEMBER_DETAILS_SUCCESS,
  MEMBER_LIST_FAIL,
  MEMBER_LIST_REQUEST,
  MEMBER_LIST_SUCCESS,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_SUCCESS,
} from '../constants/memberContants'

export const listMembers = () => async (dispatch) => {
  dispatch({ type: MEMBER_LIST_REQUEST })

  try {
    const { data } = await Axios.get('/api/members')

    dispatch({ type: MEMBER_LIST_SUCCESS, payload: data })
  } catch (err) {
    dispatch({ type: MEMBER_LIST_FAIL, payload: err.message })
  }
}

export const detailsMember = (memberId) => async (dispatch) => {
  dispatch({ type: MEMBER_DETAILS_REQUEST, payload: memberId })

  try {
    const { data } = await Axios.get(`/api/members/${memberId}`)
    dispatch({ type: MEMBER_DETAILS_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: MEMBER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const createMember = () => async (dispatch, getState) => {
  console.log('in createmember action')
  dispatch({ type: MEMBER_CREATE_REQUEST })
  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.post(
      '/api/members',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    )
    //console.log('data:', data)
    dispatch({ type: MEMBER_CREATE_SUCCESS, payload: data.member })
  } catch (err) {
    const message =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message

    dispatch({
      type: MEMBER_CREATE_FAIL,
      payload: message,
    })
  }
}

export const updateMember = (member) => async (dispatch, getState) => {
  dispatch({ type: MEMBER_UPDATE_REQUEST, payload: member })

  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.put(`/api/members/${member._id}`, member, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: MEMBER_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: MEMBER_UPDATE_FAIL, error: message })
  }
}

export const deleteMember = (memberId) => async (dispatch, getState) => {
  dispatch({ type: MEMBER_DELETE_REQUEST, payload: memberId })

  const {
    userSignin: { userInfo },
  } = getState()

  try {
    const { data } = await Axios.delete(`/api/members/${memberId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    })

    dispatch({ type: MEMBER_DELETE_SUCCESS })
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    dispatch({ type: MEMBER_DELETE_FAIL, payload: message })
  }
}
