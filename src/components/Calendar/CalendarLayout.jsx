import React from 'react'
import PropTypes from 'prop-types'
import DaySheet from './Day/DaySheet'
import WeekSheet from './Week/WeekSheet'
import MonthSheet from './Month/MonthSheet'

function CalendarLayout({ selectPeriod, calendarValue }) {
  CalendarLayout.propTypes = {
    selectPeriod: PropTypes.string,
    calendarValue: PropTypes.array,
  }
  /* Условный рендеринг компонента сетки календаря */
  if (selectPeriod === 'day') {
    return <DaySheet calendarValue={calendarValue} />
  }
  if (selectPeriod === 'week') {
    return <WeekSheet calendarValue={calendarValue} />
  }
  if (selectPeriod === 'month') {
    return <MonthSheet calendarValue={calendarValue} />
  }
}

export default CalendarLayout
