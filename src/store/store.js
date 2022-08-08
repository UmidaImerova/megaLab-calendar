import { configureStore } from '@reduxjs/toolkit'
import organisationReducer from '../Pages/Admin/slicer/organisationSlice'
import roomReducer from '../Pages/Admin/slicer/roomSlice'

export const store = configureStore({
  reducer: {
    orgList: organisationReducer,
    roomList: roomReducer,
  },
})
