import { React, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { InputAdornment, OutlinedInput } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import style from './style.module.scss'
import calendar from './assets/Calendar.png'
import plusIcon from './assets/plusIcon.svg'

function LoginPage() {
  const [isDisabled, setDisabled] = useState(false)
  const [showPassword, setShowPassword] = useState(true)

  function handleSubmit(e) {
    e.preventDefault()
  }

  const confirmBtn = () => {
    // eslint-disable-next-line no-console
    console.log('clicked')
  }

  const newLocal = (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" edge="end">
        {showPassword ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  )
  return (
    <>
      <div className={style.left}>
        <div className={style.leftContent}>
          <h1>Добро пожаловать!</h1>
          <div className={style.addPhoto}>
            <label htmlFor="addPhoto">
              <input type="file" id="addPhoto" />
              <img src={plusIcon} alt="icon" />
            </label>
            <span> Добавьте фото профиля </span>
          </div>
          <div className={style.personalForm}>
            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="password"
                  endAdornment={newLocal}
                  label="Пароль"
                />
              </FormControl>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-password">Подтвердите пароль</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type="password"
                  endAdornment={newLocal}
                  label="Пароль"
                />
              </FormControl>
              <textarea placeholder="О себе..." />
              <button
                className={style.submitBtn}
                type="submit"
                disabled={isDisabled}
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
