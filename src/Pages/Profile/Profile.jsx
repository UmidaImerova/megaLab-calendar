import React from 'react'
import s from './profileStyle.module.scss'
import Tags from '../../components/Tags/Tags'

function Profile() {
  return (
    <div className={s.profileWrapper}>
      <div className={s.sidebar}>
        <Tags />
      </div>
      <div className={s.header}>Header</div>
      <div className={s.content}>Content</div>
    </div>
  )
}

export default Profile
