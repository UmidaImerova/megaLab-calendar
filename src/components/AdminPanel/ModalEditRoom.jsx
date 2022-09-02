import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalEditRoom({
  openEditRoom,
  setOpenEditRoom,
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
  editRoom,
}) {
  ModalEditRoom.propTypes = {
    openEditRoom: PropTypes.bool,
    setOpenEditRoom: PropTypes.func,
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
    editRoom: PropTypes.func,
  }

  const handleRoomCopacity = (e) => {
    const valueToNumber = Number(e.currentTarget.value)
    setRoomCapacity(valueToNumber)
  }

  const handleDashboard = (e) => {
    const valueToBool = Boolean(e.target.value)
    setIsDashboardAvailable(valueToBool)
  }

  return (
    <div className={openEditRoom ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Редактирование </h2>
          <CloseIcon onClick={() => setOpenEditRoom(false)} />
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
          inputProps={{ type: 'text', min: '0' }}
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <TextField
          label="Вместимость"
          inputProps={{ type: 'number' }}
          id="roomCapacity"
          value={String(roomCapacity)}
          onChange={(e) => handleRoomCopacity(e)}
        />
        <label htmlFor="isDashboardAvailable">
          Наличие доски
          <select
            name="isDashboardAvailable"
            id="isDashboardAvailable"
            value={isDashboardAvailable}
            onChange={(e) => handleDashboard(e)}
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

        <button type="submit" className={s.standartButton} onClick={editRoom}>
          Сохранить
        </button>
      </div>
    </div>
  )
}

export default ModalEditRoom
