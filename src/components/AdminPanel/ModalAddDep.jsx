import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddDep({
  openAddDep,
  setOpenAddDep,
  setSelectedOrgId,
  departmentName,
  setDepartmentName,
  setHead,
  handleAddDep,
}) {
  ModalAddDep.propTypes = {
    openAddDep: PropTypes.bool,
    setOpenAddDep: PropTypes.func,
    setSelectedOrgId: PropTypes.func,
    departmentName: PropTypes.string,
    setDepartmentName: PropTypes.func,
    setHead: PropTypes.func,
    handleAddDep: PropTypes.func,
  }
  const organisationsList = useSelector((state) => state.orgList.organisations)
  const organisations = organisationsList.filter((org) => org.isDeleted === false)
  const allUsers = useSelector((state) => state.usersList.users)
  const activeUsers = allUsers.filter((user) => user.isDeleted === false)

  const handleSelectOrg = (e) => {
    const selectedOrgId = Number(e.target.value)
    setSelectedOrgId(selectedOrgId)
  }

  const handleAdmin = (e) => {
    const headId = Number(e.target.value)
    setHead(headId)
  }

  return (
    <div className={openAddDep ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Заведение нового отдела</h2>
          <CloseIcon onClick={() => setOpenAddDep(false)} />
        </div>
        <TextField
          label="Отдел"
          inputProps={{ type: 'text' }}
          id="departmentName"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={organisations}>Организация</label>
        <select className={s.big_select} id="organizationName" onChange={(e) => handleSelectOrg(e)}>
          {organisations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.organizationName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="positions">Руководитель</label>
        <select className={s.big_select} id="positions" onChange={(e) => handleAdmin(e)}>
          {activeUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" className={s.standartButton} onClick={handleAddDep}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddDep
