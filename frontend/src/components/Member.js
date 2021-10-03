import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

export default function Member(props) {
  const { member } = props
  const history = useHistory()

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const handleClick = (id) => {
    console.log('member:', member)
    history.push({ pathname: `/member/${member._id}`, state: member })
  }

  return (
    <div key={member._id} className="card">
      {/* <a href={`/member/${member._id}`}> */}
      <img
        className="small-medium"
        src={member.image || 'http://via.placeholder.com/200X200'}
        alt={member.name}
      />
      {/* </a> */}
      <div className="card-body">
        {/* <a href={`/member/${member._id}`}> */}
        {/* </a> */}
        <h2>
          {member.other_names} {member.surname}
        </h2>
        <h2>Gender: {member.gender}</h2>
        <h5>Mobile Phone No: {member.telno}</h5>
        <h5>Occupation: {member.occupation}</h5>
      </div>
      {userInfo && userInfo.isAdmin && (
        <button
          className="primary block"
          onClick={() => handleClick(member._id)}
        >
          Show Details
        </button>
      )}
    </div>
  )
}
