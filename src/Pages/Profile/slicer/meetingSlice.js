import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { meetings: [] }

const meetingSlice = createSlice({
  name: 'meetings',
  initialState,
  reducers: {
    getEvents(state, action) {
      state.meetings = action.payload
    },
  },
})

export const { getEvents } = meetingSlice.actions
export default meetingSlice.reducer

export const getAllMeeting = (data) => async (dispatch) => {
  const URL = 'https://megalab-app.herokuapp.com/api/v1/meeting/find-all-by-user-id-and-dates'
  try {
    const response = await axios.get(
      `${URL}/${data.userId}?startDate=${data.startDate}&endDate=${data.endDate}`,
    )
    dispatch(getEvents(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
    // eslint-disable-next-line no-console
    console.log(data)
  }
}

export const addNewMeetengAsync = (data) => async (dispatch) => {
  const URL = 'https://megalab-app.herokuapp.com/api/v1/meeting/create'
  try {
    await axios.post(URL, data)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
