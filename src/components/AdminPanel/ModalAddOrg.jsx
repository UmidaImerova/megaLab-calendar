import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddOrg({
  openAddOrg,
  setOpenAddOrg,
  organizationName,
  setOrganizationName,
  admin,
  setAdmin,
  handleAddNewOrg,
}) {
  ModalAddOrg.propTypes = {
    openAddOrg: PropTypes.bool,
    setOpenAddOrg: PropTypes.func,
    organizationName: PropTypes.string,
    setOrganizationName: PropTypes.func,
    admin: PropTypes.number,
    setAdmin: PropTypes.func,
    handleAddNewOrg: PropTypes.func,
  }

  const handleAdmin = (e) => {
    const adminId = Number(e.currentTarget.value)
    setAdmin(adminId)
  }
  return (
    <div className={openAddOrg ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Новая организация</h2>
          <CloseIcon onClick={() => setOpenAddOrg(false)} />
        </div>
        <TextField
          label="Название организации"
          inputProps={{ type: 'text' }}
          id="organizationName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
        <TextField
          label="Администратор"
          inputProps={{ type: 'number' }}
          id="admin"
          value={admin}
          onChange={(e) => handleAdmin(e)}
        />
        <button type="submit" onClick={handleAddNewOrg}>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default ModalAddOrg
