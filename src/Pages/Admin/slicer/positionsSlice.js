import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { positions: [] }

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    getPositions(state, action) {
      state.positions = action.payload
    },
  },
})

export const { getPositions } = positionsSlice.actions
export default positionsSlice.reducer

export const getPositionsAsync = () => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/position/find-all'
  try {
    const response = await axios.get(API_URL)
    dispatch(getPositions(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
