import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import TextField from './TextField'

import s from './modalStyle.module.scss'

function ModalAddPosition({
  openAddPos,
  setOpenAddPos,
  positionName,
  setPositionName,
  setDepartmentId,
  handleAddPosition,
}) {
  ModalAddPosition.propTypes = {
    openAddPos: PropTypes.bool,
    setOpenAddPos: PropTypes.func,
    positionName: PropTypes.string,
    setPositionName: PropTypes.func,
    setDepartmentId: PropTypes.func,
    handleAddPosition: PropTypes.func,
  }
  const departmentsList = useSelector((state) => state.depList.departments)
  const activeDepartments = departmentsList.filter((dep) => dep.isDeleted === false)
  const handleSelectDepartment = (e) => {
    const selectedDepartment = Number(e.target.value)
    setDepartmentId(selectedDepartment)
  }
  return (
    <div className={openAddPos ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Заведение новой должности</h2>
          <CloseIcon onClick={() => setOpenAddPos(false)} />
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
        <select
          className={s.big_select}
          id="departmentName"
          onChange={(e) => handleSelectDepartment(e)}
        >
          {activeDepartments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {`Отдел ${dep.departmentName} в ${dep.organization.organizationName}`}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" className={s.standartButton} onClick={handleAddPosition}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddPosition
