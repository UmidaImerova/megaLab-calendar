import { configureStore } from '@reduxjs/toolkit'
import organisationReducer from '../Pages/Admin/slicer/organisationSlice'
import roomReducer from '../Pages/Admin/slicer/roomSlice'
import departmnetReducer from '../Pages/Admin/slicer/departmentSlice'

export const store = configureStore({
  reducer: {
    orgList: organisationReducer,
    roomList: roomReducer,
    depList: departmnetReducer,
  },
})
