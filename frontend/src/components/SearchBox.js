import React, { useState } from 'react'

export default function SearchBox(props) {
  const [surname, setSurname] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    props.history.push(`/search/surname/${surname}`)
  }
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          surname="q"
          placeholder="Enter the surname"
          id="q"
          onChange={(e) => setSurname(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  )
}
