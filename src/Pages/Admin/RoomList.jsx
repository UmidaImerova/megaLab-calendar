import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { getmeetingRoom, addMmeetingRoom } from './slicer/roomSlice'
import s from './organisationListStyle.module.scss'
import ModalAddRoom from '../../components/AdminPanel/ModalAddRoom'

export default function RoomList() {
  const [openAddRoom, setOpenAddRoom] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [location, setLocation] = useState('')
  const [roomCopasity, setRoomCopasity] = useState()
  const [isDashboardAvailable, setIsDashboardAvailable] = useState(false)
  const [isProjectorAvailable, setIsProjectorAvailable] = useState(false)
  const [isAcAvailable, setIsAcAvailable] = useState(false)

  /* receive data from backend */
  const RoomList = useSelector((state) => state.roomList.meetingrooms)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getmeetingRoom())
  }, [dispatch])

  /* open modal window for add room */
  const handleOpenAddRoom = () => {
    setOpenAddRoom(!openAddRoom)
  }

  /* add new room */
  const handleAddNewRoom = () => {
    if (roomName.trim().length) {
      dispatch(
        addMmeetingRoom({
          roomName,
          location,
          roomCopasity: 10,
          isDashboardAvailable: true,
          isProjectorAvailable: true,
          isAcAvailable: true,
        }),
      )
      setOpenAddRoom(false)
      setRoomName('')
      setLocation('')
      setRoomCopasity()
      setIsDashboardAvailable(false)
      setIsProjectorAvailable(false)
      setIsAcAvailable(false)
      dispatch(getmeetingRoom())
    }
  }

  return (
    <div className={s.wrapper}>
      <h2>Список комнат</h2>
      <button type="submit" onClick={handleOpenAddRoom}>
        Добавить комнату
      </button>
      <div>
        <Table sx={{ width: 500, margin: 4 }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <h4>Наименование</h4>
              </TableCell>
              <TableCell>
                <h4>Расположение</h4>
              </TableCell>
              <TableCell>
                <h4>Вместимость</h4>
              </TableCell>
              <TableCell>
                <h4>Наличие доски</h4>
              </TableCell>
              <TableCell>
                <h4>Наличие проектора</h4>
              </TableCell>
              <TableCell>
                <h4>Наличие кондиционера</h4>
              </TableCell>
              <TableCell>
                <h4>Доступность</h4>
              </TableCell>
              <TableCell>
                <h4>Управление</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {RoomList.map((room) => (
              <TableRow key={room.id}>
                <TableCell>{room.roomName}</TableCell>
                <TableCell>{room.location}</TableCell>
                <TableCell>{room.roomCapacity}</TableCell>
                <TableCell>{room.isDashboardAvailable ? 'Да' : 'Нет'}</TableCell>
                <TableCell>{room.isProjectorAvailable ? 'Да' : 'Нет'}</TableCell>
                <TableCell>{room.isAcAvailable ? 'Да' : 'Нет'}</TableCell>
                <TableCell />
                <TableCell>
                  <div>
                    <EditIcon id={room.id} color="primary" sx={{ mr: 1 }} />
                    <DeleteIcon color="primary" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ModalAddRoom
          openAddRoom={openAddRoom}
          setOpenAddRoom={setOpenAddRoom}
          roomName={roomName}
          setRoomName={setRoomName}
          location={location}
          setLocation={setLocation}
          roomCopasity={roomCopasity}
          setRoomCopasity={setRoomCopasity}
          isDashboardAvailable={isDashboardAvailable}
          setIsDashboardAvailable={setIsDashboardAvailable}
          isProjectorAvailable={isProjectorAvailable}
          setIsProjectorAvailable={setIsProjectorAvailable}
          isAcAvailable={isAcAvailable}
          setIsAcAvailable={setIsAcAvailable}
          addNewRoom={handleAddNewRoom}
        />
      </div>
    </div>
  )
}
