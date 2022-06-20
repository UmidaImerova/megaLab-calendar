import React from 'react'
import s from './logoStyle.module.scss'
import calendarIcon from './assets/Calendar.svg'

function Logo() {
  return (
    <div className={s.logoWrapper}>
      <img src={calendarIcon} alt="calendarIcon" />
      <span>Calendar</span>
    </div>
  )
}

export default Logo
