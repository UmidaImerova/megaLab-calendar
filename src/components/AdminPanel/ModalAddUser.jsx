/* eslint-disable operator-linebreak */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormHelperText } from '@mui/material'
import { useSelector } from 'react-redux'
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
  selectedOrgId,
  setSelectedOrgId,
  selectedDepId,
  setSelectedDepId,
  selectedPositionId,
  setSelectedPositionId,
  selectedRoleId,
  setSelectedRoleId,
  password,
  setPassword,
  handleAddUser,
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
    selectedOrgId: PropTypes.number,
    setSelectedOrgId: PropTypes.func,
    selectedDepId: PropTypes.number,
    setSelectedDepId: PropTypes.func,
    selectedPositionId: PropTypes.number,
    setSelectedPositionId: PropTypes.func,
    selectedRoleId: PropTypes.number,
    setSelectedRoleId: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func,
    handleAddUser: PropTypes.func,
  }
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [passwordInputValue, setPasswordInputValue] = useState('')
  const [confirmPasswordInputValue, setconfirmPasswordInputValue] = useState('')
  const [isDisabledBtn, setDisabledBtn] = useState(true)

  const organisationsList = useSelector((state) => state.orgList.organisations)
  const organisations = organisationsList.filter((org) => org.isDeleted === false)

  const departmentsList = useSelector((state) => state.depList.departments)
  const activeDepartments = departmentsList.filter(
    (dep) => dep.isDeleted === false && dep.organization.id === selectedOrgId,
  )
  const allPOsition = useSelector((state) => state.positionList.positions)
  const activePositions = allPOsition.filter(
    (item) => item.isDeleted === false && item.department.id === selectedDepId,
  )
  /* валидация заполнения всех полей формы */
  const checkParams = () => {
    // eslint-disable-next-line no-console
    console.log('check')
    if (
      firstName.trim().length &&
      lastName.trim().length &&
      phoneNum.trim().length &&
      email.trim().length &&
      password.trim().length &&
      (selectedOrgId && selectedDepId && selectedPositionId && selectedRoleId) > 0
    ) {
      setDisabledBtn(false)
    }
  }
  /* filling the form */
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
  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }
  /* set password */
  const handlePassword = (e) => {
    const inputValue = e.target.value
    setPasswordInputValue(inputValue)
    if (confirmPasswordInputValue === inputValue) {
      setPassword(inputValue)
      setErrorMsg('')
    } else {
      setErrorMsg('Пароли не совпадают')
    }
  }
  const handleConfirmPass = (e) => {
    const inputValue = e.target.value
    setconfirmPasswordInputValue(inputValue)
    if (passwordInputValue === inputValue) {
      setPassword(inputValue)
      setErrorMsg('')
    } else {
      setErrorMsg('Пароли не совпадают')
    }
  }

  return (
    <div className={openAddUser ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Заведение нового пользователя</h2>
          <CloseIcon onClick={() => setOpenAddUser(false)} />
        </div>
        <div className={s.body_box}>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={firstName}>Имя</label>
            <input
              className={s.small_input}
              type="text"
              id={firstName}
              value={firstName}
              onKeyUp={checkParams}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="lastName">Фамилия</label>
            <input
              className={s.small_input}
              type="text"
              id="lastName"
              value={lastName}
              onKeyUp={checkParams}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="patronymic">Отчество</label>
            <input
              className={s.small_input}
              type="text"
              id="patronymic"
              value={patronymic}
              onChange={(e) => setPatronymic(e.target.value)}
            />
          </div>
        </div>
        <div className={s.body_box}>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="msisdn">Номер телефона</label>
            <input
              className={s.small_input}
              type="text"
              id="msisdn"
              value={phoneNum}
              onKeyUp={checkParams}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">Email</label>
            <input
              className={s.small_input}
              type="text"
              id="email"
              value={email}
              onKeyUp={checkParams}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={s.body_box}>
          <div className={s.input_box}>
            <label htmlFor="password">
              Пароль
              <div className={s.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={passwordInputValue}
                  onKeyUp={checkParams}
                  onChange={(e) => handlePassword(e)}
                />
                <button className={s.iconBtn} type="button" onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </label>
          </div>
          <div className={s.input_box}>
            <label htmlFor="confirmPassword">
              Подтвердите пароль
              <div className={s.passwordWrapper}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPasswordInputValue}
                  onChange={(e) => handleConfirmPass(e)}
                />
                <button className={s.iconBtn} type="button" onClick={handleShowConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </label>
          </div>
        </div>
        <div className={s.error_box}>
          <FormHelperText id="component-error-text" sx={{ color: 'error.main', fontSize: 14 }}>
            {errorMsg}
          </FormHelperText>
        </div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="organizationName">Организация</label>
        <select
          className={s.big_select}
          id="organizationName"
          defaultValue={0}
          onChange={(e) => handleSelectOrg(e)}
          onClick={checkParams}
        >
          <option value={0} disabled>
            Выберите организацию
          </option>
          {organisations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.organizationName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="departments">Отдел</label>
        <select
          className={s.big_select}
          id="departments"
          defaultValue={0}
          onClick={checkParams}
          onChange={(e) => handleSelectDep(e)}
        >
          <option value={0} disabled>
            Выберите отдел
          </option>
          {activeDepartments.map((dep) => (
            <option key={dep.id} value={dep.id} onClick={checkParams}>
              {dep.departmentName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="positions">Должность</label>
        <select
          className={s.big_select}
          id="positions"
          defaultValue={0}
          onClick={checkParams}
          onChange={(e) => handleSelectPosition(e)}
        >
          <option value={0} disabled>
            Выберите должность
          </option>
          {activePositions.map((pos) => (
            <option key={pos.id} value={pos.id} onClick={checkParams}>
              {pos.positionName}
            </option>
          ))}
        </select>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="role">Роль</label>
        <select
          className={s.big_select}
          id="role"
          defaultValue={0}
          onClick={checkParams}
          onChange={(e) => handleSelectRole(e)}
        >
          <option value={0} disabled>
            Выберите роль
          </option>
          <option value={1} onClick={checkParams}>
            Пользователь
          </option>
          <option value={2} onClick={checkParams}>
            Админ
          </option>
        </select>
        <div>
          <button
            className={s.standartButton}
            type="submit"
            onClick={handleAddUser}
            disabled={isDisabledBtn}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalAddUser
