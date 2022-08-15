import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import s from './organisationListStyle.module.scss'

function PositionList() {
  const [positionName, setPositionName] = useState('')
  const [departmentId, setDepartmentId] = useState(0)

  const allPOsition = useSelector((state) => state.positionList.positions)
  const activePositions = allPOsition.filter((item) => item.isDeleted === false)

  return (
    <div className={s.wrapper}>
      <h2>Список должностей</h2>
      <button type="button">Добавить</button>
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
                  <EditIcon id={item.id} color="primary" sx={{ mr: 1 }} />
                  <DeleteIcon color="primary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default PositionList
