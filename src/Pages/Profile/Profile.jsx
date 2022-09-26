import React, { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/min/locales'
import { useDispatch } from 'react-redux'

import { Button, Avatar } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import Logo from '../../components/Logo/Logo'
import Tags from '../../components/Tags/Tags'
import CreateNewEvent from '../../components/Event/NewEvent'
import CalendarLayout from '../../components/Calendar/CalendarLayout'
import ModalAddTag from '../../components/Tags/ModalAddTag'
import ModalEditTag from '../../components/Tags/ModalEditTag'
import SearchModal from '../../components/SearchMenu/SearchModal'
import UserInfo from '../../components/UserInfo/UserInfo'
import EditUserModal from '../../components/UserInfo/EditUserModal'
import PrevItem from './assets/prevItem_icon.svg'
import NextItem from './assets/nextItem_icon.svg'
import SearchIcon from './assets/search_icon.svg'
import AlarmIcon from './assets/alarm_icon.svg'
import { getTagsListAsync } from './slicer/tagSlice'
import s from './profileStyle.module.scss'

function Profile() {
  /* localisation for labrary moment js */
  moment.locale('ru')

  const [value, setValue] = useState(moment()) /* calendar value */
  const [selectPeriod, setselectPeriod] = useState('day')
  const [openSearchMenu, setOpenSearchMenu] = useState(false)
  const [showModal, setShowModal] = useState(false) /* модальное окно "СОздать новое событие" */
  const [openAddTag, setOpenAddTag] = useState(false) /* Модальное окно "Добавить метку" */
  const [openEditTag, setOpenEditTag] = useState(false) /* Модальное окно "Изменить метку" */
  const [selectedTagId, setSelectedTagId] = useState(0) /* ID выбранного тэга для редкатирования */
  const [openUserInfo, setOpenUserInfo] = useState(false) /* модальное окно инфо о юзере */
  const [openEditUser, setOpenEditUser] = useState(false) /* редак-е инфо о юзере */
  const [firstName, setFirstName] = useState('') /* имя юзера */
  const [lastName, setLastName] = useState('') /* фамилия юзера */
  const [patronymic, setPatronymic] = useState('') /* отчество юзера */
  const [email, setEmail] = useState('') /* эл. почта юзера */
  const [password, setPassword] = useState('') /* пароль юзера */
  const [selectedTagName, setSelectedTagName] = useState('') /* выбранная метка -имя */
  const [selectedTagColor, setSelectedTagColor] = useState('') /* выбранная метка - id */
  const dispatch = useDispatch()
  /* recieve all user tags from DB  */
  /*
  ! userID passed as data fot method
   */
  useEffect(() => {
    dispatch(getTagsListAsync(4))
  }, [])

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
  /* open modal window for adding tag */
  const handleOpenAddTag = () => {
    setOpenAddTag(true)
  }
  /* modal window for serach menu */
  const handleOpenSearchMenu = () => {
    setOpenSearchMenu(!openSearchMenu)
  }
  /* modal window for user info */
  const handleClickAvatar = () => {
    setOpenUserInfo(!openUserInfo)
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
          handleOpenAddTag={handleOpenAddTag}
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
            <button type="button" onClick={handleOpenSearchMenu}>
              <img src={SearchIcon} alt="search_icon" />
            </button>
          </div>
          <div className={s.notification}>
            <button type="button">
              <img src={AlarmIcon} alt="alarm_icon" />
            </button>
          </div>
          <div className={s.profileAvatar}>
            <Avatar
              sx={{ width: 32, height: 32, display: 'inline-flex' }}
              alt="Remy Sharp"
              src="/broken-image.jpg"
              onClick={handleClickAvatar}
            />
          </div>
        </div>
      </div>
      <div className={s.content}>
        <CalendarLayout selectPeriod={selectPeriod} calendarValue={value} />
      </div>
      {/* block for modal window */}
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
      <SearchModal openSearchMenu={openSearchMenu} setOpenSearchMenu={setOpenSearchMenu} />
      <UserInfo
        openUserInfo={openUserInfo}
        setOpenUserInfo={setOpenUserInfo}
        setOpenEditUser={setOpenEditUser}
      />
      <EditUserModal
        openEditUser={openEditUser}
        setOpenEditUser={setOpenEditUser}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        patronymic={patronymic}
        sePatronymic={setPatronymic}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
      />
    </div>
  )
}

export default Profile
