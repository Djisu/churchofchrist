import {
  VISITOR_CREATE_FAIL,
  VISITOR_CREATE_REQUEST,
  VISITOR_CREATE_RESET,
  VISITOR_CREATE_SUCCESS,
  VISITOR_DELETE_FAIL,
  VISITOR_DELETE_REQUEST,
  VISITOR_DELETE_RESET,
  VISITOR_DELETE_SUCCESS,
  VISITOR_DETAILS_FAIL,
  VISITOR_DETAILS_REQUEST,
  VISITOR_DETAILS_SUCCESS,
  VISITOR_GET_FAIL,
  VISITOR_GET_REQUEST,
  VISITOR_GET_SUCCESS,
  VISITOR_LIST_FAIL,
  VISITOR_LIST_REQUEST,
  VISITOR_LIST_SUCCESS,
  VISITOR_UPDATE_FAIL,
  VISITOR_UPDATE_REQUEST,
  VISITOR_UPDATE_RESET,
  VISITOR_UPDATE_SUCCESS,
} from '../constants/visitorConstants'

export const visitorListReducer = (
  state = { loading: true, visitors: [] },
  action,
) => {
  switch (action.type) {
    case VISITOR_LIST_REQUEST:
      return { loading: true }

    case VISITOR_LIST_SUCCESS:
      return { loading: false, visitors: action.payload }

    case VISITOR_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const visitorDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case VISITOR_DETAILS_REQUEST:
      return { loading: true }

    case VISITOR_DETAILS_SUCCESS:
      return { loading: false, visitor: action.payload }

    case VISITOR_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const visitorCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VISITOR_CREATE_REQUEST:
      return { loading: true }

    case VISITOR_CREATE_SUCCESS:
      return { loading: false, success: true, visitor: action.payload }

    case VISITOR_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case VISITOR_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const visitorUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case VISITOR_UPDATE_REQUEST:
      return { loading: true }

    case VISITOR_UPDATE_SUCCESS:
      return { loading: false, success: true }

    case VISITOR_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case VISITOR_UPDATE_RESET:
      return {}

    default:
      return state
  }
}

export const visitorDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case VISITOR_DELETE_REQUEST:
      return { loading: true }

    case VISITOR_DELETE_SUCCESS:
      return { loading: false, success: true }

    case VISITOR_DELETE_FAIL:
      return { loading: false, error: action.payload }

    case VISITOR_DELETE_RESET:
      return {}

    default:
      return state
  }
}

export const visitorGetReducer = (state = {}, action) => {
  switch (action.type) {
    case VISITOR_GET_REQUEST:
      return { loading: true }

    case VISITOR_GET_SUCCESS:
      return { loading: false, payload: action.payload }

    case VISITOR_GET_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
