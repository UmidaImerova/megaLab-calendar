import React, { useState } from 'react'
import { Button, Grid, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import s from './profileStyle.module.scss'
import Logo from '../../components/Logo/Logo'
import Tags from '../../components/Tags/Tags'

function Profile() {
  const [value, setValue] = useState(new Date())

  return (
    <div className={s.profileWrapper}>
      <div className={s.sidebar}>
        <Logo />
        <div className={s.newEvenetBtn}>
          <Button
            variant="outlined"
            sx={{
              width: 180,
              height: '40',
              margin: 2,
              border: '1px solid #4B84F4',
              borderRadius: 2,
              fontWeight: 600,
              fontSize: 16,
              fontFamily: 'Roboto',
            }}
          >
            Создать
          </Button>
        </div>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <StaticDatePicker
            displayStaticWrapperAs="desktop"
            orientation="portrait"
            openTo="day"
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Tags />
      </div>
      <div className={s.header}>Header</div>
      <div className={s.content}>Content</div>
    </div>
  )
}

export default Profile
