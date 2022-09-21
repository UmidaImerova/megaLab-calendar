import React from 'react'
import PropTypes from 'prop-types'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'

import s from './cardStyle.module.scss'

function RoomCard({ value }) {
  RoomCard.propTypes = {
    value: PropTypes.object,
  }

  return (
    <div className={s.roomInfo}>
      <h4 className={s.name}>{value.roomName}</h4>
      <div className={s.additional}>
        <PersonOutlineIcon color="action" fontSize="small" />
        <span>{`Вместимость: ${value.roomCapacity}`}</span>
      </div>
      <div className={s.additional}>
        <LocationOnIcon color="action" fontSize="small" />
        <span>{`Расположение: ${value.location}`}</span>
      </div>
      <div className={s.additional}>
        {value.isDashboardAvailable ? <span>Маркерная доска</span> : <span> </span>}
        {value.isProjectorAvailable ? <span>Проектор</span> : <span> </span>}
        {value.isAcAvailable ? <span>Кондиционер</span> : <span> </span>}
      </div>
    </div>
  )
}

export default RoomCard
