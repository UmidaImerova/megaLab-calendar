import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { departments: [] }

const departmnetsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    getDep(state, action) {
      state.departments = action.payload
    },
  },
})
export const { getDep } = departmnetsSlice.actions
export default departmnetsSlice.reducer

export const getDepartmentsList = () => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/department/find-all'
  try {
    const response = await axios.get(API_URL)
    dispatch(getDep(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const addNewDepartment = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/department/create'
  try {
    await axios.post(API_URL, data)
    dispatch(getDep())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
