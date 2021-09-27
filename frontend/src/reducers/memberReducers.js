import {
  MEMBER_CREATE_FAIL,
  MEMBER_CREATE_REQUEST,
  MEMBER_CREATE_RESET,
  MEMBER_CREATE_SUCCESS,
  MEMBER_DELETE_FAIL,
  MEMBER_DELETE_REQUEST,
  MEMBER_DELETE_RESET,
  MEMBER_DELETE_SUCCESS,
  MEMBER_DETAILS_FAIL,
  MEMBER_DETAILS_REQUEST,
  MEMBER_DETAILS_SUCCESS,
  MEMBER_LIST_FAIL,
  MEMBER_LIST_REQUEST,
  MEMBER_LIST_SUCCESS,
  MEMBER_UPDATE_FAIL,
  MEMBER_UPDATE_REQUEST,
  MEMBER_UPDATE_RESET,
  MEMBER_UPDATE_SUCCESS,
} from '../constants/memberContants'

export const memberListReducer = (
  state = { loading: true, members: [] },
  action,
) => {
  switch (action.type) {
    case MEMBER_LIST_REQUEST:
      return { loading: true }

    case MEMBER_LIST_SUCCESS:
      return { loading: false, members: action.payload }

    case MEMBER_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const memberDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case MEMBER_DETAILS_REQUEST:
      return { loading: true }

    case MEMBER_DETAILS_SUCCESS:
      return { loading: false, member: action.payload }

    case MEMBER_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const memberCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_CREATE_REQUEST:
      return { loading: true }

    case MEMBER_CREATE_SUCCESS:
      return { loading: false, success: true, member: action.payload }

    case MEMBER_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case MEMBER_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const memberUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_UPDATE_REQUEST:
      return { loading: true }

    case MEMBER_UPDATE_SUCCESS:
      return { loading: false, success: true }

    case MEMBER_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case MEMBER_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

export const memberDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MEMBER_DELETE_REQUEST:
      return { loading: true }

    case MEMBER_DELETE_SUCCESS:
      return { loading: false, success: true }

    case MEMBER_DELETE_FAIL:
      return { loading: false, error: action.payload }

    case MEMBER_DELETE_RESET:
      return {}

    default:
      return state
  }
}
