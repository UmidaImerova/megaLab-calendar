import React from 'react'
import moment from 'moment'
import 'moment/min/locales'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
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
  const allEvents = useSelector((state) => state.meetingList.meetings)

  return (
    <div className={s.month}>
      <div className={s.tableHeader}>
        {weekDays.map((day) => (
          <div className={s.headerItem} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={s.tableContent}>
        {daysArray.map((dayItem) => (
          <div key={uuidv4()}>
            <div className={dayItem.day() === 6 || dayItem.day() === 0 ? s.weekend : s.day}>
              {isCurrentDay(dayItem) ? (
                <div className={s.currentDay}>{dayItem.format('D')}</div>
              ) : (
                dayItem.format('D')
              )}
              <div className={s.eventWrapper}>
                {allEvents
                  .filter((event) => event.meetingDate === dayItem.format('YYYY-MM-DD'))
                  .map((event) => (
                    <li key={event.id}>{event.meeting.meetingTopic}</li>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MonthSheet
