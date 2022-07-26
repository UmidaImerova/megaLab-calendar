import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddOrg({ openAddOrg, setOpenAddOrg }) {
  ModalAddOrg.propTypes = {
    openAddOrg: PropTypes.bool,
    setOpenAddOrg: PropTypes.func,
  }

  const [orgName, setOrgName] = useState({ name: '', id: '' })
  const handleAddOrg = () => {
    setOrgName({ name: '', id: '' })
    setOpenAddOrg(false)
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
          value={orgName.name}
          onChange={(e) => setOrgName({ ...orgName, name: e.target.value, id: uuidv4() })}
        />
        <button type="submit" onClick={handleAddOrg}>
          Добавить
        </button>
      </div>
    </div>
  )
}

export default ModalAddOrg
