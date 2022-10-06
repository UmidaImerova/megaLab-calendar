import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import 'moment/min/locales'

import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DesktopDatePicker, DesktopTimePicker } from '@mui/x-date-pickers'
import CloseIcon from '@mui/icons-material/Close'
import AddBoxIcon from '@mui/icons-material/AddBox'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Chip from '@mui/material/Chip'
import Avatar from '@mui/material/Avatar'

import s from './eventStyle.module.scss'
import { addNewMeetengAsync } from '../../Pages/Profile/slicer/meetingSlice'

function CreateNewEvent({
  showModal,
  setShowModal,
  setOpenParticipant,
  selectedParticipants,
  setSelectedParticipants,
}) {
  CreateNewEvent.propTypes = {
    showModal: PropTypes.bool,
    setShowModal: PropTypes.func,
    setOpenParticipant: PropTypes.func,
    selectedParticipants: PropTypes.array,
    setSelectedParticipants: PropTypes.func,
  }
  /* localisation for labrary moment js */
  moment.locale('ru')
  const [eventName, setEventName] = useState('')
  const [dateValue, setDateValue] = useState(moment()) /* calendar value */
  const [startTime, setStartTime] = useState(moment().hours())
  const [endTime, setEndTime] = useState(moment().hours())
  const [selectRoom, setSelectRoom] = useState(0)
  const [selectTag, setSelectTag] = useState({
    labelColor: 'FFFFFF',
    labelName: 'Выберите метку',
    id: 0,
  })
  const [selectAccess, setSelectAccess] = useState(true)
  const [tagListVisibility, setTagListVisibility] = useState(false)
  const allTags = useSelector((state) => state.tagsList.tags)
  const allRooms = useSelector((state) => state.roomList.meetingrooms)
  const allUsers = useSelector((state) => state.usersList.users)
  const dispatch = useDispatch()
  /*
  TODO: clear window.moment = moment()
  */
  window.moment = moment()
  /* input value */
  const handleEventName = (e) => {
    setEventName(e.target.value)
  }
  /* close modal window */
  const handleClose = () => {
    setShowModal(false)
    setSelectTag({ labelColor: 'FFFFFF', labelName: 'Выберите метку' })
  }
  /* toggle list of tags  */
  const toggleList = () => {
    setTagListVisibility(!tagListVisibility)
  }
  /* define tag of event */
  const handleTag = (e) => {
    const selectedTagId = Number(e.currentTarget.value)
    const selectedTagData = allTags.filter((tag) => tag.id === selectedTagId)
    setSelectTag(selectedTagData[0])
    setTagListVisibility(false)
  }
  /* define room of event */
  const handleRoom = (e) => {
    setSelectRoom(Number(e.currentTarget.value))
  }
  /* open list of staff for adding participant */
  const handleOpenAddParticipant = () => {
    setOpenParticipant(true)
    setShowModal(false)
  }

  /* render participant */
  // eslint-disable-next-line react/no-unstable-nested-components
  function Participants() {
    const participants = allUsers.filter((item, i) => item.id === selectedParticipants[i])
    return (
      <div className={s.participantList}>
        {participants.map((user) => (
          <div className={s.badge} key={user.id}>
            <Chip
              variant="outlined"
              label={user.full_name}
              avatar={<Avatar alt={user.full_name} src={user.photo_path} />}
            />
          </div>
        ))}
      </div>
    )
  }
  const handleCreateEvent = () => {
    dispatch(
      addNewMeetengAsync({
        meetingAuthorId: 4,
        meetingTopic: eventName,
        meetingDates: [dateValue],
        meetingStartTime: startTime.hours(Number).format('HH:mm'),
        meetingEndTime: endTime.hours(Number).format('HH:mm'),
        roomId: selectRoom,
        participants: selectedParticipants,
        labelId: selectTag.id,
        isVisible: selectAccess,
        isRepeatable: false,
      }),
    )
    setShowModal(false)
  }
  return (
    <div className={showModal ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.event_header}>
          <h2>Новое событие</h2>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className={s.event_name}>
          <h6>Название</h6>
          <input
            type="text"
            name="name"
            id="eventName"
            value={eventName}
            onChange={(e) => handleEventName(e)}
          />
        </div>
        <div className={s.event_date}>
          <h6>Дата</h6>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
            <DesktopDatePicker
              views={['day']}
              openTo="day"
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue.format('YYYY-MM-DD'))
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </div>
        <div className={s.event_time}>
          <h6>Время</h6>
          <div>
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
              <div className={s.time_wrapper}>
                <div className={s.time_conteiner}>
                  <DesktopTimePicker
                    value={startTime}
                    onChange={(newValue) => setStartTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
                <div className={s.time_conteiner}>
                  <DesktopTimePicker
                    value={endTime}
                    onChange={(newValue) => setEndTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </div>
            </LocalizationProvider>
          </div>
        </div>
        <div className={s.event_participants}>
          <div className={s.participants_header}>
            <h6>Участники</h6>
            <AddBoxIcon color="primary" onClick={handleOpenAddParticipant} />
          </div>
          <div>{selectedParticipants.length ? <Participants /> : ''}</div>
        </div>
        <div className={s.event_room}>
          <h6>Помещение</h6>
          <select className={s.room_select} onChange={(e) => handleRoom(e)}>
            {allRooms.map((room) => (
              <option key={room.id} value={room.id}>
                {room.roomName}
              </option>
            ))}
          </select>
        </div>
        <div className={s.tags_and_access}>
          <div className={s.event_tags}>
            <h6>Календарь</h6>
            <div className={s.tags}>
              <span className={s.tagColor} style={{ background: `${selectTag.labelColor}` }} />
              <div className={s.selectTitle}>{selectTag.labelName}</div>
              <button type="button" className={s.expandMoreIcon} onClick={toggleList}>
                <ExpandMoreIcon />
              </button>
            </div>
            <div className={tagListVisibility ? s.list_visible : s.list_hidden}>
              <ul>
                {allTags.map((tag) => (
                  <li key={tag.id}>
                    <button
                      type="button"
                      className={s.tagBtn}
                      value={tag.id}
                      onClick={(e) => handleTag(e)}
                    >
                      <span className={s.tagColor} style={{ background: `${tag.labelColor}` }} />
                      <span className={s.selectTitle}>{tag.labelName}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={s.event_access}>
            <h6>Разрешение на доступ к мероприятию</h6>
            <select className={s.access} onChange={(e) => setSelectAccess(Boolean(e.target.value))}>
              <option value="true">Общедоступное</option>
              <option value="false">Скрытое</option>
            </select>
          </div>
          <button className={s.createBtn} type="submit" onClick={handleCreateEvent}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateNewEvent
