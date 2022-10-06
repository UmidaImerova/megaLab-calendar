import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Avatar, FormHelperText } from '@mui/material'

import s from './editUserStyle.module.scss'

function EditUserModal({
  openEditUser,
  setOpenEditUser,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  patronymic,
  setPatronymic,
  email,
  setEmail,
  password,
  setPassword,
}) {
  EditUserModal.propTypes = {
    openEditUser: PropTypes.bool,
    setOpenEditUser: PropTypes.func,
    firstName: PropTypes.string,
    setFirstName: PropTypes.func,
    lastName: PropTypes.string,
    setLastName: PropTypes.func,
    patronymic: PropTypes.string,
    setPatronymic: PropTypes.func,
    email: PropTypes.string,
    setEmail: PropTypes.func,
    password: PropTypes.string,
    setPassword: PropTypes.func,
  }

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState(false)
  const [passwordInputValue, setPasswordInputValue] = useState('')
  const [confirmPasswordInputValue, setconfirmPasswordInputValue] = useState('')
  const [isDisabledBtn, setDisabledBtn] = useState(true)

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
      setDisabledBtn(true)
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
      setDisabledBtn(true)
    } else {
      setErrorMsg('Пароли не совпадают')
    }
  }

  const handleEditUserInfo = () => {
    // eslint-disable-next-line no-console
    console.log('edit user')
  }
  return (
    <div className={openEditUser ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <h2>Редактирование профиля</h2>
          <CloseIcon onClick={() => setOpenEditUser(false)} />
        </div>
        <div className={s.photo}>
          <Avatar sx={{ width: 56, height: 56 }} />
          <button type="button">Изменить фото</button>
        </div>
        <div className={s.form}>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor={firstName}>Имя</label>
            <input
              className={s.small_input}
              type="text"
              id={firstName}
              value={firstName}
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
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email">Email</label>
            <input
              className={s.small_input}
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="departments">Отдел</label>
            <select className={s.small_select} id="departments" defaultValue={0}>
              <option value={0} disabled>
                Выберите отдел
              </option>
            </select>
          </div>
          <div className={s.input_box}>
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="positions">Должность</label>
            <select className={s.small_select} id="positions" defaultValue={0}>
              <option value={0} disabled>
                Выберите должность
              </option>
            </select>
          </div>
          <div className={s.password_box}>
            <label htmlFor="password">
              Пароль
              <div className={s.passwordWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={passwordInputValue}
                  onChange={(e) => handlePassword(e)}
                />
                <button className={s.iconBtn} type="button" onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </button>
              </div>
            </label>
          </div>
          <div className={s.password_box}>
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

          <div className={s.error_box}>
            <FormHelperText id="component-error-text" sx={{ color: 'error.main', fontSize: 14 }}>
              {errorMsg}
            </FormHelperText>
          </div>
        </div>
        <div>
          <button
            className={s.standartButton}
            type="button"
            // eslint-disable-next-line no-console
            onClick={handleEditUserInfo}
            disabled={isDisabledBtn}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditUserModal
