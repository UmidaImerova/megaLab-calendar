import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import { Table, TableRow, TableCell, TableBody, Avatar, Checkbox, Badge } from '@mui/material'
import SelectedUser from './SelectedUser'
import s from './eventStyle.module.scss'

function EventParticipant({
  openParticipant,
  setOpenParticipant,
  setShowModal,
  setSelectedParticipants,
}) {
  EventParticipant.propTypes = {
    openParticipant: PropTypes.bool,
    setOpenParticipant: PropTypes.func,
    setShowModal: PropTypes.func,
    setSelectedParticipants: PropTypes.func,
  }
  const allUsers = useSelector((state) => state.usersList.users)
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState([])
  const handleClose = () => {
    setOpenParticipant(false)
    setShowModal(true)
  }
  const handleClick = (event) => {
    /*     const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    } */
    // const newSelected = Number(event.currentTurget.id)
    // eslint-disable-next-line no-console
    console.log(event.target.value)
    // setSelected(newSelected)

    // setSelectedParticipants(newSelected)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1
  const filteredUser = allUsers.filter((user) => user.full_name.toLowerCase().includes(searchValue))

  return (
    <div className={openParticipant ? s.modalParticipant : s.modal_hidden}>
      <div className={s.container}>
        <div className={s.header}>
          <h2>Новое событие</h2>
          <CloseIcon onClick={handleClose} />
        </div>
        <div className={s.searchBox}>
          <SearchIcon color="action" />
          <input
            type="text"
            name="searchBox"
            id="searchBox"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLowerCase())}
          />
        </div>
        <div className={s.userList}>
          <Table>
            <TableBody>
              {filteredUser.map((user, index) => {
                const isItemSelected = isSelected(user.id)
                const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow
                    hover
                    key={user.id}
                    id={user.id}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    // selected={isItemSelected}
                    onDoubleClick={(event) => handleClick(event, user.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar
                        alt={user.full_name}
                        src={user.photo_path}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>{user.full_name}</TableCell>
                    <TableCell>{user.position_name}</TableCell>
                    <TableCell>{user.department_name}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        <div className={s.selected_user}>
          {selected.length ? <SelectedUser selected={selected} setSelected={setSelected} /> : ''}
        </div>
        <div className={s.footer}>
          <button className={s.sumbitBtn} type="submit">
            Сохранить
          </button>
        </div>
      </div>
    </div>
  )
}

export default EventParticipant
