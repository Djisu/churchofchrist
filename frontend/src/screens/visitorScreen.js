import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsVisitor } from '../actions/visitorActions.js'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

export default function VisitorScreen(props) {
  const dispatch = useDispatch()
  const visitorId = props.match.params.id

  const visitorDetails = useSelector((state) => state.visitorDetails)
  const { loading, error, visitor } = visitorDetails

  useEffect(() => {
    dispatch(detailsVisitor(visitorId))
  }, [dispatch, visitorId])

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
            {/*  <div className="col-2">
              <img className="large" src={member.image} alt={member.name} />
            </div> */}
            <div className="col-1">
              <ul>
                <li>Surname: {visitor.surname}</li>
                <li>Other Name: {visitor.other_names}</li>
                <li>Mobile No: {visitor.telno}</li>
                <li>Residential Address: {visitor.res_address}</li>
                <li>Occupation: {visitor.occupation}</li>
                <li>Place of Work: {visitor.place_of_work}</li>
              </ul>
            </div>
            <div className="col-1">
              <span>{visitor.description}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
