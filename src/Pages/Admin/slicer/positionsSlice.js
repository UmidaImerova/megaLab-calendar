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

export const addPositionsAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/position/create'
  try {
    await axios.post(API_URL, data)
    dispatch(getPositionsAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const updatePositionsAsync = (data) => async (dispatch) => {
  // eslint-disable-next-line no-console
  console.log(data)
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/position/update'
  try {
    await axios.patch(API_URL, data)
    dispatch(getPositionsAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const deletePositionsAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/position/delete'
  try {
    await axios.delete(`${API_URL}/${data.id}`)
    dispatch(getPositionsAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
