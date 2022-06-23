import { React, useState } from 'react'
import style from './style.module.scss'
import calendar from './assets/Calendar.png'
import AddPhoto from '../../components/AddPhoto/AddPhoto'
/* import plusIcon from './assets/plusIcon.svg' */

function LoginPageFull() {
  const [isDisabled, setDisabled] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
  }

  const confirmBtn = () => {
    // eslint-disable-next-line no-console
    console.log('clicked')
  }

  return (
    <>
      <div className={style.left}>
        <div className={style.leftContent}>
          <h1>Добро пожаловать!</h1>
          <AddPhoto />
          <div className={style.personalForm}>
            <form onSubmit={handleSubmit}>
              <label htmlFor="name">
                ФИО
                <input type="text" value="John" disabled="true" />
              </label>
              <label htmlFor="department">
                Отдел
                <input type="text" value="John" disabled="true" />
              </label>
              <label htmlFor="jobTitle">
                Должность
                <input type="text" value="John" disabled="true" />
              </label>
              <label htmlFor="email">
                Почта
                <input type="email" value="John" disabled="true" />
              </label>
              <label htmlFor="password">
                Пароль
                <input type="password" />
              </label>
              <label htmlFor="passwordConfirm">
                Потвердите пароль
                <input type="password" />
              </label>
              <textarea placeholder="О себе..." />
              <button type="submit" disabled={isDisabled} onClick={confirmBtn}>
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

export default LoginPageFull
