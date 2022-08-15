import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import TextField from './TextField'
import s from './modalStyle.module.scss'

function ModalAddUser({
  openAddUser,
  setOpenAddUser,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  patronymic,
  setPatronymic,
  phoneNum,
  setPhoneNum,
  email,
  setEmail,
  setSelectedOrgId,
  setSelectedDepId,
  setSelectedPositionId,
  setSelectedRoleId,
  password,
  setPassword,
}) {
  ModalAddUser.propTypes = {
    openAddUser: PropTypes.bool,
    setOpenAddUser: PropTypes.func,
    firstName: PropTypes.string,
    setFirstName: PropTypes.func,
    lastName: PropTypes.string,
    setLastName: PropTypes.func,
    patronymic: PropTypes.string,
    setPatronymic: PropTypes.func,
    phoneNum: PropTypes.string,
    setPhoneNum: PropTypes.func,
    email: PropTypes.string,
    setEmail: PropTypes.func,
    setSelectedOrgId: PropTypes.func,
    setSelectedDepId: PropTypes.func,
    setSelectedPositionId: PropTypes.func,
    setSelectedRoleId: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func,
  }
  const [showPassword, setShowPassword] = useState(false)

  const organisationsList = useSelector((state) => state.orgList.organisations)
  const organisations = organisationsList.filter((org) => org.isDeleted === false)
  const departmentsList = useSelector((state) => state.depList.departments)
  const activeDepartments = departmentsList.filter((dep) => dep.isDeleted === false)
  const allPOsition = useSelector((state) => state.positionList.positions)
  const activePositions = allPOsition.filter((item) => item.isDeleted === false)

  const handleSelectOrg = (e) => {
    const selectedOrgId = Number(e.target.value)
    setSelectedOrgId(selectedOrgId)
  }

  const handleSelectDep = (e) => {
    const selectedDepId = Number(e.target.value)
    setSelectedDepId(selectedDepId)
  }

  const handleSelectPosition = (e) => {
    const selectedPositionId = Number(e.target.value)
    setSelectedPositionId(selectedPositionId)
  }

  const handleSelectRole = (e) => {
    const selectedRoleId = Number(e.target.value)
    setSelectedRoleId(selectedRoleId)
  }
  /* show/hide password */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <div className={openAddUser ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Заведение нового отдела</h2>
          <CloseIcon onClick={() => setOpenAddUser(false)} />
        </div>
        <TextField
          label="Имя"
          inputProps={{ type: 'text' }}
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextField
          label="Фамилия"
          inputProps={{ type: 'text' }}
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <TextField
          label="Отчество"
          inputProps={{ type: 'text' }}
          id="lastName"
          value={patronymic}
          onChange={(e) => setPatronymic(e.target.value)}
        />
        <TextField
          label="Номер телефона"
          inputProps={{ type: 'text' }}
          id="msisdn"
          value={phoneNum}
          onChange={(e) => setPhoneNum(e.target.value)}
        />
        <TextField
          label="email"
          inputProps={{ type: 'text' }}
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="organizationName">Наименование организации</label>
        <select className={s.big_select} id="organizationName" onChange={(e) => handleSelectOrg(e)}>
          {organisations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.organizationName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="departments">Наименование организации</label>
        <select className={s.big_select} id="departments" onChange={(e) => handleSelectDep(e)}>
          {activeDepartments.map((dep) => (
            <option key={dep.id} value={dep.id}>
              {dep.departmentName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="positions">Наименование организации</label>
        <select className={s.big_select} id="positions" onChange={(e) => handleSelectPosition(e)}>
          {activePositions.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.positionName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="role">Наименование организации</label>
        <select className={s.big_select} id="role" onChange={(e) => handleSelectRole(e)}>
          <option value={1}>Пользователь</option>
          <option value={2}>Админ</option>
        </select>
        <label htmlFor="password">
          Пароль
          <div className={s.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={s.iconBtn} type="button" onClick={handleClickShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>
        </label>
        <div>
          <button type="submit">Добавить</button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddUser
