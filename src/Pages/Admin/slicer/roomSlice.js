import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { meetingrooms: [] }
const roomSlice = createSlice({
  name: 'meetingrooms',
  initialState,
  reducers: {
    getRooms(state, action) {
      state.meetingrooms = action.payload
    },
  },
})

export const { getRooms, addRoom, editRoom } = roomSlice.actions
export default roomSlice.reducer

export const getmeetingRoom = () => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/room/find-all'
  try {
    const response = await axios.get(API_URL)
    dispatch(getRooms(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const addMeetingRoom = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/room/create'
  try {
    await axios.post(API_URL, data)
    dispatch(getRooms())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const updateMeetingRoom = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/room/update'
  try {
    await axios.put(API_URL, data)
    dispatch(getRooms())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const deleteRoom = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/room/delete'
  try {
    await axios.delete(`${API_URL}/${data.id}`)
    dispatch(getRooms())
  } catch (err) {
    // throw new Error(err)
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
