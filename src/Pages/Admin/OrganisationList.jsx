import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import {
  getOrganisations,
  addOrgAsync,
  editOrgAsync,
  deleteOrgAsync,
} from './slicer/organisationSlice'
import ModalAddOrg from '../../components/AdminPanel/ModalAddOrg'
import ModalEditOrg from '../../components/AdminPanel/ModalEditOrg'
import s from './organisationListStyle.module.scss'

function OrganisationList() {
  const [openAddOrg, setOpenAddOrg] = useState(false)
  const [openEditOrg, setOpenEditOrg] = useState(false)
  const [organizationName, setOrganizationName] = useState('')
  const [orgId, setOrgId] = useState()
  const [admin, setAdmin] = useState()

  const organisationsList = useSelector((state) => state.orgList.organisations)
  const organisations = organisationsList.filter((org) => org.isDeleted === false)
  const dispatch = useDispatch()

  /* open modal window for add organisation */
  const handleOpenAddOrg = () => {
    setOpenAddOrg(!openAddOrg)
  }
  /* add new organisation */
  const handleAddNewOrg = () => {
    if (organizationName.trim().length) {
      dispatch(addOrgAsync({ organizationName, adminUserId: 1 }))
      setOrganizationName('')
      setAdmin()
      setOpenAddOrg(false)
    }
  }
  /* open modal window for edit organisation */
  const handleOpenEditOrg = (e) => {
    setOpenEditOrg(!openEditOrg)
    const organisationId = Number(e.currentTarget.id)
    const selectedOrg = organisations.filter((org) => org.id === organisationId)
    const inputValue = selectedOrg[0].organizationName
    setOrgId(organisationId)
    setOrganizationName(inputValue)
  }
  /* edit organisation info */
  const handleEdit = () => {
    dispatch(
      editOrgAsync({
        organizationId: orgId,
        organizationName,
        adminId: 1,
      }),
    )
    setOrganizationName('')
    setOrgId('')
    setOpenEditOrg(false)
  }
  /* delete organisation */
  const handleDeleteOrg = (org) => {
    dispatch(deleteOrgAsync(org))
  }
  return (
    <div className={s.wrapper}>
      <h2>Список организаций</h2>
      <button type="button" onClick={() => handleOpenAddOrg()}>
        Добавить организацию
      </button>
      <div>
        <Table sx={{ width: 500, margin: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Наименование</h4>
              </TableCell>
              <TableCell>
                <h4>Администратор</h4>
              </TableCell>
              <TableCell>
                <h4>Управление</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {organisations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.organizationName}</TableCell>
                <TableCell>{`${org.admin.firstName} ${org.admin.lastName}`}</TableCell>
                <TableCell>
                  {org.isDeleted ? (
                    <Button>Разблокировать</Button>
                  ) : (
                    <div>
                      <EditIcon
                        id={org.id}
                        color="primary"
                        sx={{ mr: 1 }}
                        onClick={(e) => handleOpenEditOrg(e)}
                      />
                      <DeleteIcon color="primary" onClick={() => handleDeleteOrg(org)} />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ModalAddOrg
          openAddOrg={openAddOrg}
          setOpenAddOrg={setOpenAddOrg}
          organizationName={organizationName}
          setOrganizationName={setOrganizationName}
          admin={admin}
          setAdmin={setAdmin}
          handleAddNewOrg={handleAddNewOrg}
        />
        <ModalEditOrg
          openEditOrg={openEditOrg}
          setOpenEditOrg={setOpenEditOrg}
          organisationsList={organisations}
          organizationName={organizationName}
          setOrganizationName={setOrganizationName}
          editOrg={handleEdit}
        />
      </div>
    </div>
  )
}

export default OrganisationList
