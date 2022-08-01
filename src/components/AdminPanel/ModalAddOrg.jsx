import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddOrg({ openAddOrg, setOpenAddOrg, orgName, setOrgName, handleAddNewOrg }) {
  ModalAddOrg.propTypes = {
    openAddOrg: PropTypes.bool,
    setOpenAddOrg: PropTypes.func,
    orgName: PropTypes.string,
    setOrgName: PropTypes.func,
    handleAddNewOrg: PropTypes.func,
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
          id="orgName"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <button type="submit" onClick={handleAddNewOrg}>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default ModalAddOrg
