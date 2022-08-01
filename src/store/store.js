import { configureStore } from '@reduxjs/toolkit'
import organisationReducer from '../Pages/Admin/slicer/organisationSlice'

export const store = configureStore({
  reducer: {
    orgList: organisationReducer,
  },
})
