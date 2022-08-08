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
    addRoom(state, action) {
      // eslint-disable-next-line no-console
      // console.log(action.payload)
      state.meetingrooms.push({
        roomName: action.payload.roomName,
        location: action.payload.location,
        roomCopasity: action.payload.roomCopasity,
        isDashboardAvailable: action.payload.isDashboardAvailable,
        isProjectorAvailable: action.payload.isProjectorAvailable,
        isAcAvailable: action.payload.isAcAvailable,
      })
    },
    editRoom(state, action) {},
    delete(state, action) {},
  },
})

export const { getRooms, addRoom } = roomSlice.actions
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

export const addMmeetingRoom = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/room/create'
  // eslint-disable-next-line no-console
  console.log(data)
  try {
    const response = await axios.post(API_URL, data)
    // eslint-disable-next-line no-console
    console.log(response)
    // dispatch(addRoom(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
