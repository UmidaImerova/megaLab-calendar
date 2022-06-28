import React, { useState } from 'react'
import { Button, Avatar, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import s from './profileStyle.module.scss'
import Logo from '../../components/Logo/Logo'
import Tags from '../../components/Tags/Tags'
import PrevItem from './assets/prevItem_icon.svg'
import NextItem from './assets/nextItem_icon.svg'
import SearchIcon from './assets/search_icon.svg'
import AlarmIcon from './assets/alarm_icon.svg'
import CloseIcon from './assets/close_icon.svg'

function Profile() {
  const [value, setValue] = useState(new Date())
  const [hideInput, setHideInput] = useState(true)

  /* unhide search input */
  const toggleIcon = () => {
    setHideInput(!hideInput)
  }

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
          >
            Создать
          </Button>
        </div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
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
          <select className={s.selectPeriod}>
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
            <span>27 июня 2022 Monday</span>
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
      <div className={s.content}>Content</div>
    </div>
  )
}

export default Profile
