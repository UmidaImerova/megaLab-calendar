import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ContactPageIcon from '@mui/icons-material/ContactPage'
import s from './organisationListStyle.module.scss'
import ModalAddUser from '../../components/AdminPanel/ModalAddUser'
import { getUsersAsync, addUsersAsync } from './slicer/userSlice'

function UserList() {
  const [openAddUser, setOpenAddUser] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [patronymic, setPatronymic] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [email, setEmail] = useState('')
  const [selectedOrgId, setSelectedOrgId] = useState(0)
  const [selectedDepId, setSelectedDepId] = useState(0)
  const [selectedPositionId, setSelectedPositionId] = useState(0)
  const [selectedRoleId, setSelectedRoleId] = useState(0)
  const [password, setPassword] = useState('')
  const activeUsers = useSelector((state) => state.usersList.users)
  const departments = useSelector((state) => state.orgList.organisations)
  const dispatch = useDispatch()
  /* open modal window for add organisation */
  const handleOpenAddUser = () => {
    setOpenAddUser(true)
  }
  /* add user to database */
  const handleAddUser = () => {
    dispatch(
      addUsersAsync({
        firstName,
        lastName,
        patronymic,
        msisdn: phoneNum,
        email,
        organizationId: selectedOrgId,
        departmentId: selectedDepId,
        positionId: selectedPositionId,
        roleId: selectedRoleId,
        password,
      }),
    )
    dispatch(getUsersAsync())
    setFirstName('')
    setLastName('')
    setPatronymic('')
    setPhoneNum('')
    setEmail('')
    setSelectedOrgId(0)
    setSelectedDepId(0)
    setSelectedPositionId(0)
    setPassword('')
    setOpenAddUser(false)
  }
  return (
    <div className={s.wrapper}>
      <h2>Список пользователей</h2>
      <button type="button" onClick={handleOpenAddUser}>
        Добавить
      </button>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>ФИО пользователя</h4>
              </TableCell>
              <TableCell>
                <h4>Отдел пользователя</h4>
              </TableCell>
              <TableCell>
                <h4>Организация</h4>
              </TableCell>
              <TableCell>
                <h4>Должность</h4>
              </TableCell>
              <TableCell>
                <h4>E-mail</h4>
              </TableCell>
              <TableCell>
                <h4>Управление</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.full_name}</TableCell>
                <TableCell>{user.department_name}</TableCell>
                <TableCell>{user.position_name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <button type="button" title="Редактировать" className={s.hiddenButton}>
                    <EditIcon id={user.id} color="primary" sx={{ mr: 1 }} />
                  </button>
                  <button type="button" title="Удалить" className={s.hiddenButton}>
                    <DeleteIcon color="primary" sx={{ mr: 1 }} />
                  </button>
                  <button type="button" title="Детали" className={s.hiddenButton}>
                    <ContactPageIcon color="primary" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalAddUser
        openAddUser={openAddUser}
        setOpenAddUser={setOpenAddUser}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        patronymic={patronymic}
        setPatronymic={setPatronymic}
        phoneNum={phoneNum}
        setPhoneNum={setPhoneNum}
        email={email}
        setEmail={setEmail}
        selectedOrgId={selectedOrgId}
        setSelectedOrgId={setSelectedOrgId}
        selectedDepId={selectedDepId}
        setSelectedDepId={setSelectedDepId}
        selectedPositionId={selectedPositionId}
        setSelectedPositionId={setSelectedPositionId}
        selectedRoleId={selectedRoleId}
        setSelectedRoleId={setSelectedRoleId}
        password={password}
        setPassword={setPassword}
        handleAddUser={handleAddUser}
      />
    </div>
  )
}

export default UserList
