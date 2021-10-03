import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { listMembers } from '../actions/memberActions'
import { useDispatch, useSelector } from 'react-redux'
import Member from '../components/Member'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function SearchScreen(props) {
  const { surname = 'all' } = useParams()

  console.log('surname:', surname)

  const dispatch = useDispatch()
  const memberList = useSelector((state) => state.memberList)
  const { loading, error, members } = memberList

  useEffect(() => {
    dispatch(listMembers({ surname: surname !== 'all' ? surname : '' }))
  }, [dispatch, surname])

  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{members.length} Results</div>
        )}
      </div>
      <div className="row top">
        {/*  <div className="col-1">
          <h3>Department</h3>
          <ul>Category</ul>
        </div> */}
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {members.length === 0 && <MessageBox>No Member Found</MessageBox>}
              <div className="row center">
                {members.map((member) => (
                  <Member key={member._id} member={member}></Member>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
