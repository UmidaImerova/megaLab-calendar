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
    addOrg(state, action) {
      state.organisations.push({
        organizationName: action.payload.organizationName,
        adminUserId: null,
      })
    },
    editOrg(state, action) {
      const { organizationName, id } = action.payload
      // eslint-disable-next-line eqeqeq
      const selectedOrg = state.organisations.find((item) => item.id === id)
      if (selectedOrg) {
        selectedOrg.organizationName = organizationName
      }
    },
    deleteOrg(state, action) {
      state.organisations = state.organisations.filter((item) => item.id !== action.payload.id)
    },
  },
})
export const { addOrg, editOrg, deleteOrg, getOrg } = organisationSlice.actions
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
    const response = await axios.post(API_URL, data)
    dispatch(addOrg(response.data))
  } catch (err) {
    throw new Error(err)
  }
}

export const editOrgAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/update'
  try {
    const response = await axios.patch(API_URL, data)
    dispatch(deleteOrg(response.data))
  } catch (err) {
    throw new Error(err)
  }
}

export const deleteOrgAsync = (data) => async (dispatch) => {
  const API_URL = `https://megalab-app.herokuapp.com/api/v1/organization/delete/${data.id}`
  try {
    const response = await axios.delete(API_URL)
    dispatch(addOrg(response.data))
  } catch (err) {
    throw new Error(err)
  }
}