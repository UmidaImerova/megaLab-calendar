import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalEditDep({
  openEditDep,
  setOpenEditDep,
  departmentName,
  setDepartmentName,
  head,
  setHead,
  handleEditDep,
}) {
  ModalEditDep.propTypes = {
    openEditDep: PropTypes.bool,
    setOpenEditDep: PropTypes.func,
    departmentName: PropTypes.string,
    setDepartmentName: PropTypes.func,
    head: PropTypes.number,
    setHead: PropTypes.func,
    handleEditDep: PropTypes.func,
  }
  const allUsers = useSelector((state) => state.usersList.users)
  const activeUsers = allUsers.filter((user) => user.isDeleted === false)

  const handleAdmin = (e) => {
    const headId = Number(e.target.value)
    setHead(headId)
  }

  return (
    <div className={openEditDep ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Редактирование отдела</h2>
          <CloseIcon onClick={() => setOpenEditDep(false)} />
        </div>
        <TextField
          label="Отдел"
          inputProps={{ type: 'text' }}
          id="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="headOfDep">Руководитель</label>
        <select
          className={s.big_select}
          id="headOfDep"
          value={head}
          onChange={(e) => handleAdmin(e)}
        >
          {activeUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" className={s.standartButton} onClick={handleEditDep}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalEditDep
