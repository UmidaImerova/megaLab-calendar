import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/min/locales'
import { useDispatch } from 'react-redux'

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
import ModalAddTag from '../../components/Tags/ModalAddTag'
import ModalEditTag from '../../components/Tags/ModalEditTag'
import { getTagsListAsync } from './slicer/tagSlice'

function Profile() {
  /* localisation for labrary moment js */
  moment.locale('ru')
  /* calendar value */
  const [value, setValue] = useState(moment())
  const [hideInput, setHideInput] = useState(true)
  const [selectPeriod, setselectPeriod] = useState('day')
  const [showModal, setShowModal] = useState(false) /* модальное окно "СОздать новое событие" */
  const [openAddTag, setOpenAddTag] = useState(false) /* Модальное окно "Добавить метку" */
  const [openEditTag, setOpenEditTag] = useState(false) /* Модальное окно "Изменить метку" */
  const [selectedTagId, setSelectedTagId] = useState(0) /* ID выбранного тэга для редкатирования */
  const [selectedTagName, setSelectedTagName] = useState('')
  const [selectedTagColor, setSelectedTagColor] = useState('')
  const dispatch = useDispatch()
  /* recieve all tags from DB  */
  useEffect(() => {
    dispatch(getTagsListAsync())
  }, [])
  /* Условный рендеринг компонента сетки календаря */
  // eslint-disable-next-line react/no-unstable-nested-components
  function CalendarLayout() {
    if (selectPeriod === 'day') {
      return <DaySheet calendarValue={value} />
    }
    if (selectPeriod === 'week') {
      return <WeekSheet calendarValue={value} />
    }
    if (selectPeriod === 'month') {
      return <MonthSheet calendarValue={value} />
    }
  }
  /* unhide search input */
  const toggleIcon = () => {
    setHideInput(!hideInput)
  }
  /* open/close modal window Create new event */
  const handleModal = () => {
    setShowModal(!showModal)
  }
  /* define selected date */
  const pickedDate = value.format('LL')
  /* open current date */
  const handleTodayBtn = () => {
    const today = moment()
    setValue(today)
  }
  /* handle button previous and next period  */
  const handlePrevPeriod = () => {
    if (selectPeriod === 'day') {
      setValue((prev) => prev.clone().subtract(1, 'day'))
    }
    if (selectPeriod === 'week') {
      setValue((prev) => prev.clone().subtract(1, 'week'))
    }
    if (selectPeriod === 'month') {
      setValue((prev) => prev.clone().subtract(1, 'month'))
    }
  }
  const handleNextPeriod = () => {
    if (selectPeriod === 'day') {
      setValue((prev) => prev.clone().add(1, 'day'))
    }
    if (selectPeriod === 'week') {
      setValue((prev) => prev.clone().add(1, 'week'))
    }
    if (selectPeriod === 'month') {
      setValue((prev) => prev.clone().add(1, 'month'))
    }
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
            onChange={(newValue) => setValue(newValue)}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Tags
          setSelectedTagId={setSelectedTagId}
          setSelectedTagName={setSelectedTagName}
          setSelectedTagColor={setSelectedTagColor}
          setOpenEditTag={setOpenEditTag}
        />
      </div>
      <div className={s.header}>
        <div className={s.leftHeader}>
          <button type="button" className={s.todayBtn} onClick={handleTodayBtn}>
            Сегодня
          </button>
          <select
            className={s.selectPeriod}
            value={selectPeriod}
            onChange={(e) => setselectPeriod(e.target.value)}
          >
            <option value="day">День</option>
            <option value="week">Неделя</option>
            <option value="month">Месяц</option>
          </select>
          <div className={s.iconBtns}>
            <button type="button" className={s.itemBtn} onClick={handlePrevPeriod}>
              <img src={PrevItem} alt="previousItem" />
            </button>
            <button type="button" className={s.itemBtn} onClick={handleNextPeriod}>
              <img src={NextItem} alt="previousItem" />
            </button>
          </div>
          <div className={s.selectedPeriod}>
            <span>{pickedDate}</span>
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
      <ModalAddTag openAddTag={openAddTag} setOpenAddTag={setOpenAddTag} />
      <ModalEditTag
        openEditTag={openEditTag}
        setOpenEditTag={setOpenEditTag}
        selectedTagId={selectedTagId}
        setSelectedTagId={setSelectedTagId}
        selectedTagName={selectedTagName}
        setSelectedTagName={setSelectedTagName}
        selectedTagColor={selectedTagColor}
        setSelectedTagColor={setSelectedTagColor}
      />
    </div>
  )
}

export default Profile
