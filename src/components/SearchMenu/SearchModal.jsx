import React, { useState } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '@mui/icons-material/Search'
import CancelIcon from '@mui/icons-material/Cancel'
import FolderOpenIcon from '@mui/icons-material/FolderOpen'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useSelector } from 'react-redux'
import s from './searchMenuStyle.module.scss'

function SearchModal({ openSearchMenu, setOpenSearchMenu }) {
  SearchModal.propTypes = {
    openSearchMenu: PropTypes.bool,
    setOpenSearchMenu: PropTypes.func,
  }

  const [selectedTab, setSelectedTab] = useState('all')
  const [inputValue, setInputValue] = useState('')

  /* close modal window */
  const handleClose = () => {
    setOpenSearchMenu(false)
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
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
          <button type="button" onClick={handleClose}>
            <CancelIcon color="action" />
          </button>
        </div>
        <div className={s.tab_bar}>
          <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="searchBar">
            <Tab label="Все" value="all" />
            <Tab
              icon={<FolderOpenIcon />}
              iconPosition="start"
              label="Название"
              value="eventName"
            />
            <Tab icon={<AccessTimeIcon />} iconPosition="start" label="Дата" value="eventDate" />
            <Tab
              icon={<PersonOutlineIcon />}
              iconPosition="start"
              label="Сотрудник"
              value="organisationUser"
            />
            <Tab
              icon={<BusinessCenterIcon />}
              iconPosition="start"
              label="Должность"
              value="positionUser"
            />
          </Tabs>
        </div>
        <div className={s.search_result}>
          <ul>
            <li>result</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SearchModal
