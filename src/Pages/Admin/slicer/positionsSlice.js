import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { positions: [] }

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    getRole(state, action) {
      state.positions = action.payload
    },
  },
})

export const { getRole } = positionsSlice.actions
export default positionsSlice.reducer
