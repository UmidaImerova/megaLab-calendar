import React from 'react'
import { Avatar } from '@mui/material'
import s from './adminPageStyle.module.scss'
import Logo from '../../components/Logo/Logo'

function AdminPage() {
  return (
    <div className={s.profileWrapper}>
      <div className={s.sidebar}>
        <Logo />
      </div>
      <div className={s.header}>
        <Avatar
          sx={{ width: 32, height: 32, m: 1, mr: 2 }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        />
      </div>
      <div className={s.content}>Content</div>
    </div>
  )
}

export default AdminPage
