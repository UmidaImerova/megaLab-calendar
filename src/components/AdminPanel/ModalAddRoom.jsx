import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddRoom({
  openAddRoom,
  setOpenAddRoom,
  roomName,
  setRoomName,
  location,
  setLocation,
  roomCopasity,
  setRoomCopasity,
  isDashboardAvailable,
  setIsDashboardAvailable,
  isProjectorAvailable,
  setIsProjectorAvailable,
  isAcAvailable,
  setIsAcAvailable,
  addNewRoom,
}) {
  ModalAddRoom.propTypes = {
    openAddRoom: PropTypes.bool,
    setOpenAddRoom: PropTypes.func,
    roomName: PropTypes.string,
    setRoomName: PropTypes.func,
    location: PropTypes.string,
    setLocation: PropTypes.func,
    roomCopasity: PropTypes.number,
    setRoomCopasity: PropTypes.func,
    isDashboardAvailable: PropTypes.bool,
    setIsDashboardAvailable: PropTypes.func,
    isProjectorAvailable: PropTypes.bool,
    setIsProjectorAvailable: PropTypes.func,
    isAcAvailable: PropTypes.bool,
    setIsAcAvailable: PropTypes.func,
    addNewRoom: PropTypes.func,
  }
  return (
    <div className={openAddRoom ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Новая организация</h2>
          <CloseIcon onClick={() => setOpenAddRoom(false)} />
        </div>
        <TextField
          label="Наименование"
          inputProps={{ type: 'text' }}
          id="roomName"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <TextField
          label="Расположение"
          inputProps={{ type: 'text' }}
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Вместимость"
          inputProps={{ type: 'number' }}
          id="roomCapacity"
          value={roomCopasity}
          onChange={(e) => setRoomCopasity(e.target.value)}
        />
        <label htmlFor="isDashboardAvailable">
          Наличие доски
          <select
            name="isDashboardAvailable"
            id="isDashboardAvailable"
            value={isDashboardAvailable}
            onChange={(e) => setIsDashboardAvailable(e.target.value)}
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <label htmlFor="isProjectorAvailable">
          Наличие проектора
          <select
            name="isProjectorAvailable"
            id="isProjectorAvailable"
            value={isProjectorAvailable}
            onChange={(e) => setIsProjectorAvailable(e.target.value)}
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <label htmlFor="isAcAvailable">
          Наличие кондиционера
          <select
            name="isAcAvailable"
            id="isAcAvailable"
            value={isAcAvailable}
            onChange={(e) => setIsAcAvailable(e.target.value)}
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <label htmlFor="isRoomAvailable">
          Доступность
          <select name="isRoomAvailable" id="isRoomAvailable">
            <option value>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>

        <button type="submit" onClick={addNewRoom}>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default ModalAddRoom
