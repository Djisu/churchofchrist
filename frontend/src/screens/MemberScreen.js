import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsMember } from '../actions/memberActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function MemberScreen(props) {
  const dispatch = useDispatch()
  const memberId = props.match.params.id

  const memberDetails = useSelector((state) => state.memberDetails)
  const { loading, error, member } = memberDetails

  useEffect(() => {
    dispatch(detailsMember(memberId))
  }, [dispatch, memberId])

  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row">
            <div className="col-2">
              <img className="large" src={member.image} alt={member.name} />
            </div>
            <div className="col-1">
              <ul>
                <li>Gender: {member.gender}</li>
                <li>Date of Birth: {member.dob}</li>
                <li>Marital Status: {member.marital_status}</li>
                <li>Mobile Phone No: {member.telno}</li>
                <li>Residential Address: {member.res_address}</li>
                <li>Occupation: {member.occupation}</li>
                <li>Place of Work: {member.place_of_work}</li>
                <li>Location of Work: {member.location_of_work}</li>
                <li>Emergency Contact Name: {member.emergemcy_contact_name}</li>
                <li>Emergency Contact No: {member.emergemcy_contact_no}</li>
                <li>GP Address: {member.gpAddress}</li>
              </ul>
            </div>
            <div className="col-1">
              <span>{member.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
