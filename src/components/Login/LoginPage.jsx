import React from 'react'
import style from './style.module.scss'
import calendar from './assets/Calendar.png'

function LoginPage() {
  return (
    <>
      <div className={style.left}>left</div>
      <div className={style.right}>
        <h1>Calendar</h1>
        <img src={calendar} alt="calendar" />
      </div>
    </>
  )
}

export default LoginPage
