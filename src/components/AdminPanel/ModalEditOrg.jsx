import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalEditOrg({
  openEditOrg,
  setOpenEditOrg,
  organizationName,
  setOrganizationName,
  setAdmin,
  editOrg,
}) {
  ModalEditOrg.propTypes = {
    openEditOrg: PropTypes.bool,
    setOpenEditOrg: PropTypes.func,
    organizationName: PropTypes.string,
    setOrganizationName: PropTypes.func,
    setAdmin: PropTypes.func,
    editOrg: PropTypes.func,
  }

  const allUsers = useSelector((state) => state.usersList.users)
  const activeUsers = allUsers.filter((user) => user.isDeleted === false)

  const handleAdmin = (e) => {
    const adminId = Number(e.target.value)
    setAdmin(adminId)
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
          id="organizationName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
        />
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor="positions">Администратор</label>
          <select className={s.big_select} id="positions" onChange={(e) => handleAdmin(e)}>
            {activeUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {`${user.firstName} ${user.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={s.standartButton} onClick={editOrg}>
          Изменить
        </button>
      </div>
    </div>
  )
}

export default ModalEditOrg
