import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  createMember,
  deleteMember,
  listMembers,
} from '../actions/memberActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import {
  MEMBER_CREATE_RESET,
  MEMBER_DELETE_RESET,
} from '../constants/memberContants'

export default function MemberListScreen(props) {
  const memberList = useSelector((state) => state.memberList)
  const { loading, error, members } = memberList

  const memberCreate = useSelector((state) => state.memberCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    member: createdMember,
  } = memberCreate

  const memberDelete = useSelector((state) => state.memberDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = memberDelete

  const dispatch = useDispatch()

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: MEMBER_CREATE_RESET })
      props.history.push(`/member/${createdMember._id}/edit`)
    }

    if (successDelete) {
      dispatch({ type: MEMBER_DELETE_RESET })
    }

    dispatch(listMembers())
  }, [dispatch, successCreate, createdMember, successDelete, props.history])

  const deleteHandler = (member) => {
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteMember(member._id))
    }
  }

  const createHandler = () => {
    dispatch(createMember())
  }

  return (
    <div>
      <div className="row">
        <h1>Members</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Member
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
            {members.map((member) => (
              <tr key={member._id}>
                <td>{member.surname}</td>
                <td>{member.other_names}</td>
                <td>{member.telno}</td>
                <td>{member.occupation}</td>
                <td>
                  <button
                    type="button"
                    className="small"
                    onClick={() =>
                      props.history.push(`/member/${member._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    onClick={() => deleteHandler(member)}
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
