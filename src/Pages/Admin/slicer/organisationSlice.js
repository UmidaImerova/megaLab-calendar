import { createSlice } from '@reduxjs/toolkit'

const axios = require('axios').default

const initialState = { organisations: [] }

const organisationSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {
    getOrg(state, action) {
      state.organisations = action.payload
    },
  },
})
export const { getOrg } = organisationSlice.actions
export default organisationSlice.reducer

export const getOrganisations = () => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/find-all'
  try {
    const response = await axios.get(API_URL)
    dispatch(getOrg(response.data))
  } catch (err) {
    throw new Error(err)
  }
}

export const addOrgAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/create'
  try {
    await axios.post(API_URL, data)
    dispatch(getOrganisations())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const editOrgAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/update'
  try {
    // eslint-disable-next-line no-console
    console.log(data)
    await axios.patch(API_URL, data)
    dispatch(getOrganisations())
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const deleteOrgAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/delete'
  try {
    await axios.delete(`${API_URL}/${data.id}`)
    dispatch(getOrganisations())
  } catch (err) {
    // throw new Error(err)
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
