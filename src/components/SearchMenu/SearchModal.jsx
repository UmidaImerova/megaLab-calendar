import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabList from '@mui/lab/TabList'
import TabPanel from '@mui/lab/TabPanel'
import { useSelector, useDispatch } from 'react-redux'
import { getUsersAsync } from '../../Pages/Admin/slicer/userSlice'
import { getPositionsAsync } from '../../Pages/Admin/slicer/positionsSlice'
import { getmeetingRoom } from '../../Pages/Admin/slicer/roomSlice'
import UserCard from './UserCard'
import RoomCard from './RoomCard'
import s from './searchMenuStyle.module.scss'

function SearchModal({ openSearchMenu, setOpenSearchMenu }) {
  SearchModal.propTypes = {
    openSearchMenu: PropTypes.bool,
    setOpenSearchMenu: PropTypes.func,
  }

  const [selectedTab, setSelectedTab] = useState('all')
  const [inputValue, setInputValue] = useState('')
  const [tabContent, setTabContent] = useState([])

  const allUsers = useSelector((state) => state.usersList.users)
  const allRooms = useSelector((state) => state.roomList.meetingrooms)
  const dispatch = useDispatch()

  /* recieve data from DB  */
  useEffect(() => {
    dispatch(getUsersAsync())
    dispatch(getPositionsAsync())
    dispatch(getmeetingRoom())
  }, [])
  /* search staff */
  const handleSearchByUserName = () => {
    const searchingValue = inputValue.toLowerCase()
    const result = allUsers.filter((user) => user.full_name.toLowerCase().includes(searchingValue))
    setTabContent(result)
  }

  /* search meetingroom */
  const handleSearchRoom = () => {
    const searchingValue = inputValue.toLowerCase()
    const result = allRooms.filter((room) => room.roomName.toLowerCase().includes(searchingValue))
    setTabContent(result)
  }

  /* searching Value */
  const handleSearchValue = (e) => {
    setInputValue(e.target.value)
    handleSearchByUserName()
    handleSearchRoom()
  }
  /* close modal window */
  const handleClose = () => {
    setOpenSearchMenu(false)
    setInputValue('')
    setSelectedTab('all')
  }
  /* change search parametrs */
  const handleChangeTab = (e, newValue) => {
    setSelectedTab(newValue)
  }
  return (
    <div className={openSearchMenu ? s.modal : s.modal_hidden}>
      <div className={s.wrapper}>
        <div className={s.search_bar}>
          <SearchIcon color="action" />
          <input type="text" value={inputValue} onChange={(e) => handleSearchValue(e)} />
          <button type="button" onClick={handleClose}>
            <CancelIcon color="action" />
          </button>
        </div>
        <div className={s.tab_bar}>
          <TabContext value={selectedTab}>
            <Box>
              <TabList onChange={handleChangeTab} aria-label="searchMenu">
                <Tab label="Все" value="all" />
                <Tab
                  icon={<FolderOpenIcon />}
                  iconPosition="start"
                  label="Название"
                  value="eventName"
                />
                <Tab
                  icon={<PersonOutlineIcon />}
                  iconPosition="start"
                  label="Сотрудник"
                  value="organisationUser"
                  onClick={handleSearchByUserName}
                />
                <Tab
                  icon={<BusinessCenterIcon />}
                  iconPosition="start"
                  label="Должность"
                  value="positionUser"
                />
                <Tab
                  icon={<LocationOnIcon />}
                  iconPosition="start"
                  label="Конф. зал"
                  value="rooms"
                  onClick={handleSearchRoom}
                />
              </TabList>
            </Box>
            <TabPanel value="all">All</TabPanel>
            <TabPanel value="eventName">eventName</TabPanel>
            <TabPanel value="organisationUser">
              <div className={s.search_result}>
                <ul>
                  {tabContent.map((item) => (
                    <UserCard value={item} />
                  ))}
                </ul>
              </div>
            </TabPanel>
            <TabPanel value="positionUser">positionUser</TabPanel>
            <TabPanel value="rooms">
              <div className={s.search_result}>
                <ul>
                  {tabContent.map((item) => (
                    <RoomCard value={item} />
                  ))}
                </ul>
              </div>
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
