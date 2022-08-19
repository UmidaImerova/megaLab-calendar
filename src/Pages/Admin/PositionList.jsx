import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import s from './organisationListStyle.module.scss'
import {
  addPositionsAsync,
  updatePositionsAsync,
  deletePositionsAsync,
} from './slicer/positionsSlice'
import ModalAddPosition from '../../components/AdminPanel/ModalAddPosition'
import ModalEditPosition from '../../components/AdminPanel/ModalEditPosition'

function PositionList() {
  const [openAddPos, setOpenAddPos] = useState(false)
  const [openEditPos, setOpenEditPos] = useState(false)
  const [positionName, setPositionName] = useState('')
  const [departmentId, setDepartmentId] = useState(0)
  const [positionId, setPositionId] = useState(0)

  const allPOsition = useSelector((state) => state.positionList.positions)
  const activePositions = allPOsition.filter((item) => item.isDeleted === false)

  const dispatch = useDispatch()
  /* open modal for adding new position */
  const handleOpenAddPosition = () => {
    setOpenAddPos(!openAddPos)
  }
  /* adding new position to DB */
  const handleAddPosition = () => {
    if (positionName.trim().length) {
      dispatch(addPositionsAsync({ departmentId, positionName }))
    }
    setPositionName('')
    setDepartmentId(0)
    setOpenAddPos(false)
  }
  /* open modal window for edit position */
  const handleOpenEditPos = (e) => {
    setOpenEditPos(!openEditPos)
    const positionId = Number(e.currentTarget.id)
    const selectedPosition = activePositions.filter((item) => item.id === positionId)
    const inputValue = selectedPosition[0].positionName
    const departmentId = selectedPosition[0].department.id

    setPositionName(inputValue)
    setDepartmentId(departmentId)
    setPositionId(positionId)
  }

  /* edit organisation info */
  const handleEditPosition = () => {
    dispatch(
      updatePositionsAsync({
        positionId,
        positionName,
      }),
    )

    setDepartmentId(0)
    setPositionName('')
    setOpenEditPos(false)
  }

  /* delete position */
  const handleDeletePosition = (item) => {
    dispatch(deletePositionsAsync(item))
  }

  return (
    <div className={s.wrapper}>
      <h2>Список должностей</h2>
      <button type="button" onClick={handleOpenAddPosition}>
        Добавить
      </button>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Наименование</h4>
              </TableCell>
              <TableCell>
                <h4>Отдел</h4>
              </TableCell>
              <TableCell>
                <h4>Организация</h4>
              </TableCell>
              <TableCell>
                <h4>Управление</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activePositions.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.positionName}</TableCell>
                <TableCell>{item.department.departmentName}</TableCell>
                <TableCell>{item.department.organization.organizationName}</TableCell>
                <TableCell>
                  <EditIcon
                    id={item.id}
                    color="primary"
                    sx={{ mr: 1 }}
                    onClick={(e) => handleOpenEditPos(e)}
                  />
                  <DeleteIcon color="primary" onClick={() => handleDeletePosition(item)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ModalAddPosition
        openAddPos={openAddPos}
        setOpenAddPos={setOpenAddPos}
        positionName={positionName}
        setPositionName={setPositionName}
        setDepartmentId={setDepartmentId}
        handleAddPosition={handleAddPosition}
      />
      <ModalEditPosition
        openEditPos={openEditPos}
        setOpenEditPos={setOpenEditPos}
        positionName={positionName}
        setPositionName={setPositionName}
        departmentId={departmentId}
        setDepartmentId={setDepartmentId}
        handleEditPosition={handleEditPosition}
      />
    </div>
  )
}

export default PositionList
