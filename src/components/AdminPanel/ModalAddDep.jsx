import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { useSelector } from 'react-redux'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddDep({ openAddDep, setOpenAddDep, setSelectedOrgId, handleAddDep }) {
  ModalAddDep.propTypes = {
    openAddDep: PropTypes.bool,
    setOpenAddDep: PropTypes.func,
    setSelectedOrgId: PropTypes.func,
    handleAddDep: PropTypes.func,
  }
  const organisationsList = useSelector((state) => state.orgList.organisations)
  const organisations = organisationsList.filter((org) => org.isDeleted === false)
  const handleSelectOrg = (e) => {
    const selectedOrgId = Number(e.target.value)
    setSelectedOrgId(selectedOrgId)
  }
  return (
    <div className={openAddDep ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Заведение нового отдела</h2>
          <CloseIcon onClick={() => setOpenAddDep(false)} />
        </div>
        <TextField label="Название отдела" inputProps={{ type: 'text' }} id="departmentName" />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor={organisations}>Наименование организации</label>
        <select className={s.big_select} id="organizationName" onChange={(e) => handleSelectOrg(e)}>
          {organisations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.organizationName}
            </option>
          ))}
        </select>
        <div>
          <button type="submit" onClick={handleAddDep}>
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddDep
