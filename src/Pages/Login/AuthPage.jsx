import React, { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import style from './LoginPageStyle.module.scss'
import calendar from './assets/Calendar.png'

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isDisabledBtn, setDisabledBtn] = useState(true)
  /* admin user */
  const admin = {
    login: 'ddd@mail.ru',
    password: '111',
  }
  /* form control */
  function handleSubmit(e) {
    e.preventDefault()
  }

  /* set email */
  const handleEmail = (e) => {
    const enterEmail = e.target.value
    setEmail(enterEmail)
    if (email && password !== '') {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }

  /* set password */
  const handlePassword = (e) => {
    const enterPass = e.target.value
    setPassword(enterPass)
    if (email && password !== '') {
      setDisabledBtn(false)
    } else {
      setDisabledBtn(true)
    }
  }

  /* show/hide password */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  /* send info to server */
  const navigate = useNavigate()
  const confirmBtn = (event) => {
    event.preventDefault()
    if (email === admin.login && password === admin.password) {
      navigate('/admin', { replace: true })
    } else {
      // eslint-disable-next-line no-console
      console.log({ email }, { password })
    }
  }

  return (
    <>
      <div className={style.left}>
        <div className={style.leftContent}>
          <h1>Вход</h1>
          <div className={style.personalForm}>
            <form onSubmit={handleSubmit}>
              {/* e-mail */}
              <label htmlFor="email">
                E-mail
                <div className={style.input}>
                  <input type="email" id="email" value={email} onChange={(e) => handleEmail(e)} />
                </div>
              </label>
              {/* Password */}
              <label htmlFor="password">
                Пароль
                <div className={style.input}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => handlePassword(e)}
                  />
                  <button className={style.iconBtn} type="button" onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </label>
              <Link to="/password">Забыли пароль?</Link>
              <button
                className={style.submitBtn}
                type="submit"
                disabled={isDisabledBtn}
                onClick={confirmBtn}
              >
                Войти
              </button>
              <span>У вас нет аккаунта?</span>
              <Link to="/">Регистрация</Link>
            </form>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div className={style.rightContent}>
          <h1>Calendar</h1>
          <img src={calendar} alt="calendar" />
        </div>
      </div>
    </>
  )
}

export default AuthPage
