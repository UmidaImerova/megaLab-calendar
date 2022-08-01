import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import {
  addOrg,
  editOrg,
  deleteOrg,
  getOrganisations,
  addOrgAsync,
} from './slicer/organisationSlice'
import ModalAddOrg from '../../components/AdminPanel/ModalAddOrg'
import ModalEditOrg from '../../components/AdminPanel/ModalEditOrg'
import s from './organisationListStyle.module.scss'

function OrganisationList() {
  /* получение данных из базы */
  // eslint-disable-next-line global-require
  const axios = require('axios').default
  // eslint-disable-next-line no-console
  console.log(axios.get('https://megalab-app.herokuapp.com/api/v1/organization/find-all'))

  const [openAddOrg, setOpenAddOrg] = useState(false)
  const [openEditOrg, setOpenEditOrg] = useState(false)
  const [orgName, setOrgName] = useState('')
  const [orgId, setOrgId] = useState('')
  const organisations = useSelector((state) => state.orgList.organisations)
  const dispatch = useDispatch()

  /* open modal window for add organisation */
  const handleOpenAddOrg = () => {
    setOpenAddOrg(!openAddOrg)
  }
  /* add new organisation */
  const handleAddNewOrg = () => {
    if (orgName.trim().length) {
      dispatch(addOrgAsync({ orgName }))
      setOrgName('')
      setOpenAddOrg(false)
    }
  }
  /* open modal window for edit organisation */
  const handleOpenEditOrg = (e) => {
    setOpenEditOrg(!openEditOrg)
    const orgId = e.target.id
    // eslint-disable-next-line no-console
    console.log(orgId)
    const selectedOrg = organisations.filter((org) => org.id === orgId)
    const inputValue = selectedOrg[0].name
    setOrgName(inputValue)
    setOrgId(orgId)
  }
  const handleEdit = () => {
    dispatch(
      editOrg({
        id: orgId,
        name: orgName,
      }),
    )
    setOrgName('')
    setOrgId('')
    setOpenEditOrg(false)
  }
  return (
    <div className={s.wrapper}>
      <h2>Список организаций</h2>
      <button type="submit" onClick={(e) => handleOpenAddOrg(e)}>
        Добавить организацию
      </button>
      <div>
        <Table sx={{ width: 500, margin: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Наименование</h4>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {organisations.map((org) => (
              <TableRow key={org.id}>
                <TableCell>{org.name}</TableCell>
                <TableCell>
                  <EditIcon
                    id={org.id}
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={(e) => handleOpenEditOrg(e)}
                  />
                  <DeleteIcon color="primary" onClick={() => dispatch(deleteOrg(org))} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ModalAddOrg
          openAddOrg={openAddOrg}
          setOpenAddOrg={setOpenAddOrg}
          orgName={orgName}
          setOrgName={setOrgName}
          handleAddNewOrg={handleAddNewOrg}
        />
        <ModalEditOrg
          openEditOrg={openEditOrg}
          setOpenEditOrg={setOpenEditOrg}
          organisationsList={organisations}
          orgName={orgName}
          setOrgName={setOrgName}
          editOrg={handleEdit}
        />
      </div>
    </div>
  )
}

export default OrganisationList
