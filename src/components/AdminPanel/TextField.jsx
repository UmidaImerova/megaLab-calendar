import React from 'react'
import PropTypes from 'prop-types'

function TextField({ label, inputProps, onChange, value, id }) {
  TextField.propTypes = {
    label: PropTypes.string,
    inputProps: PropTypes.object,
    onChange: PropTypes.func,
    value: PropTypes.string,
    id: PropTypes.string,
  }
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input {...inputProps} onChange={onChange} value={value} id={id} />
    </div>
  )
}

export default TextField
