import React from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalEditOrg({ openEditOrg, setOpenEditOrg, orgName, setOrgName, editOrg }) {
  ModalEditOrg.propTypes = {
    openEditOrg: PropTypes.bool,
    setOpenEditOrg: PropTypes.func,
    orgName: PropTypes.string,
    setOrgName: PropTypes.func,
    editOrg: PropTypes.func,
  }
  return (
    <div className={openEditOrg ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Изменить организацию</h2>
          <CloseIcon onClick={() => setOpenEditOrg(false)} />
        </div>
        <TextField
          label="Название организации"
          inputProps={{ type: 'text' }}
          id="orgName"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
        <button type="submit" onClick={editOrg}>
          Изменить
        </button>
      </div>
    </div>
  )
}

export default ModalEditOrg
