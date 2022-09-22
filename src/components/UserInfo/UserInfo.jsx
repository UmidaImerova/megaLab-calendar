import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@mui/material'
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'
import PieChartOutlineOutlinedIcon from '@mui/icons-material/PieChartOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import s from './userInfoStyle.module.scss'

function UserInfo({ openUserInfo, setOpenUserInfo }) {
  UserInfo.propTypes = {
    openUserInfo: PropTypes.bool,
    setOpenUserInfo: PropTypes.func,
  }
  return (
    <div className={openUserInfo ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.header}>
          <Avatar sx={{ width: 56, height: 56, margin: 'auto' }} />
          <h3>Name name</h3>
          <h5>email@com</h5>
        </div>
        <div className={s.content}>
          <div className={s.info}>
            <BusinessCenterOutlinedIcon color="action" />
            <span>Position</span>
          </div>
          <div className={s.info}>
            <PieChartOutlineOutlinedIcon color="action" />
            <span>Department</span>
          </div>
          <div className={s.info}>
            <EmailOutlinedIcon color="action" />
            <span>email</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
