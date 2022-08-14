import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalAddDep from '../../components/AdminPanel/ModalAddDep'
import s from './organisationListStyle.module.scss'
import { getDepartmentsList, addNewDepartment } from './slicer/departmentSlice'

function DepartmentList() {
  const [openAddDep, setOpenAddDep] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  const [selectedOrgId, setSelectedOrgId] = useState(0)

  const organisationsList = useSelector((state) => state.orgList.organisations)
  const organisations = organisationsList.filter((org) => org.isDeleted === false)
  const departmentsList = useSelector((state) => state.depList.departments)
  const activeDepartments = departmentsList.filter((dep) => dep.isDeleted === false)

  /* recieve all departments from DB  */
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDepartmentsList())
  }, [])

  /* open modal for adding new depatment */
  const handleOpenAddDep = () => {
    setOpenAddDep(true)
  }

  /* adding new department to DB */
  const handleAddDep = () => {
    if (departmentName.trim().length) {
      dispatch(addNewDepartment({ departmentName, selectedOrgId, headUserId: 1 }))
    }
    // eslint-disable-next-line no-console
    console.log(selectedOrgId, typeof selectedOrgId)
    setOpenAddDep(false)
  }

  return (
    <div className={s.wrapper}>
      <h2>Список отделов</h2>
      <button type="button" onClick={() => handleOpenAddDep()}>
        Добавить отдел
      </button>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Наименование</h4>
              </TableCell>
              <TableCell>
                <h4>Организация</h4>
              </TableCell>
              <TableCell>
                <h4>Руководитель</h4>
              </TableCell>
              <TableCell>
                <h4>Управление</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeDepartments.map((dep) => (
              <TableRow key={dep.id}>
                <TableCell>{dep.departmentName}</TableCell>
                <TableCell>{dep.organization.organizationName}</TableCell>
                <TableCell>{`${dep.head.firstName} ${dep.head.lastName}`}</TableCell>
                <TableCell>
                  <EditIcon id={dep.id} color="primary" sx={{ mr: 1 }} />
                  <DeleteIcon color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalAddDep
        openAddDep={openAddDep}
        setOpenAddDep={setOpenAddDep}
        handleAddDep={handleAddDep}
        setSelectedOrgId={setSelectedOrgId}
      />
    </div>
  )
}

export default DepartmentList
