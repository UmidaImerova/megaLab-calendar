import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Avatar } from '@mui/material'
import { getOrganisations } from './slicer/organisationSlice'
import { getDepartmentsList } from './slicer/departmentSlice'
import { getmeetingRoom } from './slicer/roomSlice'
import s from './adminPageStyle.module.scss'
import Logo from '../../components/Logo/Logo'
import AdminNavBar from '../../components/AdminPanel/AdminNavBar'
import { getPositionsAsync } from './slicer/positionsSlice'
import { getUsersAsync } from './slicer/userSlice'

function AdminPage() {
  const dispatch = useDispatch()

  /* recieve all departments from DB  */
  useEffect(() => {
    dispatch(getOrganisations())
    dispatch(getDepartmentsList())
    dispatch(getmeetingRoom())
    dispatch(getPositionsAsync())
    dispatch(getUsersAsync())
  }, [])
  return (
    <div className={s.profileWrapper}>
      <div className={s.sidebar}>
        <Logo />
        <AdminNavBar />
      </div>
      <div className={s.header}>
        <Avatar
          sx={{ width: 32, height: 32, m: 1, mr: 2 }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        />
      </div>
      <div className={s.content}>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminPage
