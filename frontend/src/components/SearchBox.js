import React, { useState } from 'react'

export default function SearchBox(props) {
  const [other_names, setOther_names] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()

    console.log('in props.history.push')

    props.history.push(`/search/other_names/${other_names}`)
  }
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          other_names="q"
          id="q"
          onChange={(e) => setOther_names(e.target.value)}
        ></input>
        <button className="primary" type="submit">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  )
}
