import React from 'react'
import style from './dayStyle.module.scss'
import clock from '../assets/clock_icon.svg'

function DaySheet(calendarValue) {
  const hours = []
  // eslint-disable-next-line no-plusplus
  for (let i = 9; i <= 18; i++) {
    hours.push(`${i}:00`)
  }
  const today = calendarValue.calendarValue.format('LL')

  return (
    <>
      <div className={style.table}>
        <div className={style.tableHeader}>
          <div className={style.headerItem}>
            <img src={clock} alt="clock" />
          </div>
          <div className={style.headerItem}>{today}</div>
        </div>
        <div className={style.tableContent}>
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div className={style.tableContentHours}>{hour}</div>
              <div className={style.tableContentEvent}>event</div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  )
}

export default DaySheet
