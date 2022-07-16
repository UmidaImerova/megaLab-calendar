import React from 'react'
import moment from 'moment'
import 'moment/min/locales'
import s from './monthStyle.module.scss'

function MonthSheet() {
  /* localisation for labrary moment js */
  moment.locale('ru')
  /* start of calenndar */
  const startDay = moment().startOf('month').startOf('week')
  /* end of calendar */
  const endDay = moment().endOf('month').endOf('week')
  /* create calendar */
  /* шапка по дням недели */
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

  /* В сетке месяца может быть максимально 6 недель по 7 дней = 42 элемента */
  const totalDay = 42
  const daysArray = [...Array(42)]

  const calendar = []
  const day = startDay.clone()
  while (!day.isAfter(endDay)) {
    calendar.push(day.clone())
    day.add(1, 'day')
  }
  window.moment = moment()
  window.startDay = startDay
  window.endDay = endDay

  return (
    <div className={s.month}>
      <div className={s.tableHeader}>
        {weekDays.map((day) => (
          <>
            <div className={s.headerItem}>{day}</div>
          </>
        ))}
      </div>
      <div className={s.tableContent}>
        {daysArray.map((_, i) => (
          <div className={s.day}>{i}</div>
        ))}
      </div>
    </div>
  )
}

export default MonthSheet
