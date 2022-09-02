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
  roomCapacity,
  setRoomCapacity,
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
    roomCapacity: PropTypes.number,
    setRoomCapacity: PropTypes.func,
    isDashboardAvailable: PropTypes.bool,
    setIsDashboardAvailable: PropTypes.func,
    isProjectorAvailable: PropTypes.bool,
    setIsProjectorAvailable: PropTypes.func,
    isAcAvailable: PropTypes.bool,
    setIsAcAvailable: PropTypes.func,
    addNewRoom: PropTypes.func,
  }

  const handleRoomCopacity = (e) => {
    const valueToNumber = Number(e.currentTarget.value)
    setRoomCapacity(valueToNumber)
  }

  return (
    <div className={openAddRoom ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Новая комната встреч</h2>
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
          inputProps={{ type: 'number', min: '0' }}
          id="roomCapacity"
          value={String(roomCapacity)}
          onChange={(e) => handleRoomCopacity(e)}
        />
        <label htmlFor="isDashboardAvailable">
          Наличие доски
          <select
            className={s.smallSelect}
            name="isDashboardAvailable"
            id="isDashboardAvailable"
            value={isDashboardAvailable}
            onChange={(e) => setIsDashboardAvailable(Boolean(e.target.value))}
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <label htmlFor="isProjectorAvailable">
          Наличие проектора
          <select
            className={s.smallSelect}
            name="isProjectorAvailable"
            id="isProjectorAvailable"
            value={isProjectorAvailable}
            onChange={(e) => setIsProjectorAvailable(Boolean(e.target.value))}
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <label htmlFor="isAcAvailable">
          Наличие кондиционера
          <select
            className={s.smallSelect}
            name="isAcAvailable"
            id="isAcAvailable"
            value={isAcAvailable}
            onChange={(e) => setIsAcAvailable(Boolean(e.target.value))}
          >
            {/* eslint-disable-next-line react/jsx-boolean-value */}
            <option value={true}>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <label htmlFor="isRoomAvailable">
          Доступность
          <select className={s.smallSelect} name="isRoomAvailable" id="isRoomAvailable">
            <option value>Да</option>
            <option value={false}>Нет</option>
          </select>
        </label>
        <button type="submit" className={s.standartButton} onClick={addNewRoom}>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default ModalAddRoom
