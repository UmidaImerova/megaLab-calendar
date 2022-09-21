import React from 'react'
import PropTypes from 'prop-types'
import Avatar from '@mui/material/Avatar'
import s from './cardStyle.module.scss'

function UserCard({ value }) {
  UserCard.propTypes = {
    value: PropTypes.object,
  }

  return (
    <div className={s.cardWrapper}>
      <div className={s.avatar}>
        <Avatar alt={value.full_name} src={value.photo_path} sx={{ width: 32, height: 32 }} />
      </div>
      <div className={s.personalInfo}>
        <h5 className={s.name}>{value.full_name}</h5>
        <h6 className={s.additional}>{value.position_name}</h6>
      </div>
    </div>
  )
}

export default UserCard
