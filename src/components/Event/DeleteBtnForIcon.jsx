import React from 'react'
import PropTypes from 'prop-types'

import CancelIcon from '@mui/icons-material/Cancel'

import s from './eventStyle.module.scss'

function DeleteBtnForIcon({ handelDelete, value }) {
  DeleteBtnForIcon.propTypes = {
    handelDelete: PropTypes.func,
    value: PropTypes.number,
  }

  return (
    <CancelIcon
      sx={{ color: 'error.main' }}
      fontSize="small"
      id={value}
      onClick={(e) => handelDelete(e)}
    />
  )
}

export default DeleteBtnForIcon
