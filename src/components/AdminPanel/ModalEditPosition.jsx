import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import TextField from './TextField'

import s from './modalStyle.module.scss'

function ModalEditPosition({
  openEditPos,
  setOpenEditPos,
  positionName,
  setPositionName,
  departmentId,
  setDepartmentId,
  handleEditPosition,
}) {
  ModalEditPosition.propTypes = {
    openEditPos: PropTypes.bool,
    setOpenEditPos: PropTypes.func,
    positionName: PropTypes.string,
    setPositionName: PropTypes.func,
    departmentId: PropTypes.number,
    setDepartmentId: PropTypes.func,
    handleEditPosition: PropTypes.func,
  }
  const departmentsList = useSelector((state) => state.depList.departments)
  const activeDepartments = departmentsList.filter((dep) => dep.isDeleted === false)

  const handleSelectDepartment = (e) => {
    const selectedDepartment = Number(e.target.value)
    setDepartmentId(selectedDepartment)
  }
  return (
    <div className={openEditPos ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Редактирование должности</h2>
          <CloseIcon onClick={() => setOpenEditPos(false)} />
        </div>
        <TextField
          label="Должность"
          inputProps={{ type: 'text' }}
          id="positionName"
          value={positionName}
          onChange={(e) => setPositionName(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="departmentName">Отдел</label>
        <select className={s.big_select} id="departmentName" value={departmentId} disabled>
          {activeDepartments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {`Отдел ${dep.departmentName} в ${dep.organization.organizationName}`}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" onClick={handleEditPosition}>
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalEditPosition
