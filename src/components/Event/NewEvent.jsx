import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers'
import CloseIcon from '@mui/icons-material/Close'
import s from './eventStyle.module.scss'

// eslint-disable-next-line react/prop-types
function CreateNewEvent({ showModal, setShowModal }) {
  const [dateValue, setDateValue] = useState(new Date())
  const [startTime, setStartTime] = useState(new Date('2018-01-01T00:00:00.000Z'))
  /*   const [endTime, setEndTime] = useState(new Date('2018-01-01T00:00:00.000Z')) */
  /*   const [selectValue, setSelectValue] = useState('notRepeat') */
  const [selectRoom, setSelectRoom] = useState('room1')
  const [selectTag, setSelectTag] = useState('smth')
  const [selectAccess, setSelectAccess] = useState('free')
  const [tagListVisibility, setTagListVisibility] = useState(false)

  /* toggle list of tags  */
  const toggleList = () => {
    setTagListVisibility(!tagListVisibility)
  }
  /* define tag of event */
  const handleTag = (e) => {
    setSelectTag(e.target.value)
  }

  return (
    <div className={showModal ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.event_header}>
          <h2>Новое событие</h2>
          <CloseIcon onClick={() => setShowModal(false)} />
        </div>
        <div className={s.event_name}>
          <h6>Название</h6>
          <input type="text" name="name" id="eventName" />
        </div>
        <div className={s.event_date}>
          <h6>Дата и время</h6>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="ru">
            <DatePicker
              disableFuture
              openTo="day"
              views={['day', 'month', 'year']}
              value={dateValue}
              onChange={(newValue) => {
                setDateValue(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
            <TimePicker
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue)
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          {/*           <select
            className={s.repeating_select}
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
          >
            <option value="notRepeat">Не повторять</option>
            <option value="repeat">Повторять</option>
          </select> */}
        </div>
        <div className={s.event_participants}>
          <h6>Участники (1)</h6>
          <div className={s.participant_list}>
            <div className={s.participant}>Someone</div>
            <input type="text" />
          </div>
        </div>
        <div className={s.event_room}>
          <h6>Помещение</h6>
          <select
            className={s.room_select}
            value={selectRoom}
            onChange={(e) => setSelectRoom(e.target.value)}
          >
            <option value="room1">Зал 1</option>
            <option value="room2">Зал 2</option>
            <option value="room3">Зал 3</option>
          </select>
        </div>
        <div className={s.tags_and_access}>
          <form>
            <h6>Календарь</h6>
            <div
              className={tagListVisibility ? s.list_visible : s.list_hidden}
              role="button"
              onClick={toggleList}
              onKeyDown={toggleList}
              tabIndex={0}
            >
              <span className={s.tagColor} />
              <div className={s.selectTitle}>{selectTag}</div>
              <div className={s.select_content}>
                <label htmlFor="singleSelect0" className={s.select_label}>
                  <input
                    id="singleSelect0"
                    className={s.select_input}
                    type="radio"
                    name="singleSelect"
                    tabIndex="0"
                    onClick={handleTag}
                    onKeyUp={handleTag}
                    value="Рабочий"
                  />
                  Рабочий
                </label>
                <label htmlFor="singleSelect1" className={s.select_label}>
                  <input
                    id="singleSelect1"
                    className={s.select_input}
                    type="radio"
                    name="singleSelect"
                    tabIndex="-1"
                    onClick={handleTag}
                    onKeyUp={handleTag}
                    value="Личный"
                  />
                  Личный
                </label>
              </div>
            </div>
          </form>
          <div className={s.event_access}>
            <h6>Разрешение на доступ к мероприятию</h6>
            <select
              className={s.access}
              value={selectAccess}
              onChange={(e) => setSelectAccess(e.target.value)}
            >
              <option value="free">Общедоступное</option>
              <option value="hide">Скрытое</option>
            </select>
          </div>
        </div>
        <button className={s.createBtn} type="submit">
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default CreateNewEvent
