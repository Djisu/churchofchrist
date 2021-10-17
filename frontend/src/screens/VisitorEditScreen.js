import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { detailsVisitor, updateVisitor } from '../actions/visitorActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { VISITOR_UPDATE_RESET } from '../constants/visitorConstants'

export default function VisitorEditScreen(props) {
  const visitorId = props.match.params.id

  const [surname, setSurname] = useState('')
  const [other_names, setOther_names] = useState('')
  const [telno, setTelno] = useState('')
  const [res_address, setRes_address] = useState('')
  const [occupation, setOccupation] = useState('')
  const [place_of_work, setPlace_of_work] = useState('')

  const visitorDetails = useSelector((state) => state.visitorDetails)
  const { loading, error, visitor } = visitorDetails

  const visitorUpdate = useSelector((state) => state.visitorUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = visitorUpdate

  const dispatch = useDispatch()

  //Upload image new code
  /* const state = {
    button: 1,
  }
 */
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: VISITOR_UPDATE_RESET })
      props.history.push('/visitorlist')
    }

    if (!visitor || visitor._id !== visitorId) {
      dispatch(detailsVisitor(visitorId))
    } else {
      setSurname(visitor.surname)
      setOther_names(visitor.other_names)
      setTelno(visitor.telno)
      setRes_address(visitor.res_address)
      setOccupation(visitor.occupation)
      setPlace_of_work(visitor.place_of_work)
    }
  }, [visitor, dispatch, visitorId, successUpdate, props.history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateVisitor({
        _id: visitorId,
        surname,
        other_names,
        telno,
        res_address,
        occupation,
        place_of_work,
      }),
    )
  }

  //Upload file hnandler
  const userSignin = useSelector((state) => state.userSignin)
  //   const { userInfo } = userSignin

  //End
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Visitor {visitorId}</h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            <div>
              <label htmlFor="surname">Surname</label>
              <input
                id="surname"
                type="text"
                placeholder="Enter surname"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="other_names">Other names</label>
              <input
                id="other_names"
                type="text"
                placeholder="Enter other names"
                value={other_names}
                onChange={(e) => setOther_names(e.target.value)}
              ></input>
            </div>

            <div>
              <label htmlFor="telno">Mobile No</label>
              <input
                id="telno"
                type="text"
                placeholder="Enter mobile number"
                value={telno}
                onChange={(e) => setTelno(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="res_address"></label>
              <input
                id="res_address"
                type="text"
                placeholder="Enter residential address"
                value={res_address}
                onChange={(e) => setRes_address(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="occupation">Occupation</label>
              <input
                id="occupation"
                type="text"
                placeholder="Enter occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="place_of_work">Place of Work</label>
              <input
                id="place_of_work"
                type="text"
                placeholder="Enter place of work"
                value={place_of_work}
                onChange={(e) => setPlace_of_work(e.target.value)}
              ></input>
            </div>
            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  )
}
