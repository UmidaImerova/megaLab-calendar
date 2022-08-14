import React, { useState, useEffect } from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { addMeetingRoom, updateMeetingRoom, deleteRoom } from './slicer/roomSlice'
import s from './organisationListStyle.module.scss'
import ModalAddRoom from '../../components/AdminPanel/ModalAddRoom'
import ModalEditRoom from '../../components/AdminPanel/ModalEditRoom'

export default function RoomList() {
  const [openAddRoom, setOpenAddRoom] = useState(false)
  const [openEditRoom, setOpenEditRoom] = useState(false)
  const [roomName, setRoomName] = useState('')
  const [location, setLocation] = useState('')
  const [roomCapacity, setRoomCapacity] = useState(0)
  const [isDashboardAvailable, setIsDashboardAvailable] = useState(false)
  const [isProjectorAvailable, setIsProjectorAvailable] = useState(false)
  const [isAcAvailable, setIsAcAvailable] = useState(false)

  /* receive data from DB */
  const RoomList = useSelector((state) => state.roomList.meetingrooms)
  const dispatch = useDispatch()

  /* open modal window for add room */
  const handleOpenAddRoom = () => {
    setOpenAddRoom(!openAddRoom)
  }

  /* add new room */
  const handleAddNewRoom = () => {
    if (roomName.trim().length) {
      dispatch(
        addMeetingRoom({
          roomName,
          location,
          roomCapacity,
          isDashboardAvailable,
          isProjectorAvailable,
          isAcAvailable,
        }),
      )
      setOpenAddRoom(false)
      setRoomName('')
      setLocation('')
      setRoomCapacity('')
      setIsDashboardAvailable(false)
      setIsProjectorAvailable(false)
      setIsAcAvailable(false)
    }
  }
  /* open modal window for edit room and pass selected room id */
  const handleOpenEditRoom = (e) => {
    setOpenEditRoom(!openEditRoom)
    const roomId = Number(e.currentTarget.id)
    const selectedRoom = RoomList.filter((room) => room.id === roomId)
    const roomObj = selectedRoom[0]
    setRoomName(roomObj.roomName)
    setLocation(roomObj.location)
    const roomCopacityToNumber = Number(roomObj.roomCapacity)
    setRoomCapacity(roomCopacityToNumber)
    const dashboardAvailableToBool = Boolean(roomObj.isDashboardAvailable)
    setIsDashboardAvailable(dashboardAvailableToBool)
    const projectorAvailableToBool = Boolean(roomObj.isProjectAvailable)
    setIsProjectorAvailable(projectorAvailableToBool)
    const isAcAvailableToBool = Boolean(roomObj.isAcAvailable)
    setIsAcAvailable(isAcAvailableToBool)
  }
  /* edit room parametrs */
  const handleEditRoom = () => {
    dispatch(
      updateMeetingRoom({
        roomName,
        location,
        roomCapacity: 10,
        isDashboardAvailable: true,
        isProjectorAvailable: true,
        isAcAvailable: true,
      }),
    )
    setOpenEditRoom(false)
    setRoomName('')
    setLocation('')
    setRoomCapacity('')
    setIsDashboardAvailable(false)
    setIsProjectorAvailable(false)
    setIsAcAvailable(false)
  }
  /* delete room */
  const handleDeleteRoom = (room) => {
    dispatch(deleteRoom(room))
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
                    <EditIcon
                      id={room.id}
                      color="primary"
                      sx={{ mr: 1 }}
                      onClick={(e) => handleOpenEditRoom(e)}
                    />
                    <DeleteIcon color="primary" onClick={() => handleDeleteRoom(room)} />
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
          roomCapacity={roomCapacity}
          setRoomCapacity={setRoomCapacity}
          isDashboardAvailable={isDashboardAvailable}
          setIsDashboardAvailable={setIsDashboardAvailable}
          isProjectorAvailable={isProjectorAvailable}
          setIsProjectorAvailable={setIsProjectorAvailable}
          isAcAvailable={isAcAvailable}
          setIsAcAvailable={setIsAcAvailable}
          addNewRoom={handleAddNewRoom}
        />
        <ModalEditRoom
          openEditRoom={openEditRoom}
          setOpenEditRoom={setOpenEditRoom}
          roomName={roomName}
          setRoomName={setRoomName}
          location={location}
          setLocation={setLocation}
          roomCapacity={roomCapacity}
          setRoomCapacity={setRoomCapacity}
          isDashboardAvailable={isDashboardAvailable}
          setIsDashboardAvailable={setIsDashboardAvailable}
          isProjectorAvailable={isProjectorAvailable}
          setIsProjectorAvailable={setIsProjectorAvailable}
          isAcAvailable={isAcAvailable}
          setIsAcAvailable={setIsAcAvailable}
          editRoom={handleEditRoom}
        />
      </div>
    </div>
  )
}
