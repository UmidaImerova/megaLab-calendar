import React from 'react'
import moment from 'moment'
import 'moment/min/locales'
import s from './monthStyle.module.scss'

function MonthSheet(calendarValue) {
  /* localisation for labrary moment js */
  moment.locale('ru')
  /* recive data from parent as props */
  const value = calendarValue.calendarValue
  /* create calendar */
  /* шапка по дням недели */
  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
  /* В сетке месяца может быть максимально 6 недель по 7 дней = 42 элемента */
  /* start of calenndar */
  const startDay = value.clone().startOf('month').startOf('week')
  const day = startDay.clone().subtract(1, 'day')
  const daysArray = [...Array(42)].map(() => day.add(1, 'day').clone())
  const isCurrentDay = (day) => moment().isSame(day, 'day')
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
        {daysArray.map((dayItem) => (
          <div className={dayItem.day() === 6 || dayItem.day() === 0 ? s.weekend : s.day}>
            {isCurrentDay(dayItem) ? (
              <div className={s.currentDay}>{dayItem.format('D')}</div>
            ) : (
              dayItem.format('D')
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthSheet
