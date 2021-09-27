import React, { useEffect } from 'react'
import Member from '../components/Member'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { listMembers } from '../actions/memberActions'

export default function HomeScreen(props) {
  const dispatch = useDispatch()
  const memberList = useSelector((state) => state.memberList)
  const { loading, error, members } = memberList

  useEffect(() => {
    dispatch(listMembers())
  }, [dispatch])

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="row center">
          {members.map((member) => (
            <Member key={member._id} member={member}></Member>
          ))}
        </div>
      )}
    </div>
  )
}
