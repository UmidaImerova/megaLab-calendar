import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Avatar, Badge } from '@mui/material'

import DeleteBtnForIcon from './DeleteBtnForIcon'

import s from './eventStyle.module.scss'

function SelectedUser({ selected, setSelected }) {
  SelectedUser.propTypes = {
    selected: PropTypes.array,
    setSelected: PropTypes.func,
  }
  const allUsers = useSelector((state) => state.usersList.users)
  /* deleted user from participant list */
  const handelDelete = (e) => {
    const deletedUserId = Number(e.currentTarget.id)
    const indexOfDeletedUser = selected.indexOf(deletedUserId)
    setSelected(selected.splice(indexOfDeletedUser))
  }
  return (
    <div className={s.participantList}>
      {selected.map((item) => (
        <div className={s.badge} key={item}>
          {allUsers
            .filter((user) => user.id === item)
            .map((user) => (
              <Badge
                key={user.id}
                overlap="circular"
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                badgeContent={<DeleteBtnForIcon handelDelete={handelDelete} value={user.id} />}
              >
                <Avatar alt={user.full_name} src={user.photo_path} sx={{ width: 32, height: 32 }} />
              </Badge>
            ))}
        </div>
      ))}
    </div>
  )
}

export default SelectedUser
