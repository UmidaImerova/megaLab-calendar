import React, { useState } from 'react'
import moment from 'moment'
import 'moment/min/locales'
import { Button, Avatar } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import s from './profileStyle.module.scss'
import Logo from '../../components/Logo/Logo'
import Tags from '../../components/Tags/Tags'
import CreateNewEvent from '../../components/Event/NewEvent'
import DaySheet from '../../components/Calendar/Day/DaySheet'
import WeekSheet from '../../components/Calendar/Week/WeekSheet'
import MonthSheet from '../../components/Calendar/Month/MonthSheet'
import PrevItem from './assets/prevItem_icon.svg'
import NextItem from './assets/nextItem_icon.svg'
import SearchIcon from './assets/search_icon.svg'
import AlarmIcon from './assets/alarm_icon.svg'
import CloseIcon from './assets/close_icon.svg'

function Profile() {
  /* localisation for labrary moment js */
  moment.locale('ru')
  /* calendar value */
  const [value, setValue] = useState(moment())
  const [hideInput, setHideInput] = useState(true)
  const [selectValue, setSelectValue] = useState('day')
  const [showModal, setShowModal] = useState(true)

  /* Условный рендеринг компонента сетки календаря */
  // eslint-disable-next-line react/no-unstable-nested-components
  function CalendarLayout() {
    if (selectValue === 'day') {
      return <DaySheet calendarValue={value} />
    }
    if (selectValue === 'week') {
      return <WeekSheet calendarValue={value} />
    }
    if (selectValue === 'month') {
      return <MonthSheet calendarValue={value} />
    }
  }
  /* unhide search input */
  const toggleIcon = () => {
    setHideInput(!hideInput)
  }
  /* open/close modal window */
  const handleModal = () => {
    setShowModal(!showModal)
  }
  /* define selected date */
  const today = value.format('LL')

  return (
    <div className={s.profileWrapper}>
      <div className={s.sidebar}>
        <Logo />
        <div className={s.newEvenetBtn}>
          <Button
            variant="outlined"
            sx={{
              width: 180,
              height: '40',
              margin: 2,
              border: '1px solid #4B84F4',
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 16,
              fontFamily: 'Roboto',
            }}
            onClick={handleModal}
          >
            Создать
          </Button>
        </div>
        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            orientation="portrait"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Tags />
      </div>
      <div className={s.header}>
        <div className={s.leftHeader}>
          <button type="button" className={s.todayBtn}>
            Сегодня
          </button>
          <select
            className={s.selectPeriod}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="day">День</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
          </select>
          <div className={s.iconBtns}>
            <button type="button" className={s.itemBtn}>
              <img src={PrevItem} alt="previousItem" />
            </button>
            <button type="button" className={s.itemBtn}>
              <img src={NextItem} alt="previousItem" />
            </button>
          </div>
          <div className={s.selectedPeriod}>
            <span>{today}</span>
          </div>
        </div>
        <div className={s.rightHeader}>
          <div className={s.searchInput}>
            <label htmlFor="serchInput">
              <input type={hideInput ? 'hidden' : 'text'} name="serach" id="serchInput" />
              <button type="button" onClick={toggleIcon}>
                <img src={hideInput ? SearchIcon : CloseIcon} alt="search_icon" />
              </button>
            </label>
          </div>
          <div className={s.notification}>
            <button type="button">
              <img src={AlarmIcon} alt="alarm_icon" />
            </button>
          </div>
          <Avatar
            sx={{ width: 32, height: 32, display: 'inline-flex' }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
          />
        </div>
      </div>
      <div className={s.content}>
        <CalendarLayout calendarValue={value} />
      </div>
      <CreateNewEvent showModal={showModal} setShowModal={setShowModal} />
    </div>
  )
}

export default Profile
