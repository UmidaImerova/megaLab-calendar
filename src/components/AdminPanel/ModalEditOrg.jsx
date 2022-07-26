import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalEditOrg({ openEditOrg, setOpenEditOrg }) {
  ModalEditOrg.propTypes = {
    openEditOrg: PropTypes.bool,
    setOpenEditOrg: PropTypes.func,
  }

  const [orgName, setOrgName] = useState({ name: '', id: '' })
  const handleEditOrg = () => {
    setOrgName({ name: '', id: '' })
    setOpenEditOrg(false)
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
          value={orgName.name}
          onChange={(e) => setOrgName({ ...orgName, name: e.target.value, id: uuidv4() })}
        />
        <button type="submit" onClick={handleEditOrg}>
          Изменить
        </button>
      </div>
    </div>
  )
}

export default ModalEditOrg
