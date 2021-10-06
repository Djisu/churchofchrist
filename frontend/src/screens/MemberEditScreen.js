import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Axios from 'axios'
import dateFormat from 'dateformat'
import { detailsMember, updateMember } from '../actions/memberActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { MEMBER_UPDATE_RESET } from '../constants/memberContants'

/* import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import { parseISO } from 'date-fns'

//import moment from 'moment' */

export default function MemberEditScreen(props) {
  const memberId = props.match.params.id

  const [surname, setSurname] = useState('')
  const [other_names, setOther_names] = useState('')
  const [gender, setGender] = useState('')
  let [dob, setDob] = useState(new Date())
  const [marital_status, setMarital_status] = useState('')
  const [telno, setTelno] = useState('')
  const [res_address, setRes_address] = useState('')
  const [occupation, setOccupation] = useState('')
  const [place_of_work, setPlace_of_work] = useState('')
  const [location_of_work, setLocation_of_work] = useState('')
  const [emergency_contact_name, setEmergency_contact_name] = useState('')
  const [emergency_contact_no, setEmergency_contact_no] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [gpAddress, setGpAddress] = useState('')

  const memberDetails = useSelector((state) => state.memberDetails)
  const { loading, error, member } = memberDetails

  const memberUpdate = useSelector((state) => state.memberUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = memberUpdate

  const dispatch = useDispatch()

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: MEMBER_UPDATE_RESET })
      //TOBE RESETED LATER
      props.history.push('/memberlist')
    }
    if (!member || member._id !== memberId) {
      dispatch(detailsMember(memberId))
    } else {
      let newDate = dateFormat(member.dob, 'dd-mm-yyyy')

      setSurname(member.surname)
      setOther_names(member.other_names)
      setGender(member.gender)
      // setDob(member.dob)
      setDob(newDate)
      setMarital_status(member.marital_status)
      setTelno(member.telno)
      setRes_address(member.res_address)
      setOccupation(member.occupation)
      setPlace_of_work(member.place_of_work)
      setLocation_of_work(member.location_of_work)
      setEmergency_contact_name(member.emergency_contact_name)
      setEmergency_contact_no(member.emergency_contact_no)
      setDescription(member.description)
      setImage(member.image)
      setGpAddress(member.gpAddress)
    }
  }, [member, dispatch, memberId, successUpdate, props.history])

  const submitHandler = (e) => {
    e.preventDefault()
    //TODO: dispatch update member
    console.log('in submitHandler')

    console.log('image==', image)

    member.image = image
    setImage(image)

    dispatch(
      updateMember({
        _id: memberId,
        surname,
        other_names,
        gender,
        dob,
        marital_status,
        telno,
        res_address,
        occupation,
        place_of_work,
        location_of_work,
        emergency_contact_name,
        emergency_contact_no,
        description,
        image,
        gpAddress,
      }),
    )
  }

  //Upload file hnandler
  const [loadingUpload, setLoadingUpload] = useState(false)
  const [errorUpload, setErrorUpload] = useState('')

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const uploadFileHandler = async (e) => {
    console.log('in uploadFileHandler')

    const file = e.target.files[0]

    //console.log('file', file)

    const bodyFormData = new FormData()
    bodyFormData.append('image', file)
    setLoadingUpload(true)

    console.log('bodyFormData==', bodyFormData)

    try {
      const { data } = await Axios.post('/api/uploads', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      setImage(data)
      setLoadingUpload(false)
    } catch (error) {
      setErrorUpload(error.message)
      setLoadingUpload(false)
    }
  }
  //End

  /* const [items] = React.useState([
    {
      label: 'Married',
      value: 'married',
    },
    { label: 'Single', value: 'Single' },
    { label: 'Widowed', value: 'Widowed' },
    { label: 'Divorced', value: 'Divorced' },
  ])

  const [itemsGender] = React.useState([
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Hemaphrodite', value: 'Hemaphrodite' },
  ])

  const handleMaritalStatusChange = (e) => {
    setMarital_status(e.target.value)
    //console.log('e.target.value==', e.target.value)
  }

  const handleGenderChange = (e) => {
    setGender(e.target.value)
    console.log('e.target.value==', e.target.value)
  }
 */
  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Edit Member {memberId}</h1>
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
              <label htmlFor="gender">Gender</label>
              <input
                id="gender"
                type="text"
                placeholder="Enter either male or female"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="dob">
                Date of Birth: {dateFormat(member.dob, 'dd-mm-yyyy')}
              </label>
              <input
                id="dob"
                type="date"
                placeholder="Enter date of birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="marital_status">Marital Status</label>
              <input
                id="marital_status"
                type="text"
                placeholder="Enter either married or single"
                value={marital_status}
                onChange={(e) => setMarital_status(e.target.value)}
              ></input>
              {/*   <select
                onChange={(e) => handleMaritalStatusChange(e)}
                className="browser-default custom-select"
              >
                {items.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select> */}
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
              <label htmlFor="location_of_work">Location of Work</label>
              <input
                id="location_of_work"
                type="text"
                placeholder="Enter location of work"
                value={location_of_work}
                onChange={(e) => setLocation_of_work(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="emergency_contact_name">
                Emergency contact name
              </label>
              <input
                id="emergemcy_contact_name"
                type="text"
                placeholder="Enter emergency contact name"
                value={emergency_contact_name}
                onChange={(e) => setEmergency_contact_name(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="emergency_contact_no">
                Emergency contact number
              </label>
              <input
                id="emergency_contact_no"
                type="text"
                placeholder="Enter emergency contact number"
                value={emergency_contact_no}
                onChange={(e) => setEmergency_contact_no(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                rows="3"
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter ONLY JPG OR JPG image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div>
              <label htmlFor="imageFile">Image File</label>
              <input
                type="file"
                id="imageFile"
                label="Choose Image"
                onChange={uploadFileHandler}
              ></input>
              {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <MessageBox variant="danger">{errorUpload}</MessageBox>
              )}
              <img className="small-medium" src={image} alt={member.name} />
            </div>
            <div>
              <label htmlFor="gpAddress">GP Address</label>
              <input
                id="gpAddress"
                type="text"
                placeholder="Enter gp address"
                value={gpAddress}
                onChange={(e) => setGpAddress(e.target.value)}
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
