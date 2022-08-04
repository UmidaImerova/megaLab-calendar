import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useSelector, useDispatch } from 'react-redux'
import { deleteOrg, getOrganisations, addOrgAsync, editOrgAsync } from './slicer/organisationSlice'
import ModalAddOrg from '../../components/AdminPanel/ModalAddOrg'
import ModalEditOrg from '../../components/AdminPanel/ModalEditOrg'
import s from './organisationListStyle.module.scss'

function OrganisationList() {
  const [openAddOrg, setOpenAddOrg] = useState(false)
  const [openEditOrg, setOpenEditOrg] = useState(false)
  const [organizationName, setOrganizationName] = useState('')
  const [orgId, setOrgId] = useState()
  const organisations = useSelector((state) => state.orgList.organisations)
  const dispatch = useDispatch()

  /* получение данных из базы */
  useEffect(() => {
    dispatch(getOrganisations())
  }, [])

  /* open modal window for add organisation */
  const handleOpenAddOrg = () => {
    setOpenAddOrg(!openAddOrg)
  }
  /* add new organisation */
  const handleAddNewOrg = () => {
    if (organizationName.trim().length) {
      dispatch(addOrgAsync({ organizationName }))
      setOrganizationName('')
      setOpenAddOrg(false)
      dispatch(getOrganisations())
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
                <TableCell>{org.organizationName}</TableCell>
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
          organizationName={organizationName}
          setOrganizationName={setOrganizationName}
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
