import React, { useState } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import ModalAddDep from '../../components/AdminPanel/ModalAddDep'
import ModalEditDep from '../../components/AdminPanel/ModalEditDep'
import s from './organisationListStyle.module.scss'
import { addNewDepartment, getDepartmentsList, editDepartmentAsync } from './slicer/departmentSlice'

function DepartmentList() {
  const [openAddDep, setOpenAddDep] = useState(false)
  const [openEditDep, setOpenEditDep] = useState(false)
  const [departmentName, setDepartmentName] = useState('')
  const [selectedOrgId, setSelectedOrgId] = useState(0)
  const [head, setHead] = useState(0)
  const [selectedDepId, setSelectedDepId] = useState(0)

  const departmentsList = useSelector((state) => state.depList.departments)
  const activeDepartments = departmentsList.filter((dep) => dep.isDeleted === false)

  const dispatch = useDispatch()

  /* open modal for adding new depatment */
  const handleOpenAddDep = () => {
    setOpenAddDep(true)
  }

  /* adding new department to DB */
  const handleAddDep = () => {
    if (departmentName.trim().length) {
      dispatch(
        addNewDepartment({ departmentName, organizationId: selectedOrgId, headUserId: head }),
      )
    }
    dispatch(getDepartmentsList())
    setOpenAddDep(false)
  }

  /* open modal window for edit organisation */
  const handleOpenEditDep = (e) => {
    setOpenEditDep(!openEditDep)
    const departmentId = Number(e.currentTarget.id)
    const selectedDep = activeDepartments.filter((dep) => dep.id === departmentId)
    const inputValue = selectedDep[0].departmentName
    const headIdOfSelectedDep = selectedDep[0].head.id
    setSelectedDepId(departmentId)
    setDepartmentName(inputValue)
    setHead(headIdOfSelectedDep)
  }

  /* edit organisation info */
  const handleEditDep = () => {
    dispatch(
      editDepartmentAsync({
        departmentId: selectedDepId,
        departmentName,
        headId: head,
      }),
    )
    dispatch(getDepartmentsList())
    setSelectedDepId(0)
    setDepartmentName('')
    setHead(0)
    setOpenEditDep(false)
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
                  <EditIcon
                    id={dep.id}
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={(e) => handleOpenEditDep(e)}
                  />
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
        setSelectedOrgId={setSelectedOrgId}
        departmentName={departmentName}
        setDepartmentName={setDepartmentName}
        handleAddDep={handleAddDep}
        setHead={setHead}
      />
      <ModalEditDep
        openEditDep={openEditDep}
        setOpenEditDep={setOpenEditDep}
        selectedOrgId={selectedOrgId}
        setSelectedOrgId={setSelectedOrgId}
        departmentName={departmentName}
        setDepartmentName={setDepartmentName}
        head={head}
        setHead={setHead}
        handleEditDep={handleEditDep}
      />
    </div>
  )
}

export default DepartmentList
