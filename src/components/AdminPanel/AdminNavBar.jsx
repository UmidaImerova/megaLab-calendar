import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText, Collapse } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'
import PersonIcon from '@mui/icons-material/Person'

function AdminNavBar() {
  const navigate = useNavigate()
  const [openList, setOpenList] = useState(false)
  const handleClick = () => {
    setOpenList(!openList)
  }
  const clickToOrgList = () => {
    navigate('/admin/OrganisationList', { replace: true })
  }
  const clickToDepartmentList = () => {
    navigate('/admin/DepartmentList', { replace: true })
  }
  const clickToPositionList = () => {
    navigate('/admin/PositionList', { replace: true })
  }
  const clickToRoomList = () => {
    navigate('/admin/RoomList', { replace: true })
  }
  const clickToUserList = () => {
    navigate('/admin/UserList', { replace: true })
  }
  return (
    <div>
      <List component="nav" aria-labelledby="nested-list-subheader">
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <BusinessIcon />
          </ListItemIcon>
          <ListItemText primary="Организации" />
          {openList ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
        <Collapse in={openList} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 10 }} onClick={clickToOrgList}>
              <ListItemText primary="Список организаций" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 10 }} onClick={clickToDepartmentList}>
              <ListItemText primary="Список отделов" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 10 }} onClick={clickToPositionList}>
              <ListItemText primary="Список должностей" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton onClick={clickToRoomList}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>
          <ListItemText primary="Помещения" />
        </ListItemButton>
        <ListItemButton onClick={clickToUserList}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Пользователи" />
        </ListItemButton>
      </List>
    </div>
  )
}

export default AdminNavBar
