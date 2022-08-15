import { configureStore } from '@reduxjs/toolkit'
import organisationReducer from '../Pages/Admin/slicer/organisationSlice'
import roomReducer from '../Pages/Admin/slicer/roomSlice'
import departmnetReducer from '../Pages/Admin/slicer/departmentSlice'
import positionsReducer from '../Pages/Admin/slicer/positionsSlice'
import usersReducer from '../Pages/Admin/slicer/userSlice'

export const store = configureStore({
  reducer: {
    orgList: organisationReducer,
    roomList: roomReducer,
    depList: departmnetReducer,
    positionList: positionsReducer,
    usersList: usersReducer,
  },
})
