import { React, useState } from 'react'
import { FormHelperText } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import style from './LoginPageStyle.module.scss'
import calendar from './assets/Calendar.png'
import AddPhoto from '../../components/AddPhoto/AddPhoto'

function LoginPage() {
  const [isDisabledBtn, setDisabledBtn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  /* form control */
  function handleSubmit(e) {
    e.preventDefault()
  }
  /* show/hide password */
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  /* show/hide password confirm */
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  /* set password */
  const handlePassword = (e) => {
    const newPass = e.target.value
    setPassword(newPass)
    if (newPass !== confirmPassword) {
      setErrorMsg('Пароль не совпадает')
      setDisabledBtn(true)
    } else {
      setErrorMsg('')
      setDisabledBtn(false)
    }
  }
  /* set confirm password and check */
  const checkPassword = (e) => {
    const confPass = e.target.value
    setConfirmPassword(confPass)
    if (password !== confPass) {
      setErrorMsg('Пароль не совпадает')
      setDisabledBtn(true)
    } else {
      setErrorMsg('')
      setDisabledBtn(false)
    }
  }
  /* send info to server */
  const confirmBtn = () => {
    // eslint-disable-next-line no-console
    console.log('clicked')
  }

  /* recive name from server */
  const userName = 'Улан'

  return (
    <>
      <div className={style.left}>
        <div className={style.leftContent}>
          <h1>{userName}</h1>
          <h1>Добро пожаловать!</h1>
          <AddPhoto />
          <div className={style.personalForm}>
            <form onSubmit={handleSubmit}>
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
              {/* Password confirmation */}
              <label htmlFor="confirmPassword">
                Подтвердите пароль
                <div className={style.input}>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => checkPassword(e)}
                  />
                  <button
                    className={style.iconBtn}
                    type="button"
                    onClick={handleClickShowConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </label>
              <FormHelperText id="component-error-text" sx={{ color: 'error.main', fontSize: 14 }}>
                {errorMsg}
              </FormHelperText>

              <textarea placeholder="О себе..." />
              <button
                className={style.submitBtn}
                type="submit"
                disabled={isDisabledBtn}
                onClick={confirmBtn}
              >
                СОХРАНИТЬ
              </button>
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

export default LoginPage
