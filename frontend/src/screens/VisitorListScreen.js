import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createVisitor,
  deleteVisitor,
  listVisitors,
} from '../actions/visitorActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
  VISITOR_CREATE_RESET,
  VISITOR_DELETE_RESET,
} from '../constants/visitorConstants'

export default function VisitorListScreen(props) {
  const visitorList = useSelector((state) => state.visitorList)
  const { loading, error, visitors } = visitorList

  const visitorCreate = useSelector((state) => state.visitorCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    visitor: createdvisitor,
  } = visitorCreate

  const visitorDelete = useSelector((state) => state.visitorDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = visitorDelete

  const dispatch = useDispatch()

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: VISITOR_CREATE_RESET })
      props.history.push(`/visitor/${createdvisitor._id}/edit`)
    }

    if (successDelete) {
      dispatch({ type: VISITOR_DELETE_RESET })
    }

    const surname = ''
    dispatch(listVisitors({ surname }))
  }, [dispatch, successCreate, createdvisitor, successDelete, props.history])

  const deleteHandler = (visitor) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteVisitor(visitor._id))
    }
  }

  const createHandler = () => {
    dispatch(createVisitor())
  }

  return (
    <div>
      <div className="row">
        <h1>Visitors</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Visitor
        </button>
      </div>

      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>SURNAME</th>
              <th>OTHER NAMES</th>
              <th>MOBILE NO</th>
              <th>OCCUPATION</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor) => (
              <tr key={visitor._id}>
                <td>{visitor.surname}</td>
                <td>{visitor.other_names}</td>
                <td>{visitor.telno}</td>
                <td>{visitor.occupation}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/visitor/${visitor._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(visitor)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
