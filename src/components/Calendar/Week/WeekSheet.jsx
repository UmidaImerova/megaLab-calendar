import React from 'react'
import style from './weekStyle.module.scss'
import clock from '../assets/clock_icon.svg'

function WeekSheet() {
  const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  const hours = []
  // eslint-disable-next-line no-plusplus
  for (let i = 9; i <= 18; i++) {
    hours.push(`${i}:00`)
  }
  return (
    <>
      <div className={style.table}>
        <div className={style.tableHeader}>
          <div className={style.headerItem}>
            <img src={clock} alt="clock" />
          </div>
          {days.map((day) => (
            <>
              <div className={style.headerItem}>{day}</div>
            </>
          ))}
        </div>
        <div className={style.tableContent}>
          {hours.map((hour) => (
            <>
              <div className={style.tableContentHours} key={hour}>
                {hour}
              </div>
              {days.map((day) => (
                <div className={style.tableContentEvent}> </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </>
  )
}

export default WeekSheet
