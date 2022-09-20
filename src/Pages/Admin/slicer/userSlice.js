import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { users: [] }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload
    },
  },
})

export const { getUsers } = usersSlice.actions
export default usersSlice.reducer

export const getUsersAsync = () => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/user/find-all-for-web'
  try {
    const response = await axios.get(API_URL)
    dispatch(getUsers(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
export const addUsersAsync = (data) => async (dispatch) => {
  // eslint-disable-next-line no-console
  // console.log(data)
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/user/create'
  try {
    await axios.post(API_URL, data)
    dispatch(getUsersAsync())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
