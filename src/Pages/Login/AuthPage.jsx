import React, { useState } from 'react'
import {
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import style from './LoginPageStyle.module.scss'
import calendar from './assets/Calendar.png'

function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isDisabledBtn, setDisabledBtn] = useState(true)
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

  /* input icon position */
  const adornmentPosition = (
    <InputAdornment position="end">
      <IconButton
        aria-label="toggle password visibility"
        edge="end"
        onClick={handleClickShowPassword}
      >
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )

  /* send info to server */
  const confirmBtn = () => {
    // eslint-disable-next-line no-console
    console.log({ email }, { password })
  }

  return (
    <>
      <div className={style.left}>
        <div className={style.leftContent}>
          <h1>Добро пожаловать!</h1>
          <div className={style.personalForm}>
            <form onSubmit={handleSubmit}>
              {/* e-mail */}
              <TextField
                id="outlined-basic"
                label="e-mail"
                variant="outlined"
                fullWidth
                sx={{ m: 1 }}
                value={email}
                onChange={(e) => handleEmail(e)}
              />
              {/* Password */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handlePassword(e)}
                  endAdornment={adornmentPosition}
                  label="Пароль"
                />
              </FormControl>
              <button
                className={style.submitBtn}
                type="submit"
                disabled={isDisabledBtn}
                onClick={confirmBtn}
              >
                Войти
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

export default AuthPage
