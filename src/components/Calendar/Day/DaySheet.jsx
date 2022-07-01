import React from 'react'
import style from './dayStyle.module.scss'
import clock from '../assets/clock_icon.svg'

function DaySheet() {
  const hours = []
  // eslint-disable-next-line no-plusplus
  for (let i = 9; i <= 18; i++) {
    hours.push(i)
  }

  return (
    <>
      <div className={style.table}>
        <div className={style.headerItem}>
          <img src={clock} alt="clock" />
        </div>
        <div className={style.headerItem}>today</div>
        {hours.map((hour) => (
          <>
            <div className={style.tableContentHours} key={hour}>
              {hour}
            </div>
            <div className={style.tableContentEvent} key={hour}>
              event
            </div>
          </>
        ))}
      </div>
    </>
  )
}

export default DaySheet
