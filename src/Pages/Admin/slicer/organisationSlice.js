import { createSlice } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const axios = require('axios').default

const initialState = { organisations: [] }

const organisationSlice = createSlice({
  name: 'organisations',
  initialState,
  reducers: {
    getOrg(state, action) {
      state.organisation = [action.payload]
    },
    addOrg(state, action) {
      state.organisations.push({
        name: action.payload.orgName,
        id: uuidv4(),
      })
    },
    editOrg(state, action) {
      const { name, id } = action.payload
      const selectedOrg = state.organisations.find((item) => item.id === id)
      if (selectedOrg) {
        selectedOrg.name = name
      }
    },
    deleteOrg(state, action) {
      state.organisations = state.organisations.filter((item) => item.id !== action.payload.id)
    },
  },
})
export const { addOrg, editOrg, deleteOrg, getOrg } = organisationSlice.actions
export default organisationSlice.reducer

export const getOrganisations = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/find-all'
  try {
    const response = await axios.get(`${API_URL}/${data}`)
    // eslint-disable-next-line no-console
    console.log(response)
    // dispatch(getOrg(response.data))
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err)
  }
}

export const addOrgAsync = (data) => async (dispatch) => {
  const API_URL = 'https://megalab-app.herokuapp.com/api/v1/organization/create'
  try {
    // console.log(data)
    const response = await axios.post(API_URL, data)
    // eslint-disable-next-line no-console
    console.log(response)
    // dispatch(addOrg(response.data))
  } catch (err) {
    // throw new Error(err)
    // eslint-disable-next-line no-console
    console.log(err)
  }
}
