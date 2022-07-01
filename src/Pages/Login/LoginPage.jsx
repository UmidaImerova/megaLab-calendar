import { React, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import { InputAdornment, OutlinedInput, FormHelperText } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import style from './LoginPageStyle.module.scss'
import calendar from './assets/Calendar.png'
import AddPhoto from '../../components/AddPhoto/AddPhoto'

function LoginPage() {
  const [isDisabledBtn, setDisabledBtn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
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
  /* set password */
  const handlePassword = (e) => {
    const newPass = e.target.value
    setPassword(newPass)
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
  const userName = 'Улан Джумалиев'

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
              {/* Password confirmation */}
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel htmlFor="outlined-adornment-password">Подтвердите пароль</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => checkPassword(e)}
                  endAdornment={adornmentPosition}
                  label="Пароль"
                />
                <FormHelperText
                  id="component-error-text"
                  sx={{ color: 'error.main', fontSize: 14 }}
                >
                  {errorMsg}
                </FormHelperText>
              </FormControl>
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
