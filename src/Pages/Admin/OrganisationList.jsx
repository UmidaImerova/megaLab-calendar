import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalAddOrg from '../../components/AdminPanel/ModalAddOrg'
import ModalEditOrg from '../../components/AdminPanel/ModalEditOrg'
import s from './organisationListStyle.module.scss'

function OrganisationList() {
  const [openAddOrg, setOpenAddOrg] = useState(false)
  const [openEditOrg, setOpenEditOrg] = useState(false)

  const organisations = [
    { name: 'MegaCom', id: '0' },
    { name: 'MegaLab', id: '1' },
  ]
  const handleOpenAddOrg = () => {
    setOpenAddOrg(!openAddOrg)
  }
  const handleOpenEditOrg = () => {
    setOpenEditOrg(!openEditOrg)
  }
  return (
    <div className={s.wrapper}>
      <h2>Список организаций</h2>
      <button type="submit" onClick={handleOpenAddOrg}>
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
              <TableRow key={org.name}>
                <TableCell>{org.name}</TableCell>
                <TableCell>
                  <EditIcon color="primary" sx={{ mr: 1 }} onClick={handleOpenEditOrg} />
                  <DeleteIcon color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ModalAddOrg openAddOrg={openAddOrg} setOpenAddOrg={setOpenAddOrg} />
        <ModalEditOrg openEditOrg={openEditOrg} setOpenEditOrg={setOpenEditOrg} />
      </div>
    </div>
  )
}

export default OrganisationList
